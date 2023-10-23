"use client";

import useDesigner from "@/hooks/useDesigner";
import { ElementsType, FormElements } from "@/lib/types";
import { cn, idGenerator } from "@/lib/utils";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { FC } from "react";
import DesignerElementWrapper from "./DesignerElementWrapper";
import DesignerSidebar from "./DesignerSidebar";

type DesignerProps = {};

const Designer: FC<DesignerProps> = ({}) => {
  const { elements, addElement } = useDesigner();

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (e: DragEndEvent) => {
      const { active, over } = e;
      if (!active || !over) return;

      const isDesignerBtnElement = active.data?.current?.designerBtnElement;

      if (isDesignerBtnElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].constructs(
          idGenerator()
        );

        addElement(0, newElement);
      }
    },
  });

  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full">
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-2 ring-primary/20"
          )}
        >
          {!droppable.isOver && elements?.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop here
            </p>
          )}

          {droppable.isOver && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}

          {elements?.length > 0 ? (
            <div className="flex flex-col w-full gap-2 p-4 text-background">
              {elements.map((elem) => (
                <DesignerElementWrapper key={elem.id} element={elem} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};

export default Designer;
