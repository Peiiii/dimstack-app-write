import { Subject } from "rxjs";

export type ITreeNode<T> = {
  id: string;
  data: T;
};

export type ITreeNodeWithChildren<T> = ITreeNode<T> & {
  children?: ITreeNodeWithChildren<T>[];
};

export interface IReactiveTree<T> {
  getNode(id: string): ITreeNode<T> | undefined;
  getParentNode(id: string): ITreeNode<T> | undefined;
  getChildrenIds(id: string): string[];
  getSubTree(id: string): ITreeNodeWithChildren<T> | undefined;
  observeNode(
    id: string,
    callback: (node: ITreeNode<T> | undefined) => void
  ): () => void;
  observeChildrenIds(id: string, callback: (ids: string[]) => void): () => void;
  updateNode(node: ITreeNode<T>): boolean;
  addNode(parentId: string, node: ITreeNode<T>): void;
  removeNode(id: string): void;
}

export class ReactiveTree<T> implements IReactiveTree<T> {
  private nodeMap = new Map<string, ITreeNode<T>>();
  private child2Parent: Record<string, string | undefined> = {};
  private parent2Children: Record<string, string[] | undefined> = {};
  private nodeSubjects = new Map<string, Subject<ITreeNode<T> | undefined>>();
  private childrenSubjects = new Map<string, Subject<string[]>>();

  constructor(tree: ITreeNodeWithChildren<T>) {
    this.initTree(tree);
  }

  private initTree = (tree: ITreeNodeWithChildren<T>, parentId?: string) => {
    this.nodeMap.set(tree.id, {
      id: tree.id,
      data: tree.data,
    });
    if (parentId) {
      this.child2Parent[tree.id] = parentId;
    }
    if (tree.children) {
      this.parent2Children[tree.id] = tree.children.map((child) => child.id);
      tree.children.forEach((child) => this.initTree(child, tree.id));
    }
  };

  getNode = (id: string) => this.nodeMap.get(id);
  getParentNode = (id: string) => {
    const parentId = this.child2Parent[id];
    return parentId ? this.getNode(parentId) : undefined;
  };
  getChildrenIds = (id: string) => this.parent2Children[id] || [];
  getSubTree = (id: string) => {
    const node = this.getNode(id);
    if (!node) return undefined;
    const childrenIds = this.getChildrenIds(id);
    const children = childrenIds.map((childId) => this.getSubTree(childId));
    return { ...node, children };
  };

  observeNode = (
    id: string,
    callback: (node: ITreeNode<T> | undefined) => void,
    options?: {
      fireImmediately?: boolean;
    }
  ): (() => void) => {
    if (!this.nodeSubjects.has(id)) {
      this.nodeSubjects.set(id, new Subject<ITreeNode<T> | undefined>());
    }
    const subject = this.nodeSubjects.get(id)!;
    const subscription = subject.subscribe(callback);
    if (options?.fireImmediately) {
      callback(this.getNode(id));
    }
    return () => {
      subscription.unsubscribe();
      if (!subject.observed) {
        this.nodeSubjects.delete(id);
      }
    };
  };

  observeChildrenIds = (
    id: string,
    callback: (ids: string[]) => void,
    options?: {
      fireImmediately?: boolean;
    }
  ): (() => void) => {
    if (!this.childrenSubjects.has(id)) {
      this.childrenSubjects.set(id, new Subject<string[]>());
    }
    const subject = this.childrenSubjects.get(id)!;
    const subscription = subject.subscribe(callback);
    if (options?.fireImmediately) {
      callback(this.getChildrenIds(id));
    }
    return () => {
      subscription.unsubscribe();
      if (!subject.observed) {
        this.childrenSubjects.delete(id);
      }
    };
  };

  updateNode = (node: ITreeNode<T>) => {
    this.nodeMap.set(node.id, node);
    this.nodeSubjects.get(node.id)?.next(node);
    return true;
  };

  addNode = (parentId: string, node: ITreeNode<T>) => {
    const parentNode = this.getNode(parentId);
    if (!parentNode) return;
    this.nodeMap.set(node.id, node);
    this.child2Parent[node.id] = parentId;
    this.parent2Children[parentId] = [
      ...(this.parent2Children[parentId] || []),
      node.id,
    ];
    this.nodeSubjects.get(parentId)?.next(parentNode);
    this.childrenSubjects.get(parentId)?.next(this.getChildrenIds(parentId));
  };

  removeNode = (id: string) => {
    const node = this.getNode(id);
    if (!node) return;
    const parentId = this.child2Parent[id];
    if (parentId) {
      this.parent2Children[parentId] = this.parent2Children[parentId]?.filter(
        (childId) => childId !== id
      );
    }
    this.nodeMap.delete(id);
    delete this.child2Parent[id];
    delete this.parent2Children[id];
    this.nodeSubjects.get(id)?.next(undefined); // fire last value
    this.nodeSubjects.get(id)?.complete(); // complete the subject
    this.nodeSubjects.delete(id);
    this.childrenSubjects.get(id)?.next([]); // fire last value
    this.childrenSubjects.get(id)?.complete(); // complete the subject
    this.childrenSubjects.delete(id);
  };
}
