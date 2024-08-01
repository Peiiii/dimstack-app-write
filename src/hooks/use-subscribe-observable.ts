import { useEffect, useState } from "react";
import { Observable } from "rxjs";

export const useSubscribeObservable = <T>(
  observableOrGetObervable: Observable<T> | (() => Observable<T>),
  next: (value: T) => void,
  error?: (error: any) => void,
  complete?: () => void
) => {
  const [observable] = useState(observableOrGetObervable);
  useEffect(() => {
    const subscription = observable.subscribe({ next, error, complete });
    return () => {
      subscription.unsubscribe();
    };
  }, [observable, next, error, complete]);
};
