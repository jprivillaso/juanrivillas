"use client";

import { useEffect } from "react";

export const ReportView: React.FC = () => {
  useEffect(() => {
    if (window.location.hostname.includes("localhost")) return;

    fetch("/api/incr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug: "family_tree" }),
    });
  }, []);

  return null;
};
