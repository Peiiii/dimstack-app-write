import { Icon } from "@chakra-ui/react";
import store from "./store";

export const SettingsPage = () => {
  const settingEntries = store.useData();
  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex flex-col divide-y divide-border">
        {settingEntries.map((entry) => {
          const {
            id,
            name,
            description,
            icon,
            widget: Widget,
          } = entry;

          return (
            <div key={id} className="flex items-start py-4 first:pt-0 last:pb-0">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  {icon && (
                    <Icon as={icon as any} className="h-5 w-5 text-muted-foreground shrink-0" />
                  )}
                  <p className="text-sm font-medium">{name}</p>
                </div>
                {description && (
                  <p className="text-sm text-muted-foreground mt-1.5 ml-7">
                    {description}
                  </p>
                )}
              </div>
              {Widget && (
                <div className="flex-shrink-0 ml-6">
                  <Widget />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}; 