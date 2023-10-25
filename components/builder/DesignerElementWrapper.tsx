import { FormElementInstance, FormElements } from "@/lib/types";
import { useDroppable } from "@dnd-kit/core";
import { FC } from "react";

type DesignerElementWrapperProps = {
  element: FormElementInstance;
};

const DesignerElementWrapper: FC<DesignerElementWrapperProps> = ({
  element,
}) => {
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
    <div className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset">
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-t-md"
      ></div>
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-b-md"
      ></div>
      <div className="flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none">
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  );
};

export default DesignerElementWrapper;
