"use client";

import { ElementsType, FormElements } from "@/lib/types";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { FC, useState } from "react";
import { SidebarBtnElementDragOverlay } from "../misc/SidebarBtnElement";

interface DragOverlayWrapperProps {}

const DragOverlayWrapper: FC<DragOverlayWrapperProps> = ({}) => {
  const [draggedIn, setDraggedIn] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (e) => {
      setDraggedIn(e.active);
    },
    onDragCancel: () => {
      setDraggedIn(null);
    },
    onDragEnd: () => {
      setDraggedIn(null);
    },
  });

  if (!draggedIn) return null;

  let node = <div>no drag overlay</div>;
  const isSidebarBtnElement = draggedIn.data?.current?.isDesignerBtnElement;

  if (isSidebarBtnElement) {
    const type = draggedIn.data?.current?.type as ElementsType;
    node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />;
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
