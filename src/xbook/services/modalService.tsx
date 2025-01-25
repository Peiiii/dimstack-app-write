import { AnyFunction } from "@/toolkit/types";
import {
  Button,
  ChakraProvider,
  Input,
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
import React, { ReactNode, useEffect, useState } from "react";
import * as ReactDOM from "react-dom/client";
import { DeferredProxy } from "xbook/common/deferredProxy";
import { createDeferredComponentProxy } from "xbook/hooks/useDeferredComponentProxy";

const modalRoot = ReactDOM.createRoot(
  (() => {
    const container = document.createElement('div');
    container.id = 'modal-container';
    document.body.appendChild(container);
    return container;
  })()
);

export type ModalSpec = {
  title?: ReactNode;
  content: React.ReactNode;
  onOk?: AnyFunction;
  onCancel?: AnyFunction;
  okText?: string;
  cancelText?: string;
  footer?: boolean;
  width?: string;
  height?: string;
  closeIcon?: ReactNode;
  modalContentClassName?: string;
  modalBodyClassName?: string;
  autoFocus?: boolean;
};

export const ModalActionContext = React.createContext<
  DeferredProxy<ModalMethods> | undefined
>(undefined);

export const createModalService = () => {
  const createModal = ({
    content,
    title,
    onOk,
    onCancel,
    okText = "Confirm",
    cancelText = "Cancel",
    footer = true,
    width,
    height,
    closeIcon,
    modalContentClassName,
    modalBodyClassName,
    autoFocus,
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
          <ModalActionContext.Provider value={proxy}>
            <Modal
              blockScrollOnMount={false}
              isOpen={isOpen}
              onClose={onClose}
              autoFocus={autoFocus}
            >
              <ModalOverlay />
              <ModalContent
                className={modalContentClassName}
                width={width}
                height={height}
                maxWidth={width ? "1000000px !important" : undefined}
              >
                {title && <ModalHeader>{title}</ModalHeader>}
                {closeIcon === undefined && <ModalCloseButton tabIndex={-1} />}
                {closeIcon && closeIcon}
                <ModalBody className={modalBodyClassName}>{content}</ModalBody>

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
          </ModalActionContext.Provider>
        );
      };
      return <ModalWrapper content={content} />;
    });
    
    modalRoot.render(
      <ChakraProvider>{modal.instance}</ChakraProvider>
    );
    return modal.proxy;
  };

  const open = (...params: Parameters<typeof createModal>) => {
    const modal = createModal(...params);
    modal.open();
    return modal;
  };

  const prompt = (title: ReactNode, description: ReactNode) => {
    const promptBox = createDeferredComponentProxy<{
      getInput: () => string | undefined;
    }>(({ proxy }) => {
      const [content, setContent] = useState<string>();
      useEffect(() => {
        proxy.register({
          getInput: () => content,
        });
      }, [content, proxy]);
      return (
        <div>
          <Text>{description}</Text>
          <Input onChange={(e) => setContent(e.target.value)}></Input>
        </div>
      );
    });
    return new Promise((resolve) => {
      createModal({
        title,
        content: promptBox.instance,
        onOk: () => {
          resolve(promptBox.proxy.getInput());
        },
        onCancel: () => {
          resolve(undefined);
        },
      });
    });
  };
  const confirm = (props: { title: ReactNode; description?: ReactNode }) => {
    const { title, description } = props;
    return new Promise((resolve) => {
      const modal = createModal({
        title,
        content: <div>{description}</div>,

        onOk: () => {
          resolve(true);
          modal.close();
        },
        onCancel: () => {
          resolve(false);
          modal.close();
        },
        autoFocus: true,
      });
      modal.open();
    });
  };

  return { createModal, prompt, confirm, open };
};

type ModalMethods = {
  open: () => void;
  close: () => void;
};

export const modalService = createModalService();
