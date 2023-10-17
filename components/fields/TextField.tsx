"use client";

import { ElementsType, FormElement } from "@/lib/types";
import { MdTextFields } from "react-icons/md";

const type: ElementsType = "TextField";

export const TextFieldFormElement: FormElement = {
  type,
  constructs: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Text Field",
      helperText: "Helper text",
      required: false,
      placeholder: "Value here.....",
    },
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: "Text Field",
  },
  designerComponent: () => <div>Designer Comp</div>,
  formComponent: () => <div>form Comp</div>,
  propertiesComponent: () => <div>properties Comp</div>,
};
