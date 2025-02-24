"use client";

import { useEffect, useRef } from "react";

export default function ViewIncrementer({ id }: { id: string }) {
  const hasIncremented = useRef(false);

  useEffect(() => {
    if (!hasIncremented.current) {
      hasIncremented.current = true;
      fetch("/api/increment-view", {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      }).catch(error => {
        console.error("Failed to increment view:", error);
      });
    }
  }, [id]);

  return null;
}