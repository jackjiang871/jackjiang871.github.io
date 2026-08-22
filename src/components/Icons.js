import React from "react";

const paths = {
  gamepad: (
    <>
      <path d="M6 12h4M8 10v4M15 13h.01M18 11h.01" />
      <rect x="2" y="6" width="20" height="12" rx="5" />
    </>
  ),
  linkedin: (
    <>
      <path d="M4.5 9.5v9M4.5 5.5v.01" />
      <path d="M9.5 18.5v-9M9.5 13.5a4 4 0 0 1 8 0v5" />
    </>
  ),
  github: (
    <path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5a3 3 0 0 0-.9-2.4c2.9-.3 6-1.4 6-6.4a4.7 4.7 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.3s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6.2 0C6.7 1.9 5.7 2.2 5.7 2.2a4.3 4.3 0 0 0-.1 3.3A4.7 4.7 0 0 0 4.3 8.7c0 5 3.1 6.1 6 6.4a3 3 0 0 0-.9 2.4V21" />
  ),
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  download: <path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />,
  external: <path d="M13 5h6v6M19 5l-8 8M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />,
};

export default function Icon({ name, size = 16 }) {
  const d = paths[name];
  if (!d) return null;
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {d}
    </svg>
  );
}
