"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export function PrayButton({ count }: { count: number }) {
  const [isPrayed, setIsPrayed] = useState(false);
  const [prayCount, setPrayCount] = useState(count);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      if (!isPrayed) {
        setIsPrayed(true);
        setPrayCount(prevCount => prevCount + 1);
        // In a real app, you would also make an API call here.
      } else {
        setIsPrayed(false);
        setPrayCount(prevCount => prevCount - 1);
      }
    });
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleClick}
        className="rounded-full hover:bg-rose-100 dark:hover:bg-rose-900/50"
        aria-label="Pray for this"
        disabled={isPending}
      >
        <Heart
          className={cn(
            "w-5 h-5 text-muted-foreground transition-all",
            isPrayed && "text-destructive fill-destructive animate-heart-pop"
          )}
        />
      </Button>
      <span className="text-sm text-muted-foreground tabular-nums min-w-[2ch] text-left">
        {prayCount}
      </span>
    </div>
  );
}
