import { Outlet } from "react-router-dom";
import { useUser } from "@/hooks/use-user.ts";

export const ProtectedRoutes = () => {
  const { user } = useUser();
  if (!user) {
    return <div>you should login first</div>;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};
