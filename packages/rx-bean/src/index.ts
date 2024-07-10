/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { BehaviorSubject, Observable, distinctUntilChanged } from "rxjs";

// eslint-disable-next-line react-hooks/exhaustive-deps
const useOnce = <T>(fn: () => T) => useMemo(fn, []);

export type IGetterKey<TKey extends string> = `get${TKey}`;

export type ISetterKey<TKey extends string> = `set${TKey}`;

export type ISubscriberKey<TKey extends string> = `subscribe${TKey}`;

export type IUserKey<TKey extends string> = `use${TKey}`;

export type IObservableKey<TKey extends string> = `${TKey}$`;

export type IMetaKey = "$$meta";

export type IBeanKey<TKey extends string> =
  | IGetterKey<TKey>
  | ISetterKey<TKey>
  | ISubscriberKey<TKey>
  | IObservableKey<TKey>
  | IMetaKey;

export type IReactBeanKey<TKey extends string> =
  | IGetterKey<TKey>
  | ISetterKey<TKey>
  | ISubscriberKey<TKey>
  | IUserKey<TKey>
  | IObservableKey<TKey>
  | IMetaKey;

export type IBeanGetterAction<TData> = () => TData;

export type IBeanSetterAction<TData> = (data: TData) => void;

export type IBeanSubscriberAction<TData> = (
  callback: (data: TData) => void
) => () => void;

export type IBeanObservableAction<TData> = Observable<TData>;

export type IBeanUserAction<TData> = () => TData;

export type IBean<TKey extends string, TData> = {
  [key in IBeanKey<TKey>]: key extends IGetterKey<TKey>
    ? IBeanGetterAction<TData>
    : key extends ISetterKey<TKey>
    ? IBeanSetterAction<TData>
    : key extends ISubscriberKey<TKey>
    ? IBeanSubscriberAction<TData>
    : key extends IObservableKey<TKey>
    ? IBeanObservableAction<TData>
    : key extends IMetaKey
    ? {
        key: TKey;
      }
    : never;
};

export type IReactBean<TKey extends string, TData> = {
  [key in IReactBeanKey<TKey>]: key extends IGetterKey<TKey>
    ? IBeanGetterAction<TData>
    : key extends ISetterKey<TKey>
    ? IBeanSetterAction<TData>
    : key extends ISubscriberKey<TKey>
    ? IBeanSubscriberAction<TData>
    : key extends IObservableKey<TKey>
    ? IBeanObservableAction<TData>
    : key extends IUserKey<TKey>
    ? IBeanUserAction<TData>
    : key extends IMetaKey
    ? {
        key: TKey;
      }
    : never;
};

export type IReactBeanUser<TKey extends string, TData> = {
  [key in IUserKey<TKey>]: IBeanUserAction<TData>;
};

export type ICustomBean<TKey extends string, TData, IReturn> = IBean<
  TKey,
  TData
> &
  IReturn;

export type ICustomReactBean<TKey extends string, TData, IReturn> = IReactBean<
  TKey,
  TData
> &
  IReturn;

export const enhance = <T, IReturn>(
  rawBean: T,
  initialize: (bean: T) => IReturn
) => {
  return { ...rawBean, ...initialize?.(rawBean) };
};

export const withUseHook = <IKey extends string, IData>(
  bean: IBean<IKey, IData>
) => {
  const key = (bean as any).$$meta.key as IKey;
  return {
    ...bean,
    [`use${key}`]: () => {
      const [value, setValue] = useState<IData>((bean as any)[`get${key}`]());
      useEffect(() => {
        const subscription = (bean as any)[`${key}$`]
          .pipe(distinctUntilChanged())
          .subscribe((data: IData) => {
            setValue(data);
          });
        return () => subscription.unsubscribe();
      }, []);
      return value;
    },
  } as IReactBean<IKey, IData>;
};

export type IAnyTypeOfBean<TKey extends string, TData, IExtra> =
  | IBean<TKey, TData>
  | IReactBean<TKey, TData>
  | ICustomBean<TKey, TData, IExtra>
  | ICustomReactBean<TKey, TData, IExtra>;

export type IAnyTypeOfUsableBean<TKey extends string, TData, IExtra> =
  | IReactBean<TKey, TData>
  | ICustomReactBean<TKey, TData, IExtra>;

export const useBeanValue = <IKey extends string, IData, IExtra>(
  bean:
    | IBean<IKey, IData>
    | IReactBean<IKey, IData>
    | ICustomBean<IKey, IData, IExtra>
    | ICustomReactBean<IKey, IData, IExtra>
) => {
  const key = (bean as any).$$meta.key as IKey;
  const [value, setValue] = useState<IData>((bean as any)[`get${key}`]());
  useEffect(() => {
    const subscription = (bean as any)[`${key}$`]
      .pipe(distinctUntilChanged())
      .subscribe((data: IData) => {
        setValue(data);
      });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return value;
};
/**
 example:
  const PageSize = createReactBean("PageSize", 10);
  const Current= createReactBean("Current", 1);
  const Total = createReactBean("Total", 0);
  const Pagination = compose("Pagination", {
    pageSize: PageSize,
    current: Current,
    total: Total,
  });
  Pagination.usePagination();
  
 */

export const createBeanFromBehaviorSubject = <IKey extends string, IData>(
  key: IKey,
  behaviorSubject: BehaviorSubject<IData>
) => {
  return {
    [`get${key}`]: () => behaviorSubject.getValue(),
    [`set${key}`]: (data: IData) => behaviorSubject.next(data),
    [`subscribe${key}`]: (callback: (data: IData | undefined) => void) => {
      const subscription = behaviorSubject.subscribe(callback);
      return () => subscription.unsubscribe();
    },
    [`${key}$`]: behaviorSubject.asObservable(),
    $$meta: {
      key,
    },
  } as IBean<IKey, IData>;
};

export const createBeanFromObservable = <IKey extends string, IData, TDefault>(
  key: IKey,
  observable: Observable<IData>,
  defaultValue: TDefault
) => {
  const behaviorSubject = new BehaviorSubject<IData | TDefault>(defaultValue);
  observable.subscribe(behaviorSubject);
  return createBeanFromBehaviorSubject<IKey, IData | TDefault>(
    key,
    behaviorSubject
  );
};

export const createBean = <IKey extends string, IData>(
  key: IKey,
  initialValue: IData
) => {
  const behaviorSubject = new BehaviorSubject<IData>(initialValue);
  return createBeanFromBehaviorSubject<IKey, IData>(key, behaviorSubject);
};

export const createCustomBean = <IKey extends string, IData, IReturn>(
  key: IKey,
  initialValue: IData,
  initialize: (bean: IBean<IKey, IData>) => IReturn
) => {
  return enhance(createBean(key, initialValue), initialize);
};

export const createReactBean = <IKey extends string, IData>(
  key: IKey,
  initialValue: IData
) => {
  return withUseHook(createBean(key, initialValue));
};

export const createCustomReactBean = <IKey extends string, IData, IReturn>(
  key: IKey,
  initialValue: IData,
  initialize: (bean: IReactBean<IKey, IData>) => IReturn
) => {
  return enhance(createReactBean(key, initialValue), initialize);
};

export const useReactBeanState = <IKey extends string, IData>(
  key: IKey,
  initialValue: IData
) => {
  const bean = useOnce(() => createReactBean(key, initialValue));
  return [useBeanValue(bean), bean] as const;
};

export const useCustomReactBeanState = <IKey extends string, IData, IReturn>(
  key: IKey,
  initialValue: IData,
  initialize: (bean: IReactBean<IKey, IData>) => IReturn
) => {
  const bean = useOnce(() =>
    createCustomReactBean(key, initialValue, initialize)
  );
  return [useBeanValue<IKey, IData, IReturn>(bean), bean] as const;
};

export type IBeanMapData<TBeans extends Record<string, IBean<string, any>>> = {
  [K in keyof TBeans]: TBeans[K] extends IBean<string, infer V> ? V : never;
};

export type TTest = IBeanMapData<{
  a: IBean<string, number>;
  b: IBean<string, string>;
}>;

export const compose = <
  TKey extends string,
  TBeanMap extends Record<string, any>
>(
  key: TKey,
  beanMap: TBeanMap
): IBean<TKey, IBeanMapData<TBeanMap>> => {
  const keys = Object.keys(beanMap) as Array<keyof TBeanMap>;
  const behaviorSubject = new BehaviorSubject<IBeanMapData<TBeanMap>>(
    keys.reduce((acc, key) => {
      // eslint-disable-next-line no-param-reassign
      acc[key] = (beanMap[key] as any).get();
      return acc;
    }, {} as IBeanMapData<TBeanMap>)
  );
  Object.entries(beanMap).forEach(([key, bean]) => {
    (bean as any).subscribe((data: any) => {
      behaviorSubject.next({
        ...behaviorSubject.getValue(),
        [key]: data,
      });
    });
  });
  behaviorSubject.subscribe((data) => {
    keys.forEach((key) => {
      const prevData = (beanMap[key] as any).get();
      if (prevData !== data[key]) {
        (beanMap[key] as any).set(data[key]);
      }
    });
  });
  return {
    [`get${key}`]: () => behaviorSubject.getValue(),
    [`set${key}`]: (data: IBeanMapData<TBeanMap>) => behaviorSubject.next(data),
    [`subscribe${key}`]: (callback: (data: IBeanMapData<TBeanMap>) => void) => {
      const subscription = behaviorSubject.subscribe(callback);
      return () => subscription.unsubscribe();
    },
    [`${key}$`]: behaviorSubject.asObservable(),
  } as IBean<TKey, IBeanMapData<TBeanMap>>;
};

const getKey = <TKey extends string, TData, TExtra>(
  bean: IAnyTypeOfBean<TKey, TData, TExtra>
) => {
  return (bean as any).$$meta.key as TKey;
};

const getGetter = <TKey extends string, TData, TExtra>(
  bean: IAnyTypeOfBean<TKey, TData, TExtra>
) => {
  const key = (bean as any).$$meta.key as TKey;
  return bean[`get${key}`] as IBeanGetterAction<TData>;
};
const getSetter = <TKey extends string, TData, TExtra>(
  bean: IAnyTypeOfBean<TKey, TData, TExtra>
) => {
  const key = (bean as any).$$meta.key as TKey;
  return bean[`set${key}`] as IBeanSetterAction<TData>;
};
const getSubscriber = <TKey extends string, TData, TExtra>(
  bean: IAnyTypeOfBean<TKey, TData, TExtra>
) => {
  const key = (bean as any).$$meta.key as TKey;
  return bean[`subscribe${key}`] as IBeanSubscriberAction<TData>;
};
const getObservable = <TKey extends string, TData, TExtra>(
  bean: IAnyTypeOfBean<TKey, TData, TExtra>
) => {
  const key = (bean as any).$$meta.key as TKey;
  return bean[`${key}$`] as IBeanObservableAction<TData>;
};
const getUser = <TKey extends string, TData, TExtra>(
  bean: IAnyTypeOfUsableBean<TKey, TData, TExtra>
) => {
  const key = (bean as any).$$meta.key as TKey;
  return bean[`use${key}`] as IBeanUserAction<TData>;
};

export class BeanReflector {
  static getKey = getKey;
  
  static getGetter = getGetter;

  static getSetter = getSetter;

  static getSubscriber = getSubscriber;

  static getObservable = getObservable;

  static getUser = getUser;
}

export const exampleBean = createBean("Example", "Hello");

export const exampleReactBean = withUseHook(exampleBean);

export const enhancedExampleReactBean = enhance(exampleReactBean, (bean) => {
  return {
    doSomething: () => {
      bean.setExample("Hello World");
    },
  };
});
