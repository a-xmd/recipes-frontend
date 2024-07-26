import { useCallback, useState } from "react";
import { Outlet, useLoaderData, useRouteError } from "react-router-dom";

import type { UserContext, User } from "@/types/user.ts";
import { Header } from "@/components/header/header.tsx";
import { createApiUrl } from "@/utils/url.ts";

export const Root = () => {
  // @todo: improve typing
  // see: https://github.com/remix-run/react-router/discussions/9792
  const initialUser = useLoaderData() as User | null;
  const [user, setUser] = useState(initialUser);

  const login = useCallback(async (email: string, password: string) => {
    const req = await fetch(createApiUrl("/api/auth/login"), {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "content-type": "application/json",
      },
    });
    console.log("en hier", req.url);
    const meRes = await fetch(createApiUrl("/api/me"));
    if (meRes.status !== 200) {
      console.log("😱 whoops");
      return;
    }
    setUser(await meRes.json());
  }, []);

  const logout = useCallback(async () => {
    await fetch(createApiUrl("/api/auth/logout"), {
      method: "POST",
    });
    setUser(null);
  }, []);
  const error = useRouteError();
  // @todo: delete
  console.log({ error });
  return (
    <div className="m-8">
      <Header logout={logout} username={user?.username} />
      <Outlet context={{ user, login, logout } satisfies UserContext} />
    </div>
  );
};
