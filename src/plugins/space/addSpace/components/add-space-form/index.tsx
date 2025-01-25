import { spacePlatformRegistry } from "@/services/space-platform.registry";
import PowerForm from "@/toolkit/components/power-form";

export const AddSpaceForm = () => {
  const platforms = spacePlatformRegistry.getPlatforms();
  
  return (
    <PowerForm
      fields={[
        {
          name: "platform",
          title: "平台",
          select: {
            options: platforms.map(p => ({
              value: p.id,
              label: p.name
            }))
          }
        }
        // ...
      ]}
    />
  );
}; 