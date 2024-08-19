import { css } from "@emotion/css";
import { FC } from "react";
import { componentService } from "xbook/services";
import { IPageAction, PageBoxController } from "xbook/ui/page-box/controller";

export const PageActionView: FC<{ action: IPageAction }> = ({ action }) => {
  const controller = PageBoxController.useExistingInstance()!;
  const { getCurrentPage } = controller;
  const { icon, onClick } = action;
  const Icon = componentService.useComponent(icon);
  return (
    <div
      key={action.id}
      onClick={() => {
        const page = getCurrentPage();
        if (page) {
          onClick({ page });
        }
      }}
      className={css`
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        &:hover {
          background: rgba(0, 0, 0, 0.1);
        }
      `}
    >
      {Icon ? <Icon /> : action.title}
    </div>
  );
};

export const PageActions = () => {
  const controller = PageBoxController.useExistingInstance()!;
  const { useActivePageActions } = controller;
  const activePageActions = useActivePageActions();

  return (
    <div
      className={css`
        display: flex;
        align-items: center;
        gap: 2px;
        padding: 4px;
      `}
    >
      {activePageActions.map((action) => (
        <PageActionView action={action} key={action.id}/>
      ))}
    </div>
  );
};
