import { useEffect, useMemo } from "react";
import { Observable } from "rxjs";

export const useSubscribeObservable = <T>(
  observableOrGetObervable: Observable<T> | (() => Observable<T>),
  next?: (value: T) => void,
  error?: (error: any) => void,
  complete?: () => void
) => {
  const observable = useMemo(() => {
    if (typeof observableOrGetObervable === "function") {
      return observableOrGetObervable();
    }
    return observableOrGetObervable;
  }, []);

  useEffect(() => {
    const subscription = observable.subscribe({ next, error, complete });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
};
