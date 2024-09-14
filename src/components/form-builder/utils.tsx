import { FormItemInput } from "@/components/form-builder/components/form-item-input";
import { FormItemSelect } from "@/components/form-builder/components/form-item-select";
import { FormState } from "@/components/form-builder/interfaces";
import { ComponentProps, createContext } from "react";
import { createNestedBean } from "rx-nested-bean";

export const narrowComponentPropsType = <TC extends React.FC<any>>(
  Component: TC
) => {
  return <TProps extends ComponentProps<TC>>() => {
    return (props: TProps) => {
      return <Component {...props} />;
    };
  };
};

export const createFormBean = <TFormData extends Record<string, any>>(
  fields: FormState<TFormData>
) => {
  const bean = createNestedBean<FormState<TFormData>>(fields);
  return Object.assign(bean, {});
};

export const getFormData = <TFormData extends Record<string, any>>(
  formState: FormState<TFormData>
): TFormData => {
  return Object.fromEntries(
    Object.entries(formState).map(([key, value]) => {
      return [key, value.value];
    })
  ) as TFormData;
};

export const FormControllerContext = createContext<
  ReturnType<typeof createFormBean> | undefined
>(undefined);

export const getFormItemComponents = <
  TFormData extends Record<string, any>
>() => {
  return {
    FormItemInput: narrowComponentPropsType(FormItemInput)<{
      name: Extract<keyof TFormData, string>;
    }>(),
    FormItemSelect: narrowComponentPropsType(FormItemSelect)<{
      name: Extract<keyof TFormData, string>;
    }>(),
  };
};
