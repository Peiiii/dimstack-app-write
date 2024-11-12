import { createCustomReactBean } from "rx-bean";
import { createCRUDActions } from "xbook/utils/create-actions";

export type ReactEntry = {
  id: string;
  reactNode: React.ReactNode;
};

export class WorkbenchService {
  private ReactEntries = createCustomReactBean(
    "ReactEntries",
    [] as ReactEntry[],
    (bean) => {
      const { getReactEntries, setReactEntries } = bean;
      const {
        add: addReactEntry,
        delete: deleteReactEntry,
        update: updateReactEntry,
      } = createCRUDActions(setReactEntries, getReactEntries, "id");
      return {
        addReactEntry,
        deleteReactEntry,
        updateReactEntry,
      };
    }
  );

  addReactEntry = (entry: ReactEntry) => {
    return this.ReactEntries.addReactEntry(entry);
  };

  useReactEntries = () => {
    return this.ReactEntries.useReactEntries();
  };
}

export const workbenchService = new WorkbenchService();