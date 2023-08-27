import { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;
const useStateControl = (proxy, initialState) => {
  const [state, setState] = useState(initialState);
  useEffect(() => {
    const getState = () => {
      return state;
    };
    proxy.register({
      setState,
      getState,
    });
  }, [state, setState]);
  return [state, setState];
};
const useVisibilityControl = (proxy, defaultValue) => {
  const [visible, setVisible] = useState(defaultValue);
  useEffect(() => {
    const show = () => {
      setVisible(true);
    };
    const hide = () => setVisible(false);
    const toggle = () => setVisible(!visible);
    proxy.register({
      show,
      hide,
      toggle,
    });
  }, [visible, setVisible]);
  return {
    visible,
    setVisible,
  };
};
const useBooleanControl = (proxy, initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((v) => !v);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  useEffect(() => {
    proxy.register({ toggle, setTrue, setFalse });
  }, [proxy, toggle, setTrue, setFalse]);

  return {
    value,
    setValue,
    toggle,
    setTrue,
    setFalse,
  };
};
const useBeanControl = (proxy, name: string, initialValue?) => {
  const [value, setValue] = useState(initialValue);
  const handle = {};
  name = name[0].toUpperCase() + name.slice(1);
  handle["get" + name] = () => value;
  handle["set" + name] = (v) => setValue(v);

  useEffect(() => {
    proxy.register(handle);
  }, [proxy, handle]);

  return {
    value,
    setValue,
    ...handle,
  };
};

export type VisibilityControl = {
  hide: AnyFunction;
  show: AnyFunction;
  toggle: AnyFunction;
};
export const ProxiedControls = {
  useStateControl,
  useVisibilityControl,
  useBooleanControl,
  useBeanControl,
};
