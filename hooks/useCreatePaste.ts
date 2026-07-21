import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sanitizeHtml } from "@/lib/sanitize";

export function useCreatePaste(
  editorRef: React.RefObject<HTMLDivElement | null>,
  isEmpty: boolean,
  resetEditorContent: () => void,
) {
  const [expiry, setExpiry] = useState<"1h" | "1d" | "30d">("1h");
  const [ipRestricted, setIpRestricted] = useState(false);
  const [passwordProtected, setPasswordProtected] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [createdClipId, setCreatedClipId] = useState<string | null>(null);
  const [isEvaporating, setIsEvaporating] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3500);
  };

  const handleCopyLinkManual = () => {
    if (!createdClipId) return;
    const shareUrl = `${window.location.origin}/p/${createdClipId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedLink(true);
      showToast("Clip link copied to clipboard.");
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  const handleResetEditor = () => {
    setCreatedClipId(null);
    setIsEvaporating(false);
    setPassword("");
    setPasswordProtected(false);
    setIpRestricted(false);
    setExpiry("1d");
    setErrorMsg("");
    resetEditorContent();
  };

  const createPasteMutation = useMutation({
    mutationFn: async () => {
      setErrorMsg("");
      if (!editorRef.current || isEmpty) {
        throw new Error("Paste content cannot be empty.");
      }

      const rawHtml = editorRef.current.innerHTML;
      const contentHtml = sanitizeHtml(rawHtml);

      const payload = {
        contentHtml,
        expiry,
        ipRestricted,
        password: passwordProtected ? password : "",
      };

      const res = await fetch("/api/pastes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create paste.");
      }

      return res.json();
    },
    onSuccess: (data) => {
      const shareUrl = `${window.location.origin}/p/${data.id}`;
      setIsEvaporating(true);

      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          let expText = "24 hours";
          if (expiry === "1h") expText = "1 hour";
          if (expiry === "30d") expText = "30 days";
          showToast(
            `Clip copied to clipboard. It will vaporize in ${expText}.`,
          );
        })
        .catch((err) => {
          console.error("Auto-copy clipboard failed:", err);
          showToast("Clip created successfully.");
        });

      setTimeout(() => {
        setCreatedClipId(data.id);
        setIsEvaporating(false);
      }, 250);
    },
    onError: (err: any) => {
      setErrorMsg(err.message || "An error occurred.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordProtected && (!password || password.trim().length === 0)) {
      setErrorMsg("Please enter a password for password protection.");
      return;
    }
    createPasteMutation.mutate();
  };

  return {
    expiry,
    setExpiry,
    ipRestricted,
    setIpRestricted,
    passwordProtected,
    setPasswordProtected,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    errorMsg,
    createdClipId,
    isEvaporating,
    toastMessage,
    copiedLink,
    handleCopyLinkManual,
    handleResetEditor,
    handleSubmit,
    isPending: createPasteMutation.isPending,
  };
}
