import { AnyFunction } from "@/toolkit/types";
import React, { ReactNode, useEffect, useState } from "react";
import * as ReactDOM from "react-dom/client";
import { DeferredProxy } from "xbook/common/deferredProxy";
import { createDeferredComponentProxy } from "xbook/hooks/useDeferredComponentProxy";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/toolkit/utils/shadcn-utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

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
  closeIcon?: ReactNode | false;
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
  }: ModalSpec) => {
    const modal = createDeferredComponentProxy<ModalMethods>(({ proxy }) => {
      const ModalWrapper = ({ content }) => {
        const [open, setOpen] = useState(false);
        
        useEffect(() => {
          return proxy.register({
            open: () => setOpen(true),
            close: () => setOpen(false),
          });
        }, []);
        
        const handleOpenChange = (newOpen: boolean) => {
          setOpen(newOpen);
          if (!newOpen) {
            onCancel?.();
          }
        };
        
        const DialogContent = React.forwardRef<
          React.ElementRef<typeof DialogPrimitive.Content>,
          React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
            showCloseButton?: boolean;
          }
        >(({ className, children, showCloseButton = true, ...props }, ref) => {
          return (
            <DialogPrimitive.Portal>
              <DialogPrimitive.Overlay 
                className="fixed inset-0 z-50 bg-black/80 transition-opacity duration-300 data-[state=open]:opacity-100 data-[state=closed]:opacity-0" 
              />
              <style>{`
                @keyframes dialog-fade-in {
                  from {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.96);
                  }
                  to {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                  }
                }
                @keyframes dialog-fade-out {
                  from {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                  }
                  to {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.96);
                  }
                }
                [data-radix-dialog-content][data-state="open"] {
                  animation: dialog-fade-in 300ms ease-out;
                }
                [data-radix-dialog-content][data-state="closed"] {
                  animation: dialog-fade-out 200ms ease-in;
                }
              `}</style>
              <DialogPrimitive.Content
                ref={ref}
                className={cn(
                  "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background shadow-lg sm:rounded-lg",
                  className
                )}
                {...props}
              >
              {children}
              {showCloseButton && (
                <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              )}
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          );
        });
        DialogContent.displayName = "DialogContent";

        return (
          <ModalActionContext.Provider value={proxy}>
            <Dialog open={open} onOpenChange={handleOpenChange}>
              <DialogContent
                className={cn(
                  "sm:max-w-lg p-0",
                  modalContentClassName
                )}
                style={{
                  width: width || undefined,
                  height: height || undefined,
                  maxWidth: width || undefined,
                }}
                showCloseButton={closeIcon !== false}
              >
                {title && (
                  <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>{title}</DialogTitle>
                  </DialogHeader>
                )}
                {closeIcon && typeof closeIcon !== "boolean" && closeIcon}
                <div className={cn("px-6", modalBodyClassName)}>
                  {content}
                </div>
                {footer && (
                  <DialogFooter className="px-6 pb-6 pt-4">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setOpen(false);
                        onCancel?.();
                      }}
                    >
                      {cancelText}
                    </Button>
                    <Button
                      onClick={() => {
                        onOk?.();
                      }}
                    >
                      {okText}
                    </Button>
                  </DialogFooter>
                )}
              </DialogContent>
            </Dialog>
          </ModalActionContext.Provider>
        );
      };
      return <ModalWrapper content={content} />;
    });
    
    modalRoot.render(modal.instance);
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
        <div className="space-y-4">
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
          <Input 
            onChange={(e) => setContent(e.target.value)}
            autoFocus
          />
        </div>
      );
    });
    return new Promise((resolve) => {
      const modal = createModal({
        title,
        content: promptBox.instance,
        onOk: () => {
          resolve(promptBox.proxy.getInput());
          modal.close();
        },
        onCancel: () => {
          resolve(undefined);
        },
      });
      modal.open();
    });
  };
  const confirm = (props: { title: ReactNode; description?: ReactNode }) => {
    const { title, description } = props;
    return new Promise((resolve) => {
      const modal = createModal({
        title,
        content: description ? (
          <DialogDescription>{description}</DialogDescription>
        ) : null,

        onOk: () => {
          resolve(true);
          modal.close();
        },
        onCancel: () => {
          resolve(false);
          modal.close();
        },
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
