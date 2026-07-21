import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
} from "lucide-react";

interface EditorToolbarProps {
  execCmd: (command: string, value?: string) => void;
  handleLink: () => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export function EditorToolbar({
  execCmd,
  handleLink,
  handleImageUpload,
  fileInputRef,
}: EditorToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-[#f6f8fa] border-b border-[#d0d7de]">
      <button
        type="button"
        title="Bold"
        onClick={() => execCmd("bold")}
        className="p-1.5 rounded hover:bg-white text-[#57606a] hover:text-[#24292f] transition-colors cursor-pointer"
      >
        <Bold className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        title="Italic"
        onClick={() => execCmd("italic")}
        className="p-1.5 rounded hover:bg-white text-[#57606a] hover:text-[#24292f] transition-colors cursor-pointer"
      >
        <Italic className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        title="Strikethrough"
        onClick={() => execCmd("strikeThrough")}
        className="p-1.5 rounded hover:bg-white text-[#57606a] hover:text-[#24292f] transition-colors cursor-pointer"
      >
        <Strikethrough className="h-3.5 w-3.5" />
      </button>

      <div className="w-px h-4 bg-[#d0d7de] mx-1" />

      <button
        type="button"
        title="Heading 1"
        onClick={() => execCmd("formatBlock", "<h1>")}
        className="p-1.5 rounded hover:bg-white text-[#57606a] hover:text-[#24292f] transition-colors cursor-pointer"
      >
        <Heading1 className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        title="Heading 2"
        onClick={() => execCmd("formatBlock", "<h2>")}
        className="p-1.5 rounded hover:bg-white text-[#57606a] hover:text-[#24292f] transition-colors cursor-pointer"
      >
        <Heading2 className="h-3.5 w-3.5" />
      </button>

      <div className="w-px h-4 bg-[#d0d7de] mx-1" />

      <button
        type="button"
        title="Bullet List"
        onClick={() => execCmd("insertUnorderedList")}
        className="p-1.5 rounded hover:bg-white text-[#57606a] hover:text-[#24292f] transition-colors cursor-pointer"
      >
        <List className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        title="Numbered List"
        onClick={() => execCmd("insertOrderedList")}
        className="p-1.5 rounded hover:bg-white text-[#57606a] hover:text-[#24292f] transition-colors cursor-pointer"
      >
        <ListOrdered className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        title="Blockquote"
        onClick={() => execCmd("formatBlock", "<blockquote>")}
        className="p-1.5 rounded hover:bg-white text-[#57606a] hover:text-[#24292f] transition-colors cursor-pointer"
      >
        <Quote className="h-3.5 w-3.5" />
      </button>

      <div className="w-px h-4 bg-[#d0d7de] mx-1" />

      <button
        type="button"
        title="Add Link"
        onClick={handleLink}
        className="p-1.5 rounded hover:bg-white text-[#57606a] hover:text-[#24292f] transition-colors cursor-pointer"
      >
        <LinkIcon className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        title="Upload Image"
        onClick={() => fileInputRef.current?.click()}
        className="p-1.5 rounded hover:bg-white text-[#57606a] hover:text-[#24292f] transition-colors cursor-pointer"
      >
        <ImageIcon className="h-3.5 w-3.5" />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
}
