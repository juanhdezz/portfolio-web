"use client";

import { useState } from "react";
import { IconCheck, IconCopy } from "./icons";

export function CopyEmail({ email, label, done }: { email: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button type="button" onClick={copy} className="btn btn-ghost">
      {copied ? <IconCheck width={16} height={16} className="text-signal" /> : <IconCopy width={16} height={16} />}
      <span aria-live="polite">{copied ? done : label}</span>
    </button>
  );
}
