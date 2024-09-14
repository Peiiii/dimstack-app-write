import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { FC, useContext } from "react";
import { FormControllerContext } from "../../utils";

export const FormItemSelect: FC<{
  name: string;
}> = ({ name }) => {
  const form = useContext(FormControllerContext)!;
  const {
    namespaces: {
      [name]: {
        namespaces: {
          value: { set: setValue },
        },
      },
    },
  } = form;
  const { value, options = [], title } = form.namespaces[name].use();

  return (
    <FormControl key={name}>
      <FormLabel>{title}</FormLabel>
      <Select
        name={name}
        value={value}
        onChange={(e) => {
          const value = e.target.value;
          setValue(value);
        }}
      >
        {options.map(({ value, label }, index) => {
          return (
            <option key={index} value={value}>
              {label}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};
