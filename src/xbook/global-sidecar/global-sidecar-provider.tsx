import { useCallback, useEffect, useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/toolkit/utils/shadcn-utils";
import {
  getRegisteredGlobalSidecarPanes,
  subscribeGlobalSidecarPanes,
  type GlobalSidecarPaneDefinition,
} from "./sidecar-pane-registry";
import { GlobalSidecarContext } from "./global-sidecar-context";

const PANEL_WIDTH = 400;
export const GlobalSidecarProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [panes, setPanes] = useState<Map<string, GlobalSidecarPaneDefinition>>(
    () => getRegisteredGlobalSidecarPanes()
  );
  const [open, setOpen] = useState(false);
  const [activePaneId, setActivePaneId] = useState<string | undefined>(undefined);
  const [activePaneProps, setActivePaneProps] = useState<Record<string, unknown>>({});

  useEffect(() => {
    return subscribeGlobalSidecarPanes((next) => {
      setPanes(next);
      if (next.size === 0) {
        setActivePaneId(undefined);
        setOpen(false);
      } else if (activePaneId && !next.has(activePaneId)) {
        const first = next.values().next().value;
        setActivePaneId(first?.id);
      }
    });
  }, [activePaneId]);

  const openPane = useCallback(
    (id: string, props?: Record<string, unknown>) => {
      if (!panes.has(id)) return;
      setActivePaneId(id);
      setActivePaneProps(props || {});
      setOpen(true);
    },
    [panes]
  );

  const togglePane = useCallback(
    (id: string) => {
      if (!panes.has(id)) return;
      if (open && activePaneId === id) {
        setOpen(false);
      } else {
        setActivePaneId(id);
        setOpen(true);
      }
    },
    [activePaneId, open, panes]
  );

  const closePane = useCallback(() => {
    setOpen(false);
  }, []);

  const ctxValue = useMemo(
    () => ({
      open,
      activePaneId,
      openPane,
      togglePane,
      closePane,
    }),
    [open, activePaneId, openPane, togglePane, closePane]
  );

  const paneList = useMemo(() => [...panes.values()], [panes]);
  const orderedPanes = useMemo(
    () =>
      [...paneList].sort((a, b) => {
        const ao = a.order ?? 0;
        const bo = b.order ?? 0;
        return ao - bo;
      }),
    [paneList]
  );
  const activePane = orderedPanes.find((pane) => pane.id === activePaneId);
  const ActiveComponent = activePane?.component;

  return (
    <GlobalSidecarContext.Provider value={ctxValue}>
      <div className="flex h-full w-full overflow-hidden">
        <div className="flex-1 min-w-0">{children}</div>
        {orderedPanes.length > 0 && (
          <div
            className="flex h-full bg-background/95 backdrop-blur-sm relative z-50"
            style={
              {
                "--global-ai-sidebar-width": `${PANEL_WIDTH}px`,
              } as CSSProperties
            }
          >
            <div
              className={cn(
                "transition-[width] duration-300 ease-in-out overflow-hidden flex flex-col bg-background border-l border-border/40",
                open && activePane ? "w-[--global-ai-sidebar-width]" : "w-0"
              )}
            >
              {open && activePane && ActiveComponent ? (
                <>
                  <div className="flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-md sticky top-0 z-10 border-b border-border/40">
                    <div className="flex items-center gap-2.5">
                      {activePane.icon && (
                        <div className="w-5 h-5">
                          <activePane.icon className="w-full h-full" />
                        </div>
                      )}
                      <p className="text-sm font-medium text-foreground/90 tracking-tight">
                        {activePane.title}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={closePane} 
                      className="h-6 w-6 rounded-full hover:bg-muted/50 text-muted-foreground transition-colors"
                    >
                      ×
                    </Button>
                  </div>
                  <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
                    <ActiveComponent
                      {...activePaneProps}
                      closePane={closePane}
                    />
                  </div>
                </>
              ) : null}
            </div>
            <div className="w-[52px] flex flex-col items-center py-6 gap-4 border-l border-border/40 bg-background/50 backdrop-blur-sm">
              {orderedPanes.map((pane) => {
                const Icon = pane.icon ?? MessageCircle;
                const active = pane.id === activePaneId && open;
                return (
                  <button
                    key={pane.id}
                    onClick={() => {
                      if (active) {
                        closePane();
                      } else {
                        openPane(pane.id);
                      }
                    }}
                    className={cn(
                      "group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 ease-out",
                      active
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    )}
                    title={pane.title}
                  >
                    <Icon className={cn("h-5 w-5 transition-transform duration-200", active ? "scale-100" : "group-hover:scale-110")} />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </GlobalSidecarContext.Provider>
  );
};
