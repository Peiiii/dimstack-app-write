import { TreeEventKeys } from "@/plugins/space/folderTreeService/tokens";

// InputBox 组件
export const InputBox = ({ inputRef, value, name, parentNode, eventBus, node }) => (
  <div className="relative w-full">
    <input
      ref={inputRef}
      type="text"
      autoFocus
      value={value}
      onChange={eventBus.connector(TreeEventKeys.EditChange, (event) => ({
        node,
        event,
        parentNode,
      }))}
      onBlur={eventBus.connector(TreeEventKeys.EditBlur, (event) => ({
        node,
        event,
        parentNode,
      }))}
      onKeyDown={(event) => {
        if (event.code.toLowerCase() === "enter") {
          eventBus.emit(TreeEventKeys.EditKeyEnter, {
            node,
            event,
            parentNode,
          });
        }
      }}
      defaultValue={name}
      // TailwindCSS classes for minimalistic input style without background
      className="w-full text-base pl-0 bg-transparent border-none focus:outline-none"
      placeholder="请输入名称"
    />
    {/* 默认深灰色下划线 */}
    <div className="absolute left-0 bottom-0 w-full h-[2px] bg-gray-500"></div>
    {/* 更深的蓝色加粗下划线 */}
    <div className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-600 transform scale-x-0 transition-transform duration-300 ease-in-out focus-within:scale-x-100"></div>
  </div>
);
