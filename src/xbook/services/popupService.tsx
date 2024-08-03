import React from "react";
import ReactDOM from "react-dom/client";

interface PopupProps {
  content: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  targetRect: DOMRect | null;
}

const Popup: React.FC<PopupProps> = ({
  content,
  isOpen,
  onClose,
  targetRect,
}) => {
  if (!isOpen || !targetRect) return null;

  const popupStyle: React.CSSProperties = {
    position: "absolute",
    top: targetRect.bottom + window.scrollY,
    left: targetRect.left + window.scrollX,
    background: "white",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={popupStyle} onClick={onClose}>
      {content}
    </div>
  );
};

let currentPopup: { destroy: () => void } | null = null;

const renderPopup = (element: HTMLElement, content: React.ReactNode) => {
  if (currentPopup) {
    currentPopup.destroy();
  }

  const targetRect = element.getBoundingClientRect();

  const popupRoot = document.createElement("div");
  document.body.appendChild(popupRoot);

  const root = ReactDOM.createRoot(popupRoot);

  const destroy = () => {
    root.unmount();
    document.body.removeChild(popupRoot);
  };

  currentPopup = { destroy };

  root.render(
    <Popup
      content={content}
      isOpen={true}
      onClose={() => {
        destroy();
        currentPopup = null;
      }}
      targetRect={targetRect}
    />
  );

  return () => {
    destroy();
    currentPopup = null;
  };
};

export const popupService = {
  open: ({
    target,
    content,
  }: {
    target: HTMLElement;
    content: React.ReactNode;
  }) => {
    return renderPopup(target, content);
  },
};
