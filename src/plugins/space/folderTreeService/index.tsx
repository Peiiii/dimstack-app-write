import { spaceHelper } from "@/helpers/space.helper";
import { createPlugin } from "xbook/common/createPlugin";
import { Action } from "@/toolkit/types";
import { SpaceDef } from "@/toolkit/types/space";
import {
  Avatar,
  Badge,
  Box,
  Card,
  HStack,
  Heading,
  Highlight,
  Icon,
  Link,
  Stat,
  Text,
} from "@chakra-ui/react";
import {
  AiFillFolder,
  AiOutlineDelete,
  AiOutlineFolder,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { HiOutlineExternalLink } from "react-icons/hi";
import TreeView from "./treeView";
// const SVG=()=><svg t="1683800474080" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6827" width="200" height="200"><path d="M102.256 993.178a8.218 8.218 0 0 1-6.568-3.274L1.66 865.27a8.232 8.232 0 0 1-1.66-4.954V454.378c0-39.504 32.142-71.642 71.646-71.642h210.362a8.23 8.23 0 0 1 8.228 8.228v54.034c0 30.46 24.756 55.24 55.188 55.24h396.558a8.23 8.23 0 0 1 8.228 8.228V796.9c0 39.504-32.142 71.642-71.646 71.642H110.484v116.406a8.23 8.23 0 0 1-8.228 8.23z m-85.8-135.62l77.57 102.822v-100.064a8.23 8.23 0 0 1 8.228-8.228h576.31c30.434 0 55.188-24.756 55.188-55.186V516.694H345.424c-39.504 0-71.646-32.164-71.646-71.698v-45.806H71.646c-30.434 0-55.188 24.756-55.188 55.186v403.182z" fill="#4A555F" p-id="6828"></path><path d="M345.424 535.894c-50.086 0-90.842-40.76-90.842-90.898v-26.606H71.634c-19.858 0-35.986 16.128-35.986 35.986v396.778l39.168 51.894v-70.162h603.75c19.858 0 35.986-16.128 35.986-35.986V535.894H345.424z m237.088 252.998c-40.046 0-72.464-32.42-72.464-72.41 0-40.046 32.42-72.464 72.464-72.464 39.99 0 72.41 32.42 72.41 72.464 0 39.99-32.418 72.41-72.41 72.41z" fill="#DFDFDF" p-id="6829"></path><path d="M921.76 641.27a8.224 8.224 0 0 1-8.228-8.228v-116.374H345.424c-39.508 0-71.65-32.142-71.65-71.648V102.47c0-39.508 32.142-71.648 71.65-71.648h606.93c39.504 0 71.646 32.142 71.646 71.648V508.44a8.24 8.24 0 0 1-1.66 4.956l-94.012 124.602a8.22 8.22 0 0 1-6.568 3.272zM345.424 47.28c-30.434 0-55.194 24.76-55.194 55.192V445.02c0 30.432 24.76 55.192 55.194 55.192H921.76a8.23 8.23 0 0 1 8.228 8.228v100.036l77.554-102.792V102.47c0-30.432-24.756-55.192-55.188-55.192H345.424z" fill="#4A555F" p-id="6830"></path><path d="M952.354 66.488H345.424c-19.858 0-35.986 16.124-35.986 35.984v342.524c0 19.858 16.128 36.042 35.986 36.042h603.75v70.106l39.168-51.894V102.474c-0.002-19.86-16.128-35.986-35.988-35.986z m-490.306 195.178c-40.046 0-72.466-32.42-72.466-72.466 0-39.99 32.42-72.41 72.466-72.41 39.99 0 72.41 32.42 72.41 72.41 0 40.046-32.42 72.466-72.41 72.466z" fill="#DFDFDF" p-id="6831"></path><path d="M433.342 154.054a28.716 28.696 90 1 0 57.392 0 28.716 28.696 90 1 0-57.392 0Z" fill="#71CCE0" p-id="6832"></path><path d="M514.216 222.828v16.566c-13.112 13.77-31.652 22.272-52.168 22.272a71.994 71.994 0 0 1-52.224-22.272v-16.566c0-15.69 9.16-30.5 24.192-36.754a42.98 42.98 0 0 1 16.622-3.292h22.82c5.87 0 11.466 1.152 16.566 3.292 15.086 6.254 24.192 21.064 24.192 36.754z" fill="#71CCE0" p-id="6833"></path><path d="M462.038 191c-20.356 0-36.92-16.574-36.92-36.946 0-20.37 16.564-36.944 36.92-36.944 20.362 0 36.926 16.574 36.926 36.944 0 20.372-16.564 36.946-36.926 36.946z m0-57.432c-11.282 0-20.464 9.19-20.464 20.486 0 11.296 9.182 20.488 20.464 20.488 11.288 0 20.47-9.192 20.47-20.488-0.002-11.296-9.184-20.486-20.47-20.486z" fill="#4A555F" p-id="6834"></path><path d="M462.048 269.894c-22.216 0-42.872-8.812-58.168-24.812a8.212 8.212 0 0 1-2.282-5.686v-16.566c0-19.546 11.486-36.956 29.256-44.35 6.204-2.6 12.868-3.924 19.784-3.924h22.822c6.884 0 13.526 1.324 19.746 3.934 17.748 7.356 29.238 24.766 29.238 44.34v16.566a8.226 8.226 0 0 1-2.272 5.674c-15.24 16.008-35.882 24.824-58.124 24.824z m-43.992-33.912c11.898 11.28 27.396 17.456 43.992 17.456 16.612 0 32.088-6.172 43.938-17.446v-13.162c0-12.896-7.506-24.338-19.114-29.152a34.412 34.412 0 0 0-13.414-2.666h-22.822c-4.72 0-9.246 0.892-13.44 2.652-11.636 4.842-19.14 16.286-19.14 29.166v13.152zM587.982 133.932h321.072v16.456H587.982zM587.982 222.942h321.072v16.456H587.982zM387.386 311.952h521.666v16.456H387.386zM387.386 400.96h521.666v16.456H387.386zM115.728 750.418H436.8v16.456H115.728zM115.728 661.408H436.8v16.456H115.728zM115.728 572.4h521.662v16.456H115.728zM115.728 483.388h128.334v16.456H115.728z" fill="#4A555F" p-id="6835"></path><path d="M462.038 269.88c-44.48 0-80.666-36.188-80.666-80.666s36.188-80.666 80.666-80.666c44.474 0 80.662 36.188 80.662 80.666s-36.188 80.666-80.662 80.666z m0-144.874c-35.404 0-64.21 28.804-64.21 64.208s28.804 64.208 64.21 64.208 64.204-28.804 64.204-64.208-28.8-64.208-64.204-64.208z" fill="#4A555F" p-id="6836"></path><path d="M553.8 681.298a28.716 28.696 90 1 0 57.392 0 28.716 28.696 90 1 0-57.392 0Z" fill="#FFD452" p-id="6837"></path><path d="M634.674 750.072v16.566c-13.112 13.768-31.652 22.27-52.168 22.27a72 72 0 0 1-52.224-22.27v-16.566c0-15.69 9.16-30.5 24.192-36.754a42.98 42.98 0 0 1 16.622-3.292h22.82c5.87 0 11.464 1.152 16.566 3.292 15.084 6.254 24.192 21.064 24.192 36.754z" fill="#FFD452" p-id="6838"></path><path d="M582.496 718.244c-20.362 0-36.926-16.574-36.926-36.946 0-20.372 16.564-36.946 36.926-36.946 20.356 0 36.92 16.574 36.92 36.946 0.002 20.372-16.562 36.946-36.92 36.946z m0-57.434c-11.288 0-20.47 9.192-20.47 20.488s9.182 20.488 20.47 20.488c11.282 0 20.464-9.192 20.464-20.488s-9.182-20.488-20.464-20.488z" fill="#4A555F" p-id="6839"></path><path d="M582.508 797.138c-22.21 0-42.872-8.812-58.172-24.812a8.236 8.236 0 0 1-2.282-5.686v-16.566c0-19.548 11.486-36.958 29.26-44.352 6.198-2.6 12.856-3.922 19.784-3.922h22.816c6.89 0 13.532 1.324 19.752 3.934 17.748 7.356 29.238 24.766 29.238 44.34v16.566a8.22 8.22 0 0 1-2.272 5.674c-15.246 16.008-35.888 24.824-58.124 24.824z m-43.998-33.914c11.904 11.282 27.402 17.458 43.998 17.458 16.606 0 32.084-6.172 43.938-17.448v-13.16c0-12.896-7.506-24.338-19.114-29.152a34.42 34.42 0 0 0-13.42-2.666h-22.816c-4.724 0-9.246 0.892-13.44 2.65-11.64 4.842-19.146 16.288-19.146 29.166v13.152z" fill="#4A555F" p-id="6840"></path><path d="M582.492 797.126c-44.48 0-80.666-36.188-80.666-80.666 0-44.48 36.188-80.666 80.666-80.666 44.48 0 80.666 36.188 80.666 80.666 0 44.478-36.188 80.666-80.666 80.666z m0-144.876c-35.404 0-64.21 28.804-64.21 64.21 0 35.404 28.804 64.208 64.21 64.208 35.404 0 64.21-28.804 64.21-64.208 0-35.404-28.806-64.21-64.21-64.21zM670.706 911.278h-16.456v-16.456h16.456v16.456z m-32.914 0h-16.456v-16.456h16.456v16.456z m-32.914 0h-16.456v-16.456h16.456v16.456z m83.024-0.506l-1.51-16.388a101.092 101.092 0 0 0 14.984-2.532l3.954 15.974a117.55 117.55 0 0 1-17.428 2.946z m34.226-8.484l-6.322-15.196a101.066 101.066 0 0 0 13.554-6.878l8.54 14.07a117.568 117.568 0 0 1-15.772 8.004z m30.156-18.27l-10.532-12.642a102.222 102.222 0 0 0 10.924-10.58l12.3 10.932a118.26 118.26 0 0 1-12.692 12.29z m23.41-26.33l-13.79-8.978a102.52 102.52 0 0 0 7.324-13.326l14.968 6.832a118.814 118.814 0 0 1-8.502 15.472z m14.582-32.078l-15.836-4.484a101.122 101.122 0 0 0 3.022-14.892l16.328 2.05a117.68 117.68 0 0 1-3.514 17.326z m4.442-34.766h-16.456v-16.456h16.456v16.456z m0-32.914h-16.456v-16.456h16.456v16.456zM241.878 348.092h-16.456v-16.456h16.456v16.456z m-32.914 0h-16.456v-16.456h16.456v16.456z m-32.914 0h-16.456v-16.456h16.456v16.456z m-32.914 0H126.68v-16.456h16.456v16.456zM241.964 310.708h-16.456v-16.456h16.456v16.456z m0-32.914h-16.456v-16.456h16.456v16.456z m0-32.914h-16.456v-16.456h16.456v16.456z m0-32.914h-16.456v-16.456h16.456v16.456z" fill="#4A555F" p-id="6841"></path></svg>;

// const SVG=({...props})=><svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 24" id="Chat"><g filter="url(#filter0_d)" fill="#34a853" class="color000000 svgShape"><path fill="#ea4335" d="M5.46667 18.4972V13.4308C1.96822 13.2175 1.85401 10.6127 1.854 9.07467C1.854 8.5825 1.86156 7.52185 1.94689 4.36472C2.03222 1.20758 4.32614 0.898273 5.46667 0.898269H16.4526C20.9324 0.73828 19.8771 4.379 19.9876 8.66035C20.083 12.3589 18.5375 13.3146 16.383 13.3146L11.4396 13.4308C10.7463 14.1419 9.00778 16.0862 7.22656 17.8039C5.65198 19.3223 5.46667 19.0875 5.46667 18.4972Z" class="colorff6b51 svgShape"></path><path stroke="#fbbc05" stroke-width=".15" d="M5.46667 18.4972V13.4308C1.96822 13.2175 1.85401 10.6127 1.854 9.07467C1.854 8.5825 1.86156 7.52185 1.94689 4.36472C2.03222 1.20758 4.32614 0.898273 5.46667 0.898269H16.4526C20.9324 0.73828 19.8771 4.379 19.9876 8.66035C20.083 12.3589 18.5375 13.3146 16.383 13.3146L11.4396 13.4308C10.7463 14.1419 9.00778 16.0862 7.22656 17.8039C5.65198 19.3223 5.46667 19.0875 5.46667 18.4972Z" class="colorStrokeff6b51 svgStroke"></path></g><g filter="url(#filter1_d)" fill="#34a853" class="color000000 svgShape"><path fill="#ea4335" d="M14.0915 15.1159H11.3739L9.66345 16.7952H13.391L17.3562 20.6887C18.6004 21.83 19.0326 20.4036 19.0326 19.5908V16.7952H20.3442C23.3548 16.7952 24.095 14.4025 24.1454 12.7151C24.1958 11.0276 23.9917 5.85316 23.9464 5.20964C23.8478 3.80862 21.8268 3.4718 21.1231 3.4718V5.20964C22.5121 5.20964 22.4299 6.02107 22.4299 6.79635V12.3204C22.4299 14.6373 21.7697 15.1159 20.3442 15.1159H17.2697L17.3388 18.4323L14.0915 15.1159Z" class="colorff6b51 svgShape"></path><path stroke="#fbbc05" stroke-width=".15" d="M14.0915 15.1159H11.3739L9.66345 16.7952H13.391L17.3562 20.6887C18.6004 21.83 19.0326 20.4036 19.0326 19.5908V16.7952H20.3442C23.3548 16.7952 24.095 14.4025 24.1454 12.7151C24.1958 11.0276 23.9917 5.85316 23.9464 5.20964C23.8478 3.80862 21.8268 3.4718 21.1231 3.4718V5.20964C22.5121 5.20964 22.4299 6.02107 22.4299 6.79635V12.3204C22.4299 14.6373 21.7697 15.1159 20.3442 15.1159H17.2697L17.3388 18.4323L14.0915 15.1159Z" class="colorStrokeff6b51 svgStroke"></path></g><g filter="url(#filter2_d)" fill="#34a853" class="color000000 svgShape"><circle cx="14.961" cy="7.042" r="1.275" fill="#4285f4" class="colorfddfdd svgShape"></circle><circle cx="14.961" cy="7.042" r="1.2" stroke="#dde9fd" stroke-width=".15" class="colorStrokefddfdd svgStroke"></circle></g><g filter="url(#filter3_d)" fill="#34a853" class="color000000 svgShape"><circle cx="6.916" cy="7.042" r="1.275" fill="#4285f4" class="colorfddfdd svgShape"></circle><circle cx="6.916" cy="7.042" r="1.2" stroke="#dde9fd" stroke-width=".15" class="colorStrokefddfdd svgStroke"></circle></g><g filter="url(#filter4_d)" fill="#34a853" class="color000000 svgShape"><circle cx="10.921" cy="7.042" r="1.275" fill="#4285f4" class="colorfddfdd svgShape"></circle><circle cx="10.921" cy="7.042" r="1.2" stroke="#dde9fd" stroke-width=".15" class="colorStrokefddfdd svgStroke"></circle></g><defs><filter id="filter0_d" width="20.318" height="20.208" x=".779" y=".818" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="1"></feOffset><feGaussianBlur stdDeviation=".5"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend></filter><filter id="filter1_d" width="16.748" height="19.793" x="8.48" y="3.397" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="1"></feOffset><feGaussianBlur stdDeviation=".5"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend></filter><filter id="filter2_d" width="4.551" height="4.551" x="12.685" y="5.767" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="1"></feOffset><feGaussianBlur stdDeviation=".5"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend></filter><filter id="filter3_d" width="4.551" height="4.551" x="4.64" y="5.767" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="1"></feOffset><feGaussianBlur stdDeviation=".5"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend></filter><filter id="filter4_d" width="4.551" height="4.551" x="8.645" y="5.767" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="1"></feOffset><feGaussianBlur stdDeviation=".5"></feGaussianBlur><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend></filter></defs></svg>
// const TestIcon=SVG
export const folderTreeService = createPlugin({
  addComponents() {
    return {
      folderTree: (props: { space: SpaceDef }) => {
        // console.log("Creating folder tree...:", props);
        // console.log("props:",props);
        return <TreeView {...props} />;
      },
    };
  },
  initilize(xbook) {
    xbook.registry.set<string, Action[]>("space.actions", [
      ...(xbook.registry.get("space.actions") || []),
      {
        id: "space.delete",
        title: "删除此空间",
        icon: <AiOutlineDelete />,
        events: ["Click"],
      },
      {
        id: "space.info",
        title: "查看信息",
        icon: <AiOutlineInfoCircle />,
        events: ["Click"],
      },
    ]);

    xbook.eventBus.on<any>("space.delete::Click", ({ context }) => {
      console.log("Space delete:", context);
      spaceHelper.getStore().getActions().delete(context.space.id);
    });

    xbook.eventBus.on<any>("space.info::Click", ({ context }) => {
      const { repo, id, owner, platform } = context.space;
      const url = `https://${platform}.com/${owner}/${repo}`;
      xbook.modalService
        .createModal({
          title: `About ${context.space.repo}`,
          footer: false,
          content: (
            <Box mb="1em">
              <Box>
                <HStack>
                  <Text as="b">Owner</Text>
                </HStack>
                <Text>
                  <Stat>{owner}</Stat>
                </Text>
              </Box>
              <Box>
                <HStack>
                  <Text as="b">Repository</Text>
                </HStack>
                <Text>
                  <Stat>
                    {url}
                    <Link as={"a"} href={url}>
                      <Icon as={HiOutlineExternalLink} />
                    </Link>
                  </Stat>
                </Text>
              </Box>
            </Box>
          ),
        })
        .open();
    });

    xbook.serviceBus.exposeAt("folderTreeService", {
      add: (space: SpaceDef) => {
        const { repo, id } = space;
        xbook.layoutService.activityBar.addActivity({
          id: id,
          name: repo,
          // icon: (props) => <Avatar name={repo} {...props} />,
          icon: AiFillFolder,
        });
        xbook.layoutService.sidebar.addView(
          {
            id: id,
            viewData: {
              type: "folderTree",
              props: {
                space,
              },
            },
          },
          true
        );
        xbook.eventBus.on(`activity:${id}:clicked`, () => {
          xbook.layoutService.sidebar.setView(id);
        });
        // console.log("compoenents:", xbook.componentService.getComponents());
      },
      focus: (id: string) => {
        xbook.layoutService.activityBar.showActivity(id);
      },
      remove: (id: string) => {
        xbook.layoutService.activityBar.removeActivity(id);
        xbook.layoutService.sidebar.removeView(id);
      },
    });
  },
});
