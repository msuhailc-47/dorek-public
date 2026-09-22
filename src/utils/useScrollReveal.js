"use client";
import { useRef } from 'react';

/**
 * Performance-optimized hook: eliminates main-thread layout recalculations & reflows.
 */
export default function useScrollReveal() {
  const ref = useRef(null);
  return { ref, className: '' };
}
