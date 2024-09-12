import { WidgetContext } from "@/toolkit/components/tree";
import { TreeDataNode } from "@/toolkit/factories/treeDataStore";

export const getBaseTreeServiceClass = (
  context: WidgetContext<TreeDataNode<any>>
) => {
  const {
    viewSystem,
    dataStore,
    options: { defaultExpanded = false },
  } = context;
  return class BaseTreeService {
    toggleNode = ({ id, event }: { id: string; event?: any }) => {
      if (event) {
        event.stopPropagation();
        event.preventDefault();
      }
      const node = dataStore.getNode(id);
      const viewState =
        viewSystem.viewStateStore.getRecord(id) ||
        viewSystem.getDefaultViewState(node, {
          expanded: defaultExpanded,
        });
      viewSystem.viewStateStore
        .getActions()
        .upsert({ ...viewState, expanded: !viewState.expanded });
    };

    expandNode = ({ id, event }: { id: string; event?: any }) => {
      if (event) {
        event.stopPropagation();
        event.preventDefault();
      }
      const node = dataStore.getNode(id);
      const viewState =
        viewSystem.viewStateStore.getRecord(id) ||
        viewSystem.getDefaultViewState(node, {
          expanded: defaultExpanded,
        });
      viewSystem.viewStateStore
        .getActions()
        .upsert({ ...viewState, expanded: true });
    };

    async moveNode(node: TreeDataNode<any>, targetNode: TreeDataNode<any>) {
      throw new Error("not implemented");
    }
  };
};

export type IBaseTreeService = InstanceType<
  ReturnType<typeof getBaseTreeServiceClass>
>;
