// /components/layout/SiteContainer.jsx
import React from "react";

export default function SiteContainer({ className = "", children }) {
  return (
    <div className={`mx-auto max-w-6xl px-4 md:px-6 ${className}`}>
      {children}
    </div>
  );
}
