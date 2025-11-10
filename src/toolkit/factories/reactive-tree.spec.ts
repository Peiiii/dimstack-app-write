import { ReactiveTree } from './reactive-tree';

describe('ReactiveTree', () => {
  let tree: ReactiveTree<string>;

  beforeEach(() => {
    tree = new ReactiveTree({
      id: 'root',
      data: 'Root Node',
      children: [
        { id: 'child1', data: 'Child 1' },
        { id: 'child2', data: 'Child 2' },
      ],
    });
  });

  describe('Basic Operations', () => {
    it('should initialize the tree correctly', () => {
      expect(tree.getNode('root')).toEqual({ id: 'root', data: 'Root Node' });
      expect(tree.getNode('child1')).toEqual({ id: 'child1', data: 'Child 1' });
      expect(tree.getNode('child2')).toEqual({ id: 'child2', data: 'Child 2' });
    });

    it('should get parent node', () => {
      expect(tree.getParentNode('child1')).toEqual({ id: 'root', data: 'Root Node' });
      expect(tree.getParentNode('root')).toBeUndefined();
    });

    it('should get children ids', () => {
      expect(tree.getChildrenIds('root')).toEqual(['child1', 'child2']);
      expect(tree.getChildrenIds('child1')).toEqual([]);
    });

    it('should get subtree', () => {
      const subtree = tree.getSubTree('root');
      expect(subtree).toEqual({
        id: 'root',
        data: 'Root Node',
        children: [
          { id: 'child1', data: 'Child 1', children: [] },
          { id: 'child2', data: 'Child 2', children: [] },
        ],
      });
    });
  });

  describe('Node Observation', () => {
    it('should observe node changes', (done) => {
      const unsubscribe = tree.observeNode('root', (node) => {
        expect(node).toEqual({ id: 'root', data: 'Updated Root' });
        unsubscribe();
        done();
      });

      tree.updateNode({ id: 'root', data: 'Updated Root' });
    });

    it('should observe children ids changes', (done) => {
      const unsubscribe = tree.observeChildrenIds('root', (ids) => {
        expect(ids).toEqual(['child1', 'child2', 'child3']);
        unsubscribe();
        done();
      });

      tree.addNode('root', { id: 'child3', data: 'Child 3' });
    });
  });

  describe('Node Operations', () => {
    it('should update node', () => {
      const updated = tree.updateNode({ id: 'child1', data: 'Updated Child 1' });
      expect(updated).toBe(true);
      expect(tree.getNode('child1')).toEqual({ id: 'child1', data: 'Updated Child 1' });
    });

    it('should add node', () => {
      tree.addNode('root', { id: 'child3', data: 'Child 3' });
      expect(tree.getNode('child3')).toEqual({ id: 'child3', data: 'Child 3' });
      expect(tree.getChildrenIds('root')).toContain('child3');
    });

    it('should remove node', () => {
      tree.removeNode('child1');
      expect(tree.getNode('child1')).toBeUndefined();
      expect(tree.getChildrenIds('root')).not.toContain('child1');
    });
  });

  describe('Reactive Streams', () => {
    it('should create observable for node', (done) => {
      const nodeObservable = tree.getNodeObservable('root');
      const subscription = nodeObservable.subscribe((node) => {
        expect(node).toEqual({ id: 'root', data: 'Updated Root' });
        subscription.unsubscribe();
        done();
      });

      tree.updateNode({ id: 'root', data: 'Updated Root' });
    });

    it('should create observable for children ids', (done) => {
      const childrenObservable = tree.getChildrenIdsObservable('root');
      const subscription = childrenObservable.subscribe((ids) => {
        expect(ids).toEqual(['child1', 'child2', 'child3']);
        subscription.unsubscribe();
        done();
      });

      tree.addNode('root', { id: 'child3', data: 'Child 3' });
    });
  });

  describe('Edge Cases', () => {
    it('should handle non-existent nodes gracefully', () => {
      expect(tree.getNode('nonexistent')).toBeUndefined();
      expect(tree.getParentNode('nonexistent')).toBeUndefined();
      expect(tree.getChildrenIds('nonexistent')).toEqual([]);
      expect(tree.getSubTree('nonexistent')).toBeUndefined();
    });

    it('should handle removing root node', () => {
      tree.removeNode('root');
      expect(tree.getNode('root')).toBeUndefined();
      expect(tree.getChildrenIds('root')).toEqual([]);
    });

    it('should handle adding node to non-existent parent', () => {
      tree.addNode('nonexistent', { id: 'orphan', data: 'Orphan Node' });
      expect(tree.getNode('orphan')).toBeUndefined();
    });
  });
});

