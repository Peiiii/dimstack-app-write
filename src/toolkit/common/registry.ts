type Callback<T> = (value: T) => void;
type CancelFunction = () => void;
interface Registry<T> {
  has: (key: keyof T) => boolean;
  get: <K extends keyof T>(key: K) => T[K] | undefined;
  set: <K extends keyof T>(key: K, value: T[K]) => void;
  waitAvailable: <K extends keyof T>(key: K, callback: Callback<T[K]>) => void;
  subscribe: <K extends keyof T>(
    key: K,
    callback: Callback<T[K]>
  ) => CancelFunction;
}

const Registry = {
  create: <T>(): Registry<T> => {
    const map: Partial<T> = {};
    const observers: { key: keyof T; callback: Callback<T[keyof T]> }[] = [];

    const has = (key: keyof T): boolean => {
      return key in map;
    };

    const get = <K extends keyof T>(key: K): T[K] | undefined => {
      return map[key];
    };

    const set = <K extends keyof T>(key: K, value: T[K]): void => {
      map[key] = value;
    };

    const notifyObservers = <K extends keyof T>(key: K, value: T[K]): void => {
      const filteredObservers = observers.filter(
        (observer) => observer.key === key
      );
      for (const observer of filteredObservers) {
        observer.callback(value);
      }
    };

    const subscribe = <K extends keyof T>(
      key: K,
      callback: Callback<T[K]>
    ): CancelFunction => {
      const observer = {
        key: key as keyof T,
        callback: callback as Callback<T[keyof T]>,
      };
      observers.push(observer);

      return () => {
        const index = observers.indexOf(observer);
        if (index >= 0) {
          observers.splice(index, 1);
        }
      };
    };

    const waitAvailable = <K extends keyof T>(
      key: K,
      callback: Callback<T[K]>
    ): void => {
      if (has(key)) {
        const value = get(key);
        callback(value!);
      } else {
        const observer = {
          key: key as keyof T,
          callback: (value: T[keyof T]) => {
            callback(value as T[K]);
            const index = observers.indexOf(observer);
            if (index >= 0) {
              observers.splice(index, 1);
            }
          },
        };
        observers.push(observer);
      }
    };

    const setWithNotify = <K extends keyof T>(key: K, value: T[K]): void => {
      set(key, value);
      notifyObservers(key, value);
    };

    return {
      has,
      get,
      set: setWithNotify,
      waitAvailable,
      subscribe,
    };
  },
};

export const createRegistry = <T>(): Registry<T> => Registry.create<T>();
// interface Person {
//   name: string;
//   age: number;
// }

// const personRegistry = createRegistry<Person>();
// personRegistry.set("name", "John"); // 正确
// personRegistry.set("age", 25); // 正确
// personRegistry.set("name", 42); // 错误，值的类型与声明不匹配
// personRegistry.set("height", 180); // 错误，不允许设置未声明的键

// const nameCallback: Callback<string> = (value) => {
//   console.log(`Name changed to: ${value}`);
// };

// const cancelNameCallback = personRegistry.waitAvailable("name", nameCallback); // 注册回调
// personRegistry.set("name", "Alice"); // 触发回调
// cancelNameCallback(); // 取消回调

// const ageCallback: Callback<number> = (value) => {
//   console.log(`Age changed to: ${value}`);
// };

// const cancelAgeCallback = personRegistry.waitAvailable("age", ageCallback); // 注册回调
// personRegistry.set("age", 30); // 触发回调
// cancelAgeCallback(); // 取消回调

// type Callback<T> = (value: T) => void;
// type CancelFunction = () => void;

// interface Registry {
//   has: (key: string) => boolean;
//   get: <T>(key: string) => T | undefined;
//   set: <T>(key: string, value: T) => void;
//   waitAvailable: <T>(key: string, callback: Callback<T>) => CancelFunction;
// }

// const Registry = {
//   create: (): Registry => {
//     const map = new Map<string, any>();
//     const has = map.has.bind(map);
//     const get = map.get.bind(map);
//     const set = map.set.bind(map);

//     const waitAvailable = <T>(key: string, callback: Callback<T>): CancelFunction => {
//       if (has(key)) {
//         const value = get(key);
//         callback(value);
//         return () => {}; // 返回一个空的取消函数
//       } else {
//         const observer = {
//           callback,
//           cleanup: () => {
//             const index = observers.indexOf(observer);
//             if (index >= 0) {
//               observers.splice(index, 1);
//             }
//           },
//         };
//         observers.push(observer);

//         return () => {
//           observer.cleanup(); // 取消等待时清理观察者
//         };
//       }
//     };

//     const observers: { callback: Callback<any>; cleanup: () => void }[] = [];

//     const setWithNotify = <T>(key: string, value: T): void => {
//       set(key, value);
//       for (const observer of observers) {
//         observer.callback(value);
//         observer.cleanup();
//       }
//     };

//     return {
//       has,
//       get,
//       set: setWithNotify,
//       waitAvailable,
//     };
//   },
// };

// export const createRegistry = (): Registry => Registry.create();
// export const registry: Registry = Registry.create();

// type Callback<T> = (value: T) => void;
// type CancelFunction = () => void;

// interface Registry {
//   has: (key: string) => boolean;
//   get: <T>(key: string) => T | undefined;
//   set: <T>(key: string, value: T) => void;
//   waitAvailable: <T>(key: string, callback: Callback<T>) => CancelFunction;
// }

// const Registry = {
//   create: (): Registry => {
//     const map: Record<string, any> = {};

//     const has = (key: string): boolean => {
//       return Object.prototype.hasOwnProperty.call(map, key);
//     };

//     const get = <T>(key: string): T | undefined => {
//       return map[key];
//     };

//     const set = <T>(key: string, value: T): void => {
//       map[key] = value;
//     };

//     const waitAvailable = <T>(
//       key: string,
//       callback: Callback<T>
//     ): CancelFunction => {
//       if (has(key)) {
//         const value = get<T>(key)!;
//         callback(value);
//         return () => {}; // 返回一个空的取消函数
//       } else {
//         const observer = {
//           callback,
//           cleanup: () => {
//             const index = observers.indexOf(observer);
//             if (index >= 0) {
//               observers.splice(index, 1);
//             }
//           },
//         };
//         observers.push(observer);

//         return () => {
//           observer.cleanup(); // 取消等待时清理观察者
//         };
//       }
//     };

//     const observers: { callback: Callback<any>; cleanup: () => void }[] = [];

//     const setWithNotify = <T>(key: string, value: T): void => {
//       set(key, value);
//       for (const observer of observers) {
//         observer.callback(value);
//         observer.cleanup();
//       }
//     };

//     return {
//       has,
//       get,
//       set: setWithNotify,
//       waitAvailable,
//     };
//   },
// };

// export const createRegistry = (): Registry => Registry.create();
// export const registry: Registry = Registry.create();
