import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

/**
 * Download button for a prebuilt PNG. The file is fetched into memory as soon
 * as the slide is shown, so a tap saves it instantly through a same-origin
 * blob link (the same way the other feed downloads work).
 */
export function PrebuiltPngDownload({
  src,
  fileName,
  label,
  className,
}: {
  src: string;
  fileName: string;
  label: string;
  className?: string;
}) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let url: string | null = null;
    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.blob();
      })
      .then((blob) => {
        if (cancelled) return;
        url = URL.createObjectURL(new Blob([blob], { type: 'image/png' }));
        setBlobUrl(url);
      })
      .catch(() => {
        /* fall back to the direct file link */
      });
    return () => {
      cancelled = true;
      if (url) window.setTimeout(() => URL.revokeObjectURL(url!), 30_000);
    };
  }, [src]);

  return (
    <a
      href={blobUrl ?? src}
      download={fileName}
      className={className}
      data-ready={blobUrl ? 'true' : 'false'}
    >
      <Download className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </a>
  );
}
