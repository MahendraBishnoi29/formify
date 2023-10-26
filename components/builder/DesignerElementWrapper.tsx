import { FormElementInstance, FormElements } from "@/lib/types";
import { useDroppable } from "@dnd-kit/core";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { BiSolidTrash } from "react-icons/bi";
import useDesigner from "@/hooks/useDesigner";

type DesignerElementWrapperProps = {
  element: FormElementInstance;
};

const DesignerElementWrapper: FC<DesignerElementWrapperProps> = ({
  element,
}) => {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

  const { removeElement } = useDesigner();

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });
  const DesignerElement = FormElements[element.type].designerComponent;
  return (
    <div
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md"
      />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-b-md"
      />

      {mouseIsOver && (
        <>
          <div className="absolute h-full right-0">
            <Button
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
              variant="outline"
              onClick={() => {
                removeElement(element.id);
              }}
            >
              <BiSolidTrash className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-b-md">
            <p className="text-muted-foreground text-sm">
              click for properties or drag to move
            </p>
          </div>
        </>
      )}

      <div className="flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none">
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  );
};

export default DesignerElementWrapper;
