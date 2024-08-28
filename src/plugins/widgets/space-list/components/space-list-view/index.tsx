import { Tokens } from "@/constants/tokens";
import { SpaceDef } from "@/toolkit/types/space";
import { Select } from "@chakra-ui/react";
import { FC, useContext, useEffect, useRef } from "react";
import xbook from "xbook/index";
import { ModalActionContext } from "xbook/services/modalService";

export const SpaceItemView: FC<{ space: SpaceDef }> = ({ space }) => {
  return (
    <div>
      <h1>{space.repo}</h1>
    </div>
  );
};

export const SpaceListView = () => {
  const { useSpaces, focusSpace, getFocusedSpace } =
    xbook.serviceBus.createProxy(Tokens.SpaceService);
  const spaces = useSpaces();
  const currentSpace = getFocusedSpace();
  const { close } = useContext(ModalActionContext)!;
  const ref = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.click();
    }
  }, []);

  return (
    <div>
      <Select
        defaultValue={currentSpace?.id}
        ref={ref}
        onFocus={() => {
          ref.current?.click();
        }}
        onChange={(e) => {
          focusSpace(e.target.value);
          close();
        }}
      >
        {spaces.map((space) => (
          <option key={space.id} value={space.id}>
            <SpaceItemView space={space} />
          </option>
        ))}
      </Select>
    </div>
  );
};
