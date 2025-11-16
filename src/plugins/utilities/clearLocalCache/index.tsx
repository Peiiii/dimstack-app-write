import { createPlugin } from "xbook/common/createPlugin";
import { settingService } from "@/services/setting.service";
import { Button } from "@chakra-ui/react";
import { AiOutlineClear } from "react-icons/ai";
import { useTranslation } from "react-i18next";

const clearIndexedDB = async () => {
  if (!window.indexedDB) {
    return;
  }

  try {
    const databases = await indexedDB.databases();
    await Promise.all(
      databases
        .filter((db): db is IDBDatabaseInfo & { name: string } => !!db.name)
        .map((db) => {
          return new Promise<void>((resolve, reject) => {
            const deleteRequest = indexedDB.deleteDatabase(db.name);
            deleteRequest.onsuccess = () => resolve();
            deleteRequest.onerror = () => reject(deleteRequest.error);
            deleteRequest.onblocked = () => {
              console.warn(`删除数据库 ${db.name} 被阻塞，等待连接关闭...`);
            };
          });
        })
    );
  } catch (error) {
    console.error("清空 IndexedDB 失败:", error);
  }
};

export default createPlugin({
  initilize(xbook) {
    settingService.addSettingEntry({
      id: "localCache",
      name: "本地缓存",
      icon: AiOutlineClear,
      widget: () => {
        const { t } = useTranslation();
        return (
          <Button
            onClick={async () => {
              if (
                await xbook.modalService.confirm({
                  title: t("settings.clearCacheTitle"),
                  description: t("settings.clearCacheDescription"),
                })
              ) {
                localStorage.clear();
                await clearIndexedDB();
              }
            }}
          >
            {t("common.clear")}
          </Button>
        );
      },
    });
  },
});
