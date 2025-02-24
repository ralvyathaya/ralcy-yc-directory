"use client";

import { useEffect } from "react";

// Client component that handles view increment
export default function ViewIncrementer({ id }: { id: string }) {
  useEffect(() => {
    // Increment view count after component mounts
    fetch("/api/increment-view", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch(error => {
      console.error("Failed to increment view:", error);
    });
  }, [id]);

  return null;
} 