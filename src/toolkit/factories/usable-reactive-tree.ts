import {
  ITreeNode,
  ReactiveTree,
} from "@/toolkit/factories/reactive-tree";
import { useStateFromObservable } from "rx-nested-bean";

export interface IUsableReactiveTree<T> extends ReactiveTree<T> {
  useNode(id: string): ITreeNode<T> | undefined;
  useChildrenIds(id: string): string[];
}

export class UsableReactiveTree<T>
  extends ReactiveTree<T>
  implements IUsableReactiveTree<T>
{
  useNode = (id: string) => {
    return useStateFromObservable(this.getNodeObservable(id), this.getNode(id));
  };

  useChildrenIds = (id: string) => {
    return useStateFromObservable(
      this.getChildrenIdsObservable(id),
      this.getChildrenIds(id)
    );
  };
}
