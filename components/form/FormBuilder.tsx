"use client";

import { DndContext } from "@dnd-kit/core";
import { Form } from "@prisma/client";
import { FC } from "react";
import Designer from "../builder/Designer";
import PreviewDialogBtn from "./PreviewDialogBtn";
import PublishFormButton from "./PublishFormButton";
import SaveFormButton from "./SaveFormButton";
import DragOverlayWrapper from "../builder/DragOverlayWrapper";

type FormBuilderProps = {
  form: Form;
};

const FormBuilder: FC<FormBuilderProps> = ({ form }) => {
  return (
    <DndContext>
      <main className="flex flex-col w-full">
        <nav className="flex items-center justify-between border-b-2 p-4 gap-3">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogBtn />
            {!form.published ? (
              <>
                <SaveFormButton />
                <PublishFormButton />
              </>
            ) : (
              ""
            )}
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center overflow-y-auto relative h-[120px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
