import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sanitizeHtml } from "@/lib/sanitize";

export interface PasteResponse {
  _id: string;
  locked: boolean;
  unlocked?: boolean;
  contentHtml?: string;
  createdAt: string;
  expiresAt: string;
  ipRestricted: boolean;
  views: number;
  reported?: boolean;
  error?: string;
}

export function usePasteView(id: string) {
  const queryClient = useQueryClient();
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [reported, setReported] = useState(false);
  const [unlockError, setUnlockError] = useState("");

  const {
    data: paste,
    isLoading,
    error,
    refetch,
  } = useQuery<PasteResponse>({
    queryKey: ["paste", id],
    queryFn: async () => {
      const res = await fetch(`/api/pastes/${id}`);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to fetch paste.");
      }
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const unlockMutation = useMutation({
    mutationFn: async (pwdToSubmit: string) => {
      setUnlockError("");
      const res = await fetch(`/api/pastes/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: pwdToSubmit }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Incorrect password.");
      }

      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["paste", id], data);
    },
    onError: (err: any) => {
      setUnlockError(err.message || "Verification failed.");
    },
  });

  const reportMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/pastes/${id}/report`, {
        method: "POST",
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to report clip.");
      }
      return res.json();
    },
    onSuccess: () => {
      setReported(true);
      queryClient.setQueryData(["paste", id], (old: any) =>
        old ? { ...old, reported: true } : old
      );
    },
  });

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setUnlockError("Password is required.");
      return;
    }
    unlockMutation.mutate(password);
  };

  const handleReportSubmit = () => {
    if (paste?.reported || reported || reportMutation.isPending) return;
    reportMutation.mutate();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getRelativeExpiry = (expiresAtStr: string) => {
    const expiresAt = new Date(expiresAtStr);
    const diffMs = expiresAt.getTime() - Date.now();
    if (diffMs <= 0) return "Vaporized";

    const diffMins = Math.floor(diffMs / (60 * 1000));
    const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
    const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

    if (diffDays > 0) return `in ${diffDays} day${diffDays > 1 ? "s" : ""}`;
    if (diffHours > 0) return `in ${diffHours} hour${diffHours > 1 ? "s" : ""}`;
    return `in ${diffMins} min${diffMins > 1 ? "s" : ""}`;
  };

  const clientSanitizedHtml = sanitizeHtml(paste?.contentHtml || "");
  const isReported = Boolean(paste?.reported || reported);

  return {
    paste,
    isLoading,
    error,
    refetch,
    password,
    setPassword,
    copied,
    isReported,
    isReporting: reportMutation.isPending,
    unlockError,
    handleUnlockSubmit,
    handleReportSubmit,
    handleCopyLink,
    getRelativeExpiry,
    isUnlocking: unlockMutation.isPending,
    clientSanitizedHtml,
  };
}
