import { createPlugin } from "xbook/common/createPlugin";
import { EventKeys } from "@/constants/eventKeys";
import { AIChatSidebar } from "@/features/ai-assistant/AIChatSidebar";
import { AiOutlineRobot } from "react-icons/ai";

export const featureAIAssistant = createPlugin({
  initilize(xbook) {
    // Register UI component
    xbook.componentService.register("ai-chat-sidebar", AIChatSidebar);
    xbook.componentService.register("AiOutlineRobot", AiOutlineRobot);

    // Sidebar view
    try {
      xbook.layoutService.sidebar.addView({
        id: "ai-assistant",
        viewData: {
          type: "ai-chat-sidebar",
        },
      });
    } catch {
      // ignore duplicate
    }

    // Activity bar icon
    xbook.layoutService.activityBar.addActivity({
      id: "ai-assistant",
      name: "AI Assistant",
      icon: "AiOutlineRobot",
      order: 40,
    });

    xbook.eventBus.on(
      EventKeys.ActivityBar.ActivityClicked("ai-assistant"),
      () => {
        const sidebar = xbook.layoutService.sidebar;
        const active = sidebar.useActiveViewId?.();
        if (active === "ai-assistant") {
          sidebar.hide();
        } else {
          sidebar.show();
          sidebar.setView("ai-assistant");
        }
      }
    );
  },
});
