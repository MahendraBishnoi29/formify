import React, { FC } from "react";

type layoutProps = {
  children: React.ReactNode;
};

const layout: FC<layoutProps> = ({ children }) => {
  return <div className="flex w-full flex-grow mx-auto">{children}</div>;
};

export default layout;
