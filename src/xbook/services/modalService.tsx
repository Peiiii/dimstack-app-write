import { AnyFunction } from "@/toolkit/common/types";
import {
  Button,
  ChakraProvider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom/client";
import { createDeferredComponentProxy } from "xbook/hooks/useDeferredComponentProxy";
export type ModalSpec = {
  title?: string;
  content: React.ReactNode;
  onOk?: AnyFunction;
  onCancel?: AnyFunction;
  okText?: string;
  cancelText?: string;
  footer?: boolean;
};

export const createModalService = () => {
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

  const createModal = ({
    content,
    title,
    onOk,
    onCancel,
    okText="Confirm",
    cancelText="Cancel",
    footer=true,
  }: ModalSpec) => {
    const modal = createDeferredComponentProxy<ModalMethods>(({ proxy }) => {
      const ModalWrapper = ({ content }) => {
        const { isOpen, onOpen, onClose } = useDisclosure();
        useEffect(() => {
          return proxy.register({
            open: () => onOpen(),
            close: () => onClose(),
          });
        }, [onOpen, onClose, isOpen]);
        return (
          <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              {title && <ModalHeader>{title}</ModalHeader>}
              <ModalCloseButton  tabIndex={-1} />
              <ModalBody>{content}</ModalBody>

              {footer && (
                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      onOk?.();
                    }}
                  >
                    {okText}
                  </Button>
                  <Button
                    variant="ghost"
                    mr={3}
                    onClick={() => {
                      onClose();
                      onCancel?.();
                    }}
                  >
                    {cancelText}
                  </Button>
                </ModalFooter>
              )}
            </ModalContent>
          </Modal>
        );
      };
      return <ModalWrapper content={content} />;
    });
    ReactDOM.createRoot(getWrapper("modal-container")).render(
      <ChakraProvider>{modal.instance}</ChakraProvider>
    );
    return modal.proxy;
  };
  return { createModal };
};

type ModalMethods = {
  open: () => void;
  close: () => void;
};

export const modalService = createModalService();
