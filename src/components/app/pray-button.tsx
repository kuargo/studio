"use client";

import React, { useState, useTransition, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { updatePrayerCount } from "@/lib/firestore";

export function PrayButton({ prayerId, count }: { prayerId: string, count: number }) {
  const [isPrayed, setIsPrayed] = useState(false);
  const [prayCount, setPrayCount] = useState(count || 0);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Check local storage to see if user has already prayed for this item
    const prayedStatus = localStorage.getItem(`prayed_${prayerId}`);
    if (prayedStatus === 'true') {
      setIsPrayed(true);
    }
  }, [prayerId]);

  useEffect(() => {
    if (!db || !prayerId) return;

    // Listen for real-time updates to the prayer count from Firestore
    const unsub = onSnapshot(doc(db, `prayerRequests/${prayerId}`), (doc) => {
        if (doc.exists()) {
            const data = doc.data();
            // The Distributed Counter extension adds a field with the count.
            // By default, it's the same as the collection name, but you can configure it.
            // Let's assume the field is named "prayCount".
            setPrayCount(data.prayCount || 0);
        }
    });

    return () => unsub();
  }, [prayerId]);


  const handleClick = () => {
    if (isPending) return;

    startTransition(() => {
      const newPrayedState = !isPrayed;
      setIsPrayed(newPrayedState);
      
      localStorage.setItem(`prayed_${prayerId}`, String(newPrayedState));

      // Trigger the distributed counter extension
      updatePrayerCount(prayerId, newPrayedState ? 1 : -1);
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
