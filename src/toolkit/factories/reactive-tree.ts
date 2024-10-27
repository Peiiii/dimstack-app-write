import { BehaviorSubject, defer, finalize, Observable, Subject } from "rxjs";
import { shareReplay } from "rxjs/operators";

export type ITreeNode<T> = {
  id: string;
  data: T;
};

export type ITreeNodeWithChildren<T> = ITreeNode<T> & {
  children?: ITreeNodeWithChildren<T>[];
};

interface IReactiveTree<T> {
  getNode(id: string): ITreeNode<T> | undefined;
  getParentNode(id: string): ITreeNode<T> | undefined;
  getChildrenIds(id: string): string[];
  getSubTree(id: string): ITreeNodeWithChildren<T> | undefined;
  /** @deprecated use getNode$ instead */
  observeNode(
    id: string,
    callback: (node: ITreeNode<T> | undefined) => void
  ): () => void;
  /** @deprecated use getChildrenIds$ instead */
  observeChildrenIds(id: string, callback: (ids: string[]) => void): () => void;
  getNodeObservable(id: string): Observable<ITreeNode<T> | undefined>;
  getChildrenIdsObservable(id: string): Observable<string[]>;
  updateNode(node: ITreeNode<T>): boolean;
  addNode(parentId: string, ...nodes: ITreeNode<T>[]): void;
  removeNode(id: string): void;
  initSubTree(
    parentId: string | undefined,
    tree: ITreeNodeWithChildren<T>,
    options?: {
      overwrite?: boolean;
    }
  ): void;
}

export class ReactiveTree<T> implements IReactiveTree<T> {
  private nodeMap = new Map<string, ITreeNode<T>>();
  private child2Parent: Record<string, string | undefined> = {};
  private parent2Children: Record<string, string[] | undefined> = {};
  private nodeSubjects = new Map<string, Subject<ITreeNode<T> | undefined>>();
  private childrenSubjects = new Map<string, Subject<string[]>>();

  constructor(tree: ITreeNodeWithChildren<T>) {
    this.initSubTree(undefined, tree);
  }

  initSubTree = (
    parentId: string | undefined,
    tree: ITreeNodeWithChildren<T>,
    options?: {
      overwrite?: boolean;
    }
  ) => {
    const { overwrite } = options || {};
    if (!overwrite && this.nodeMap.has(tree.id)) {
      throw new Error(`Node ${tree.id} already exists`);
    }
    this.nodeMap.set(tree.id, {
      id: tree.id,
      data: tree.data,
    });
    if (parentId) {
      this.child2Parent[tree.id] = parentId;
      this.parent2Children[parentId] = [
        ...(this.parent2Children[parentId] || []),
        tree.id,
      ];
    }
    if (tree.children) {
      tree.children.forEach((child) => this.initSubTree(tree.id, child));
    }
  };

  getNode = (id: string) => this.nodeMap.get(id);
  getParentNode = (id: string) => {
    const parentId = this.child2Parent[id];
    return parentId ? this.getNode(parentId) : undefined;
  };
  getChildrenIds = (id: string) => this.parent2Children[id] || [];
  getSubTree = (id: string): ITreeNodeWithChildren<T> | undefined => {
    const node = this.getNode(id);
    if (!node) return undefined;
    const childrenIds = this.getChildrenIds(id);
    const children = childrenIds.map((childId) => this.getSubTree(childId)!);
    return { ...node, children };
  };

  private createObservableOfSubject = <T>(options: {
    topic: string;
    getSubject: (topic: string) => Subject<T> | undefined;
    setSubject: (topic: string, subject: Subject<T>) => void;
    removeSubject: (topic: string) => void;
    emitCurrentValueOnSubscribe?: boolean;
    getCurrentValue?: () => T;
  }): Observable<T> => {
    const {
      topic,
      getSubject,
      setSubject,
      removeSubject,
      emitCurrentValueOnSubscribe,
      getCurrentValue,
    } = options;

    return defer(() => {
      let subject = getSubject(topic);
      if (!subject) {
        if (emitCurrentValueOnSubscribe && getCurrentValue) {
          subject = new BehaviorSubject<T>(getCurrentValue());
        } else {
          subject = new Subject<T>();
        }
        setSubject(topic, subject);
      }
      return subject.asObservable();
    }).pipe(
      shareReplay({
        bufferSize: 1,
        refCount: true,
      }),
      finalize(() => {
        const subject = getSubject(topic);
        if (subject && !subject.observed) {
          removeSubject(topic);
        }
      })
    );
  };

  getNodeObservable(
    id: string,
    options?: {
      emitCurrentValueOnSubscribe?: boolean;
    }
  ): Observable<ITreeNode<T> | undefined> {
    return this.createObservableOfSubject({
      topic: id,
      getSubject: (topic) => this.nodeSubjects.get(topic),
      setSubject: (topic, subject) => this.nodeSubjects.set(topic, subject),
      removeSubject: (topic) => this.nodeSubjects.delete(topic),
      emitCurrentValueOnSubscribe: options?.emitCurrentValueOnSubscribe,
      getCurrentValue: () => this.getNode(id),
    });
  }

  getChildrenIdsObservable(
    id: string,
    options?: {
      emitCurrentValueOnSubscribe?: boolean;
    }
  ): Observable<string[]> {
    return this.createObservableOfSubject({
      topic: id,
      getSubject: (topic) => this.childrenSubjects.get(topic),
      setSubject: (topic, subject) => this.childrenSubjects.set(topic, subject),
      removeSubject: (topic) => this.childrenSubjects.delete(topic),
      emitCurrentValueOnSubscribe: options?.emitCurrentValueOnSubscribe,
      getCurrentValue: () => this.getChildrenIds(id),
    });
  }

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

  addNode = (parentId: string, ...nodes: ITreeNode<T>[]) => {
    const parentNode = this.getNode(parentId);
    if (!parentNode) return;
    nodes.forEach((node) => {
      this.nodeMap.set(node.id, node);
      this.child2Parent[node.id] = parentId;
    });

    this.parent2Children[parentId] = [
      ...(this.parent2Children[parentId] || []),
      ...nodes.map((node) => node.id),
    ];
    nodes.forEach((node) => {
      this.nodeSubjects.get(node.id)?.next(node);
    });
    this.childrenSubjects.get(parentId)?.next(this.getChildrenIds(parentId));
  };

  sortChildren = (id: string, compareFn: (a: string, b: string) => number) => {
    const childrenIds = this.getChildrenIds(id);
    const sortedChildren = childrenIds.sort(compareFn);
    this.parent2Children[id] = sortedChildren;
    this.childrenSubjects.get(id)?.next(sortedChildren);
  };

  sortSubTree = (id: string, compareFn: (a: string, b: string) => number) => {
    this.sortChildren(id, compareFn);
    this.getChildrenIds(id).forEach((childId) =>
      this.sortSubTree(childId, compareFn)
    );
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
