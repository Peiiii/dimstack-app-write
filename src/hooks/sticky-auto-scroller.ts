import { BehaviorSubject } from "rxjs";

export const DEFAULT_THRESHOLD = 20;

export interface StickyAutoScrollOptions {
  threshold?: number;
}

export type StickyStateAction = boolean | ((prev: boolean) => boolean);

interface ScrollEvaluation {
  nextScrollTop: number;
  shouldStick: boolean;
  shouldUnstick: boolean;
}

const computeScrollEvaluation = (
  el: HTMLDivElement,
  threshold: number,
  lastScrollTop: number,
): ScrollEvaluation => {
  const scrollTop = el.scrollTop;
  const distanceFromBottom = el.scrollHeight - scrollTop - el.clientHeight;
  const nearBottom = distanceFromBottom <= threshold;
  const isScrollingUp = scrollTop < lastScrollTop;

  return {
    nextScrollTop: scrollTop,
    shouldStick: nearBottom,
    shouldUnstick: !nearBottom && isScrollingUp,
  };
};

const getResizeTarget = (el: HTMLDivElement) =>
  (el.firstElementChild || el) as Element;

export class StickyAutoScroller {
  private container: HTMLDivElement | null = null;
  private lastScrollTop = 0;
  private threshold: number;
  private resizeObserver?: ResizeObserver;
  private rafId: number | null = null;
  readonly isSticky$: BehaviorSubject<boolean>;
  readonly containerRef: (el: HTMLDivElement | null) => void;

  constructor(threshold: number = DEFAULT_THRESHOLD) {
    this.threshold = threshold;
    this.isSticky$ = new BehaviorSubject(true);
    this.containerRef = (el) => {
      if (el) {
        this.attach(el);
      } else {
        this.detach();
      }
    };
  }

  getStickySnapshot() {
    return this.isSticky$.getValue();
  }

  setThreshold(next: number) {
    if (this.threshold === next) return;
    this.threshold = next;
    this.evaluateStickiness();
  }

  private attach(container: HTMLDivElement) {
    if (this.container === container) {
      this.evaluateStickiness();
      return;
    }

    this.detach();
    this.container = container;
    this.lastScrollTop = container.scrollTop;
    container.addEventListener("scroll", this.handleScroll, { passive: true });
    this.observeResizes();
    this.evaluateStickiness();
  }

  private detach() {
    if (!this.container) return;
    this.container.removeEventListener("scroll", this.handleScroll);
    this.teardownResizeObserver();
    this.container = null;
  }

  setSticky = (next: boolean) => {
    this.commitSticky(next);
  };

  setStickyAction = (action: StickyStateAction) => {
    const value =
      typeof action === "function" ? action(this.getStickySnapshot()) : action;
    this.setSticky(value);
  };

  scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (!this.container) return;
    this.container.scrollTo({ top: this.container.scrollHeight, behavior });
  };

  notifyNewItem = () => {
    this.ensureStickyScroll("auto");
  };

  private handleScroll = () => {
    this.evaluateStickiness();
  };

  private evaluateStickiness() {
    if (!this.container) return;
    const evaluation = computeScrollEvaluation(
      this.container,
      this.threshold,
      this.lastScrollTop,
    );

    this.lastScrollTop = evaluation.nextScrollTop;

    if (evaluation.shouldStick) {
      this.commitSticky(true);
      return;
    }

    if (evaluation.shouldUnstick) {
      this.commitSticky(false);
    }
  }

  private commitSticky(next: boolean) {
    if (this.isSticky$.getValue() === next) return;
    this.isSticky$.next(next);
  }

  private observeResizes() {
    if (!this.container || typeof ResizeObserver === "undefined") return;

    this.resizeObserver = new ResizeObserver(() => {
      if (!this.isSticky$.getValue()) return;
      this.cancelAnimation();
      this.rafId = requestAnimationFrame(() =>
        this.ensureStickyScroll("auto"),
      );
    });

    this.resizeObserver.observe(getResizeTarget(this.container));
  }

  private ensureStickyScroll(behavior: ScrollBehavior = "auto") {
    if (!this.isSticky$.getValue()) return;
    this.scrollToBottom(behavior);
  }

  private teardownResizeObserver() {
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
    this.cancelAnimation();
  }

  private cancelAnimation() {
    if (this.rafId != null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
}
