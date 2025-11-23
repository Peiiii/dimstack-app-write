import { useEffect, useState } from "react";
import type { BehaviorSubject } from "rxjs";

/**
 * Bridge a BehaviorSubject value into React state.
 * Encapsulates subscription side-effects away from feature hooks.
 */
export function useBehaviorSubjectValue<T>(subject: BehaviorSubject<T>) {
  const [value, setValue] = useState(() => subject.getValue());

  useEffect(() => {
    const subscription = subject.subscribe(setValue);
    return () => subscription.unsubscribe();
  }, [subject]);

  return value;
}
