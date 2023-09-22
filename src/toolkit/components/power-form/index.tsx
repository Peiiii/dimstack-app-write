import { Atom, AtomSpec } from "@/toolkit/common/atom";
import { SafeAny } from "@/toolkit/common/types";
import { Field } from "@/toolkit/types/field";
import { Flex, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export type PowerFormAtom<T extends { [k: string]: SafeAny }> = Atom<{
  events: { valueChange: [Partial<T>] };
  services: {
    getData: () => Partial<T>;
    setData: <K extends keyof T>(
      keyOrData: Partial<T> | K,
      value?: T[K]
    ) => void;
  };
}>;
const PowerForm = <T extends { [k: string]: SafeAny }>({
  fields: fieldList,
  defaultData = {},
  atom,
}: {
  fields: Field<Exclude<keyof T, number | symbol>, T[keyof T]>[];
  defaultData?: Partial<T>;
  atom?: Atom<{
    events: { valueChange: [Partial<T>] };
    services: {
      getData: () => Partial<T>;
      setData: <K extends keyof T>(
        keyOrData: Partial<T> | K,
        value?: T[K]
      ) => void;
    };
  }>;
}) => {
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

  useEffect(() => {
    if (atom) {
      atom.expose("getData", () => formData);
      atom.expose("setData", (keyOrData, value) => {
        if (typeof keyOrData === "string") {
          setFormData({ ...formData, [keyOrData]: value });
        } else {
          setFormData(keyOrData as Partial<T>);
        }
      });
    }
  }, [atom, formData, setFormData]);
  //   atom?.on("change",(data)=>{
  //     console.log();
  //   })
  //   atom?.on("ddd",()=>{})
  console.log("formData:",formData);
  return (
    <>
      {fieldList
        .filter((field) => !field.compute)
        .map(({ title, name, select }) => {
          if (select) {
            const { options } = select;
            // const currentValue = formData[name];
            // const defaultIndex =
            //   currentValue === undefined
            //     ? undefined
            //     : options.findIndex((op) => op.value === currentValue);
            // console.log("defaultValueIndex: ", defaultIndex);
            return (
              <FormControl key={name}>
                <FormLabel>{title}</FormLabel>
                <Select
                  name={name}
                  value={formData[name]}
                  onChange={(e) => {
                    const value = e.target.value;
                    // const value = options[index].value;
                    // console.log("index:", index, "value:", value);
                    setFormData({ ...formData, [name]: value });
                    atom?.emit("valueChange", { ...formData, [name]: value });
                  }}
                //   defaultValue={defaultIndex || undefined}
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
                    atom?.emit("valueChange", {
                      ...formData,
                      [name]: e.target.value,
                    });
                  }}
                //   defaultValue={formData[name] || ""}
                  placeholder={title}
                />
              </FormControl>
            );
        })
        .map((c) => (
          <Flex mb="18px">{c}</Flex>
        ))}
    </>
  );
};

export default PowerForm;
