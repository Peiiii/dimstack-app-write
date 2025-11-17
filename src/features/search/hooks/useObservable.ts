import { useEffect, useState } from "react";
import type { Observable } from "rxjs";

export function useObservable<T>(obs: Observable<T>, initial: T): T {
  const [state, setState] = useState<T>(initial);
  useEffect(() => {
    const sub = obs.subscribe(setState);
    return () => sub.unsubscribe();
  }, [obs]);
  return state;
}

