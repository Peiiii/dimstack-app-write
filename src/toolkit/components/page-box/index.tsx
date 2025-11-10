import { Atom } from "@/toolkit/factories/atom";
import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { createMemoryHistory } from "history";
import { useEffect, useRef, useState } from "react";
import { AiOutlineBackward } from "react-icons/ai";
export type PageBoxConfig = {
  id: string;
  title?: string;
  defaultChildId?: string;
  view?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  children?: PageBoxConfig[];
  links?: {
    description: string;
    path: string;
  }[];
};

const useMemoryHistory = (initialPath) => {
  const initialEntries = [initialPath];
  return useRef<ReturnType<typeof createMemoryHistory>>(
    createMemoryHistory({
      initialEntries,
      initialIndex: 0,
    })
  ).current!;
};
const PageBox = ({
  config,
  onPageChange,
  defaultActivePath,
  atom,
}: {
  config: PageBoxConfig;
  onPageChange?: Function;
  defaultActivePath: string;
  atom?: Atom<{ services: { goTo: (...args: any[]) => any }; events: {} }>;
}) => {
  const {
    // title,
    defaultChildId,
    // id,
    // view,
    // children
  } = config;
  const tree = config;
  const routeHistory = useMemoryHistory(defaultActivePath);
  const [currentPath, setCurrentPath] = useState(defaultActivePath);
  // const [currentChildPath,setCurrentChildPath]=useState("");
  useEffect(() => {
    return routeHistory.listen((e) => {
      setCurrentPath(e.location.pathname);
    });
  }, []);

  useEffect(() => {
    if (atom) {
      const goTo = (path: string) => {
        return routeHistory.push(path);
      };
      return atom.expose("goTo", goTo);
    }
  }, [routeHistory]);
  const searchNodeInTree = (
    tree: PageBoxConfig,
    path: string
  ): PageBoxConfig | undefined => {
    if (path.startsWith("/")) path = path.substring(1);
    if (!path) return tree;

    const currentKey = path.split("/")[0];
    // path.indexOf("/");
    const nextPath = path.substring(currentKey.length);
    let nextTree;
    for (const child of tree.children!) {
      if (child.id === currentKey) {
        nextTree = child;
        break;
      }
    }
    console.assert(nextTree);
    return searchNodeInTree(nextTree, nextPath);
  };
  const currentData = searchNodeInTree(tree, currentPath);
  const currentView = currentData?.view;

  let defaultIndex = 0;
  // let defaultChildView;
  if (defaultChildId) {
    currentData?.children?.forEach((child, index) => {
      if (child.id === defaultChildId) {
        defaultIndex = index;
      }
    });
  }
  const focusPath = (childPath: string) => {
    const child = searchNodeInTree(tree, childPath);
    if (child && !child.view) {
      routeHistory.push(childPath);
    }
  };

  return (
    <Card
      overflow={"hidden"}
      width={currentData?.width}
      height={currentData?.height}
    >
      {routeHistory.index > 0 && (
        <HStack position={"absolute"}>
          <AiOutlineBackward
            onClick={() => {
              routeHistory.back();
            }}
          />
        </HStack>
      )}
      {currentData?.title && (
        <CardHeader>
          <HStack m="0 !important" w="100%" justify={"center"}>
            <Text> {currentData.title}</Text>
          </HStack>
        </CardHeader>
      )}
      <CardBody>
        {currentView || (
          <Tabs
            isFitted
            defaultIndex={defaultIndex}
            onChange={(e) => onPageChange && onPageChange(e)}
          >
            <TabList>
              {currentData?.children?.map(({ title, id }, index) => {
                return (
                  <Tab
                    overflowY="auto"
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      const targetPath = currentPath.endsWith("/")
                        ? currentPath + id
                        : currentPath + "/" + id;
                      focusPath(targetPath);
                    }}
                  >
                    {title}
                  </Tab>
                );
              })}
            </TabList>

            <TabPanels>
              {currentData?.children?.map(({ view, width, height }, index) => (
                <TabPanel w={width} h={height} key={index}>
                  {view}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        )}
      </CardBody>
    </Card>
  );
};

export default PageBox;
