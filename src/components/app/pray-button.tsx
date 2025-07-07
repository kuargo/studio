"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { updatePrayerCount } from "@/lib/firestore";

export function PrayButton({ prayerId, count }: { prayerId: string, count: number }) {
  const [isPrayed, setIsPrayed] = useState(false);
  const [prayCount, setPrayCount] = useState(count);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      const newPrayedState = !isPrayed;
      setIsPrayed(newPrayedState);

      if (newPrayedState) {
        setPrayCount(prevCount => prevCount + 1);
        updatePrayerCount(prayerId, 1);
      } else {
        setPrayCount(prevCount => prevCount - 1);
        updatePrayerCount(prayerId, -1);
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
