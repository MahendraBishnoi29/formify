import { FC } from "react";

type DesignerSidebarProps = {};

const DesignerSidebar: FC<DesignerSidebarProps> = ({}) => {
  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full rounded-l-md">
      DesignerSidebar
    </aside>
  );
};

export default DesignerSidebar;
