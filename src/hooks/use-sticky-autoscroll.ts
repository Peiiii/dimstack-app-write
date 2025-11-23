import { useRef } from "react";
import {
  DEFAULT_THRESHOLD,
  StickyAutoScroller,
  type StickyAutoScrollOptions,
  type StickyStateAction,
} from "./sticky-auto-scroller";
import { useBehaviorSubjectValue } from "./use-behavior-subject-value";

/**
 * Public hook: exposes the StickyAutoScroller class through a dumb, hook-friendly API.
 * Contains zero state/effect logic; all side effects live in helper hooks.
 */
export function useStickyAutoScroll(options?: StickyAutoScrollOptions) {
  const { threshold = DEFAULT_THRESHOLD } = options || {};
  const scrollerRef = useRef<StickyAutoScroller | null>(null);

  if (!scrollerRef.current) {
    scrollerRef.current = new StickyAutoScroller(threshold);
  } else {
    scrollerRef.current.setThreshold(threshold);
  }

  const scroller = scrollerRef.current;
  const isSticky = useBehaviorSubjectValue(scroller.isSticky$);

  return {
    containerRef: scroller.containerRef,
    isSticky,
    setIsSticky: scroller.setStickyAction,
    scrollToBottom: scroller.scrollToBottom,
    notifyNewItem: scroller.notifyNewItem,
  } as const;
}
export type { StickyAutoScrollOptions, StickyStateAction };
