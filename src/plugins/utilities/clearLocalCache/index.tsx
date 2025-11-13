import { createPlugin } from "xbook/common/createPlugin";
import { settingService } from "@/services/setting.service";
import { Button } from "@chakra-ui/react";
import { AiOutlineClear } from "react-icons/ai";

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
        return (
          <Button
            onClick={async () => {
              if (
                await xbook.modalService.confirm({
                  title: "清空本地缓存",
                  description: "是否确定清空本地缓存？",
                })
              ) {
                localStorage.clear();
                await clearIndexedDB();
              }
            }}
          >
            清空
          </Button>
        );
      },
    });
  },
});
