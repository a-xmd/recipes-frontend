import { Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <div className="layout grid h-full">
      <div>van root</div>
      <Outlet />
    </div>
  );
};
