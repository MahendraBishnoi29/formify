"use client";

import { Form } from "@prisma/client";
import { FC } from "react";
import SaveFormButton from "./SaveFormButton";
import PublishFormButton from "./PublishFormButton";
import PreviewDialogBtn from "./PreviewDialogBtn";

type FormBuilderProps = {
  form: Form;
};

const FormBuilder: FC<FormBuilderProps> = ({ form }) => {
  return (
    <main className="flex flex-col w-full">
      <div className="flex items-center justify-between border-b-2 p-4 gap-3">
        <h2 className="truncate font-medium">
          <span className="text-muted-foreground mr-2">Form:</span> {form.name}
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
      </div>
    </main>
  );
};

export default FormBuilder;
