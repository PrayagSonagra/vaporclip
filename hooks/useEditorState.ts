import { useState, useRef } from "react";
import { sanitizeHtml } from "@/lib/sanitize";

export function useEditorState() {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const checkIsEmpty = () => {
    if (!editorRef.current) return;
    const text = editorRef.current.textContent || "";
    const html = editorRef.current.innerHTML.trim();
    const hasImages = editorRef.current.querySelectorAll("img").length > 0;
    setIsEmpty(text.trim().length === 0 && !hasImages && (html === "" || html === "<br>"));
  };

  const execCmd = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    checkIsEmpty();
  };

  const handleLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      execCmd("createLink", url);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    for (const file of Array.from(files)) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64 = event.target?.result as string;
          const imgHtml = `<img src="${base64}" class="max-w-full rounded-md border border-[#d0d7de] my-4 block" />`;
          execCmd("insertHTML", imgHtml);
        };
        reader.readAsDataURL(file);
      }
    }
    e.target.value = "";
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const clipboardData = e.clipboardData;
    if (!clipboardData) return;

    // 1. Handle Pasted Images
    if (clipboardData.files && clipboardData.files.length > 0) {
      for (const file of Array.from(clipboardData.files)) {
        if (file.type.startsWith("image/")) {
          e.preventDefault();
          const reader = new FileReader();
          reader.onload = (event) => {
            const base64 = event.target?.result as string;
            const imgHtml = `<img src="${base64}" class="max-w-full rounded-md border border-[#d0d7de] my-4 block" />`;
            execCmd("insertHTML", imgHtml);
          };
          reader.readAsDataURL(file);
          return;
        }
      }
    }

    // 2. Handle Rich HTML
    const htmlData = clipboardData.getData("text/html");
    if (htmlData && htmlData.includes("style=")) {
      e.preventDefault();
      const cleanHtml = sanitizeHtml(htmlData);
      execCmd("insertHTML", cleanHtml);
      return;
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      for (const file of Array.from(e.dataTransfer.files)) {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const base64 = event.target?.result as string;
            const imgHtml = `<img src="${base64}" class="max-w-full rounded-md border border-[#d0d7de] my-4 block" />`;
            execCmd("insertHTML", imgHtml);
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const resetEditorContent = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }
    setIsEmpty(true);
  };

  return {
    editorRef,
    fileInputRef,
    isEmpty,
    checkIsEmpty,
    execCmd,
    handleLink,
    handleImageUpload,
    handlePaste,
    handleDrop,
    handleDragOver,
    resetEditorContent,
  };
}
