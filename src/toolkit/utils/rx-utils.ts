import { ReplaySubject } from "rxjs";

export const createObservableFromExternalStore = <T>(
  getter: () => T,
  subscribe: (callback: (value: T) => void) => void
) => {
  const subject = new ReplaySubject<T>(1);
  subject.next(getter());
  subscribe((value) => {
    subject.next(value);
  });
  return subject;
};
