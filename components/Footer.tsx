interface FooterProps {
  customText?: string;
}

export function Footer({ customText }: FooterProps) {
  return (
    <footer className="mt-12 pt-4 border-t border-[#d0d7de] text-left text-xxs text-[#57606a] w-full">
      <p>
        &copy; {new Date().getFullYear()} VaporClip.{" "}
        {customText || "All rights reserved. Zero trackers, fully encrypted options."}
      </p>
    </footer>
  );
}
