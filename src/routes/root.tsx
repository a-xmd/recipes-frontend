import { useCallback, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

import type { UserContext, User } from "@/types/user.ts";
import { Header } from "@/components/header/header.tsx";

export const Root = () => {
  // @todo: improve typing
  // see: https://github.com/remix-run/react-router/discussions/9792
  const initialUser = useLoaderData() as User | null;
  const [user, setUser] = useState(initialUser);

  const login = useCallback(async (email: string, password: string) => {
    await fetch("/api/auth/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "content-type": "application/json",
      },
    });
    const meRes = await fetch("/api/me");
    setUser(await meRes.json());
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    setUser(null);
  }, []);

  return (
    <div className="m-8">
      <Header logout={logout} username={user?.username} />
      <Outlet context={{ user, login, logout } satisfies UserContext} />
    </div>
  );
};
