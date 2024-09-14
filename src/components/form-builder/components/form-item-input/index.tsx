import { FormControllerContext } from "../../utils";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { FC, useContext } from "react";

export const FormItemInput: FC<{
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
  const { value, title } = form.namespaces[name].use();
  return (
    <FormControl key={name}>
      <FormLabel>{title}</FormLabel>
      <Input
        value={value}
        name={name}
        onChange={(e) => {
          const newValue = e.target.value;
          setValue(newValue);
        }}
        placeholder={title}
      />
    </FormControl>
  );
};
