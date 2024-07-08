import { css } from "@emotion/css";
import { componentService } from "xbook/services";
import { PageBoxController } from "xbook/ui/page-box/controller";

export const PageActions = () => {
  const controller = PageBoxController.useExistingInstance()!;
  const { useActivePageActions } = controller;
  const activePageActions = useActivePageActions();
  console.log("activePageActions", activePageActions);

  return (
    <div
      className={css`
        display: flex;
        align-items: center;
        gap: 2px;
      `}
    >
      {activePageActions.map((action) => {
        const { icon, onClick } = action;
        const Icon = componentService.useComponent(icon);
        return (
          <div key={action.id} onClick={onClick}>
            {Icon ? <Icon /> : action.title}
          </div>
        );
      })}
    </div>
  );
};
