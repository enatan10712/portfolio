"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { playPageTransitionSound } from '@/lib/sounds';

export function usePageTransitionSounds() {
  const pathname = usePathname();

  useEffect(() => {
    // Play sound when route changes
    playPageTransitionSound();
  }, [pathname]);

  return null;
}
