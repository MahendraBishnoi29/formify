import { FormElementInstance, FormElements } from "@/lib/types";
import { FC } from "react";

type DesignerElementWrapperProps = {
  element: FormElementInstance;
};

const DesignerElementWrapper: FC<DesignerElementWrapperProps> = ({
  element,
}) => {
  const DesignerElement = FormElements[element.type].designerComponent;
  return <DesignerElement elementInstance={element} />;
};

export default DesignerElementWrapper;
