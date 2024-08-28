import {
  Button,
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom/client";
import { Field } from "@/toolkit/types/field";
import { createDeferredProxy } from "@/toolkit/factories/deferredProxy";

type FormDataDefinition = Field[];
const getContainer = (name: string) => {
  if (document.getElementById(name) !== null)
    return document.getElementById(name)!;
  else {
    const dom = document.createElement("div");
    dom.id = name;
    document.body.appendChild(dom);
    return dom;
  }
};

const getWrapper = (name) => {
  const container = getContainer(name);
  const wrapper = document.createElement("div");
  wrapper.className = "wrapper";
  container.appendChild(wrapper);
  return wrapper;
};

type AnyFunc = (...args: any[]) => any;
type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
export const createModalForm = <T extends FormDataDefinition>({
  fieldList,
  onFinish,
  onCancel,
  title,
  defaultData = {},
}: {
  fieldList: T;
  onFinish: (data: Record<ArrayElement<T>["name"], any>) => void;
  onCancel?: (e) => void;
  title: string;
  defaultData?: any;
}): {
  open: AnyFunc;
  close: AnyFunc;
  toggle: AnyFunc;
} => {
  const handle = createDeferredProxy<{
    open: AnyFunc;
    close: AnyFunc;
    toggle: AnyFunc;
  }>();
  function ModalForm() {
    const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
    const [data, setData] = useState(() => {
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
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    useEffect(() => {
      handle.register({
        open: onOpen,
        close: onClose,
        toggle: onToggle,
      });
      (window as any).handle = handle;
    }, []);

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
    const finish = () => {
      onFinish(autoFill(data));
      onClose();
    };
    return (
      <ChakraProvider>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {fieldList
                .filter((field) => !field.compute)
                .map(({ title, name, select }) => {
                  if (select) {
                    const { options } = select;
                    const currentValue = data[name];
                    const defaultIndex =
                      currentValue === undefined
                        ? undefined
                        : options.findIndex((op) => op.value === currentValue);
                    return (
                      <FormControl key={name}>
                        <FormLabel>{title}</FormLabel>
                        <Select
                          name={name}
                          onChange={(e) => {
                            const index = e.target.value;
                            const value = options[index].value;
                            setData({ ...data, [name]: value });
                          }}
                          defaultValue={defaultIndex || undefined}
                        >
                          {options.map(({ value, render, label }, index) => {
                            return (
                              <option key={index} value={index}>
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
                          name={name}
                          onChange={(e) => {
                            setData({ ...data, [name]: e.target.value });
                          }}
                          defaultValue={data[name] || ""}
                          placeholder={title}
                        />
                      </FormControl>
                    );
                })}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={finish}>
                Save
              </Button>
              <Button
                onClick={(e) => {
                  onClose();
                  onCancel?.(e);
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ChakraProvider>
    );
  }
  ReactDOM.createRoot(getWrapper("modal-container")).render(<ModalForm />);
  return handle;
};
