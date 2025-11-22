# Global Sidecar Protocol

The **Global Sidecar** is the right-hand workspace dock (rail + panel) used for any cross-cutting utilities (AI assistants, inspectors, agents, etc.). This document describes how to integrate with it.

## Layout
- Fixed-width panel (~400px) that hosts the active pane.
- Vertical activity rail (right side) listing all registered panes as icon buttons.
- Container handles headers, scrolling, and close actions. Pane components should render body content only.

## Registering a Pane
Use the registry helpers in `src/features/global-sidecar/core/sidecar-pane-registry.ts` (re-exported via the feature index):

```ts
import { registerGlobalSidecarPane } from "@/features/global-sidecar";
import { MyPane } from "./MyPane";
import { MyIcon } from "lucide-react";

registerGlobalSidecarPane({
  id: "my-pane",                 // unique id
  title: "My Inspector",         // shown in the header
  description: "Inspect session",// optional subtitle
  order: 10,                      // smaller value -> higher position in rail
  icon: MyIcon,                   // React component for the rail button
  component: MyPane,              // React component rendered in the panel
});
```

Guidelines:
- Components receive props passed when opening the pane (see below). Avoid storing shared state inside the pane; coordinate via context/stores if needed.
- Panels must degrade gracefully when props are absent (e.g., show “open the workspace to use this tool”).

## Opening / Toggling a Pane
Anywhere in the app you can interact with the sidecar via the hook:

```ts
import { useGlobalSidecar } from "@/features/global-sidecar";

const { openPane, togglePane, closePane } = useGlobalSidecar();

openPane("my-pane", { contextId });        // opens pane with props
togglePane("my-pane");                     // toggles visibility
closePane();                                // closes current pane
```

- `openPane(id, props?)` activates the pane and forwards `props` to the component.
- `togglePane(id)` toggles a specific pane.
- `closePane()` hides whichever pane is currently active.

## Responsibilities & Naming
- The framework refers to this system as the **Global Sidecar**. Use this term in code/comments to keep terminology consistent.
- The sidecar is not AI-specific; any global workspace tool should integrate via the same protocol.
- Keep IDs stable and names descriptive so telemetry/logs can reference panes unambiguously.

Following this protocol ensures every right-side tool behaves consistently and avoids bespoke implementations.
