"use client";

import { ElementsType, FormElement, FormElementInstance } from "@/lib/types";
import { MdTextFields } from "react-icons/md";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

const type: ElementsType = "TextField";
const extraAttributes = {
  label: "Text Field",
  helperText: "Helper text",
  required: false,
  placeholder: "Value here.....",
};

export const TextFieldFormElement: FormElement = {
  type,
  constructs: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: "Text Field",
  },
  designerComponent: DesignerComponent,
  formComponent: () => <div>form Comp</div>,
  propertiesComponent: () => <div>properties Comp</div>,
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, required, placeholder, helperText } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Input readOnly disabled placeholder={placeholder} />
      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
}
