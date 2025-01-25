import { createEventBus } from "@/toolkit/factories/eventBus";
import { SafeAny } from "@/toolkit/types";
import { Field } from "@/toolkit/types/field";
import { Flex, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

export interface PowerFormRef<T> {
  getData: () => Partial<T>;
  setData: (keyOrData: Partial<T> | string, value?: T[keyof T]) => void;
  onChange: (callback: (data: Partial<T>) => void) => void;
}

export const PowerForm = forwardRef(
  <T extends { [k: string]: SafeAny }>(
    {
      fields: fieldList,
      defaultData = {},
      // onChange,
    }: {
      fields: Field<Exclude<keyof T, number | symbol>, T[keyof T]>[];
      defaultData?: Partial<T>;
      // onChange?: (data: Partial<T>) => void;
    },
    ref: ForwardedRef<PowerFormRef<T>>
  ) => {
    const eventBus = useMemo(() => createEventBus(), []);
    const [formData, setFormData] = useState(() => {
      fieldList.forEach((field) => {
        if (
          !Object.keys(defaultData).includes(field.name) &&
          field.defaultValue
        ) {
          defaultData[field.name] =
            typeof field.defaultValue === "function"
              ? field.defaultValue()
              : field.defaultValue;
        }
      });
      return defaultData;
    });
    const autoFill = (data) => {
      fieldList
        .filter(
          (field) => field.compute && (!data[field.name] || field.modifiable)
        )
        .forEach((field) => {
          data[field.name] = field.compute!(data);
        });
      return data;
    };

    useImperativeHandle(ref, () => ({
      getData: () => formData,
      setData: (keyOrData, value) => {
        if (typeof keyOrData === "string") {
          setFormData({ ...formData, [keyOrData]: value });
        } else {
          setFormData(keyOrData as Partial<T>);
        }
      },
      onChange: (callback) => {
        eventBus.on("change", callback);
      },
    }));

    return (
      <>
        {fieldList
          .filter((field) => !field.compute)
          .map(({ title, name, select }) => {
            if (select) {
              const { options } = select;
              return (
                <FormControl key={name}>
                  <FormLabel>{title}</FormLabel>
                  <Select
                    name={name}
                    value={formData[name]}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData({ ...formData, [name]: value });
                      eventBus.emit("change", { ...formData, [name]: value });
                    }}
                  >
                    {options.map(({ value, render, label }, index) => {
                      return (
                        <option key={index} value={value}>
                          {label || render!(value, index)}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
              );
            } else
              return (
                <FormControl key={name}>
                  <FormLabel>{title}</FormLabel>
                  <Input
                    value={formData[name]}
                    name={name}
                    onChange={(e) => {
                      setFormData({ ...formData, [name]: e.target.value });
                      eventBus.emit("change",{ ...formData, [name]: e.target.value },);
                    }}
                    placeholder={title}
                  />
                </FormControl>
              );
          })
          .map((c, index) => (
            <Flex key={index} mb="18px">
              {c}
            </Flex>
          ))}
      </>
    );
  }
);

export default PowerForm;
