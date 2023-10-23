import { FormElementInstance, FormElements } from "@/lib/types";
import { FC } from "react";

type DesignerElementWrapperProps = {
  element: FormElementInstance;
};

const DesignerElementWrapper: FC<DesignerElementWrapperProps> = ({
  element,
}) => {
  const DesignerElement = FormElements[element.type].designerComponent;
  return <DesignerElement />;
};

export default DesignerElementWrapper;
