"use client";

import { FormElementInstance } from "@/lib/types";
import { ReactNode, createContext, useState } from "react";

type DesignerContextType = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (id: string) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [elements, setElementsType] = useState<FormElementInstance[]>([]);

  const addElement = (index: number, element: FormElementInstance) => {
    setElementsType((prev) => {
      const newElem = [...prev];
      newElem.splice(index, 0, element);
      return newElem;
    });
  };

  const removeElement = (id: string) => {
    setElementsType((prev) => prev.filter((elem) => elem.id !== id));
  };

  return (
    <DesignerContext.Provider value={{ elements, addElement, removeElement }}>
      {children}
    </DesignerContext.Provider>
  );
}
