import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/toolkit/utils/shadcn-utils";
import { useColorMode } from "@chakra-ui/react";
import { Moon, Sun, Trash2, ArrowRight, Languages } from "lucide-react";
import xbook from "xbook/index";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/language-switcher";

// Local helper: clear all IndexedDB databases
const clearIndexedDB = async () => {
  if (!window.indexedDB) return;
  try {
    // Some TS lib versions may not declare indexedDB.databases()
    const databases: (IDBDatabaseInfo & { name?: string })[] = await indexedDB.databases();
    await Promise.all(
      databases
        .filter((db) => !!db.name)
        .map((db) => {
          return new Promise<void>((resolve, reject) => {
            const deleteRequest = indexedDB.deleteDatabase(db.name!);
            deleteRequest.onsuccess = () => resolve();
            deleteRequest.onerror = () => reject(deleteRequest.error);
            deleteRequest.onblocked = () => {
              // best-effort
              console.warn(`Delete DB blocked: ${db.name}`);
            };
          });
        })
    );
  } catch (error) {
    console.error("Failed to clear IndexedDB:", error);
  }
};

export default function QuickSettingsMenu() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation();
  const syncTailwindDark = (nextMode: "light" | "dark") => {
    const root = document.documentElement;
    if (nextMode === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  };
  const nextTheme = colorMode === "light" ? t("settings.switchToDarkMode") : t("settings.switchToLightMode");

  return (
    <div className="py-1">
      <DropdownMenuLabel className="px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
        {t("settings.quickSettings")}
      </DropdownMenuLabel>
      <DropdownMenuSeparator className="my-1" />

      {/* Theme Toggle */}
      <DropdownMenuItem
        className={cn("px-2.5 py-2 group focus:bg-accent/50 select-none")}
        onSelect={(e) => e.preventDefault()}
      >
        <div className="flex items-center gap-3 w-full">
          <div className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center group-hover:bg-muted/60 transition-colors">
            {colorMode === "light" ? (
              <Sun className="h-3.5 w-3.5" />
            ) : (
              <Moon className="h-3.5 w-3.5" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium leading-tight">{t("settings.theme")}</div>
            <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
              {nextTheme}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            title={nextTheme}
            aria-label={nextTheme}
            className="h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const nextMode = colorMode === "light" ? "dark" : "light";
              toggleColorMode();
              syncTailwindDark(nextMode);
            }}
          >
            {colorMode === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
        </div>
      </DropdownMenuItem>

      {/* Language Switcher */}
      <DropdownMenuItem
        className={cn("px-2.5 py-2 group focus:bg-accent/50 select-none")}
        onSelect={(e) => e.preventDefault()}
      >
        <div className="flex items-center gap-3 w-full">
          <div className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center group-hover:bg-muted/60 transition-colors">
            <Languages className="h-3.5 w-3.5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium leading-tight">{t("settings.language")}</div>
            <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
              {t("settings.switchLanguage")}
            </div>
          </div>
          <LanguageSwitcher />
        </div>
      </DropdownMenuItem>

      {/* Clear Local Cache */}
      <DropdownMenuItem
        className={cn("px-2.5 py-2 group focus:bg-accent/50 select-none")}
        onSelect={(e) => e.preventDefault()}
      >
        <div className="flex items-center gap-3 w-full">
          <div className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center group-hover:bg-muted/60 transition-colors">
            <Trash2 className="h-3.5 w-3.5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium leading-tight">{t("settings.localCache")}</div>
            <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
              {t("settings.clearLocalCache")}
            </div>
          </div>
          <div
            className="flex items-center gap-1 text-xs text-muted-foreground shrink-0 cursor-pointer"
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              const confirmed = await xbook.modalService.confirm({
                title: t("settings.clearCacheTitle"),
                description: t("settings.clearCacheDescription"),
              });
              if (confirmed) {
                try {
                  localStorage.clear();
                  await clearIndexedDB();
                  xbook.notificationService.success(t("settings.cacheCleared"));
                } catch (err) {
                  console.error(err);
                  xbook.notificationService.error(t("settings.clearCacheFailed"));
                }
              }
            }}
          >
            <span>{t("common.clear")}</span>
            <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </DropdownMenuItem>
    </div>
  );
}
