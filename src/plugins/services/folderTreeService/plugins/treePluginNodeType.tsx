import { createTreePlugin } from "@/toolkit/components/tree/treePlugins";
import { Text } from "@chakra-ui/react";
import { FcFolder } from "react-icons/fc";
const getNodeType = (node) => {
  // if (node.id === "root" || !/.+\/.+/.test(node.id)) return "folder";
  if (node.id === "root") return "folder";
  else return "file";
};

type NodeType = "folder" | "file";

const getNodeFileType = (node: any) => {
  if (!node.id) return "folder";
  if (!/.+\/.+/.test(node.id)) "folder";
  else return "file";
};
export const treePluginNodeType = createTreePlugin({
  activate({ viewSystem, eventBus, dataStore }) {
    viewSystem.setDefaultViewStateProvider((node, props) => {
      let expandable;
      if (getNodeType(node) === "folder") expandable = true;
      else expandable = false;
      return {
        id: node.id,
        expanded: false,
        editMode: false,
        expandable,
        ...props,
      };
    });
    viewSystem.renderer.register(
      "icon-node-type",
      ({ node }) => {
        if (getNodeType(node) === "folder") {
          return <FcFolder />;
          // return <Text as="h3">{"#"}</Text>;
        } else {
          if (getNodeFileType(node) === "file")
            // return <FcFile />;
            return (
              <Text as="h3" fontSize={"1.5rem"}>
                {"#"}
              </Text>
            );
          else return <Text as="h3"> </Text>;
        }
      },
      true
    );
    const findPathNodes = (path: string, root) => {
      const nodes: any[] = [];
      const parts = path.split("/");
      let currentNode = root;
      nodes.push(currentNode);
      const prevPath = "";
      const joinPath = (a, b) => {
        return [a, b].filter((x) => x).join("/");
      };
      for (const key of parts) {
        const currentPath = joinPath(prevPath, key);
        if (currentPath === path) {
          break;
        }
        if (!currentNode.children) {
          return undefined;
        }
        for (const node of currentNode.children) {
          if (node.id === currentPath) {
            nodes.push(node);
            currentNode = node;
            break;
          }
        }
      }
      return nodes;
    };
    const focusNode = (node) => {
      console.log("focusNode: ", node);
      if (getNodeType(node) === "file") {
        viewSystem.viewStateStore.getActions().reduce((data) => {
          data = data.map((item) => ({ ...item, highlight: false }));
          const item = data.find((item) => item.id === node.id);
          if (item) {
            item.highlight = true;
          } else {
            data.push({
              ...viewSystem.getDefaultViewState(node),
              highlight: true,
            });
          }
          return data;
        });
        const pathNodes = findPathNodes(node.id, dataStore.getData());
        if (pathNodes) {
          viewSystem.viewStateStore.getActions().reduce((data) => {
            for (const node of pathNodes) {
              const item = data.find((item) => item.id === node.id);
              if (item) {
                item.expanded = true;
              } else {
                data.push({
                  ...viewSystem.getDefaultViewState(node),
                  expanded: true,
                });
              }
              // console.log("pathNodes:", pathNodes, data);
            }
            return data;
          });
        }
      }
    };
    eventBus.on("clickNode", ({ node }) => {
      focusNode(node);
    });
  },
});

export default treePluginNodeType;
