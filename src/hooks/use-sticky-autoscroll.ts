import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Sticky auto-scroll behavior for chat-like timelines.
 * - When user is near the bottom, stays in sticky mode and auto-scrolls on new items
 * - Scrolling up beyond threshold exits sticky mode
 * - Exposes `scrollToBottom()` for manual jumps (e.g. after user sends a message)
 */
export function useStickyAutoScroll(options?: { threshold?: number }) {
  const { threshold = 64 } = options || {};
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(true);

  const computeIsNearBottom = useCallback(() => {
    const el = containerRef.current;
    if (!el) return false;
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    return distance <= threshold;
  }, [threshold]);

  const onScroll = useCallback(() => {
    // If user scrolls up far away from bottom, exit sticky
    const nearBottom = computeIsNearBottom();
    setIsSticky(nearBottom);
  }, [computeIsNearBottom]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    // Initialize sticky state on mount
    setIsSticky(computeIsNearBottom());
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll, computeIsNearBottom]);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
  }, []);

  const notifyNewItem = useCallback(() => {
    if (isSticky) {
      // next tick for DOM update
      requestAnimationFrame(() => scrollToBottom());
    }
  }, [isSticky, scrollToBottom]);

  return {
    containerRef,
    isSticky,
    setIsSticky,
    scrollToBottom,
    notifyNewItem,
  } as const;
}

