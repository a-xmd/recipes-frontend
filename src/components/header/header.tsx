import { Link, NavLink, useLocation } from "react-router-dom";
import { type FC, PropsWithChildren } from "react";
import classnames from "classnames";
import styles from "./header.module.scss";

interface HeaderProps {
  username: string | undefined;
  logout: () => void;
}

const LoggedInBlock = ({
  username,
  logout,
}: {
  username: string;
  logout: () => void;
}) => {
  return (
    <div className="flex gap-2">
      <span className="bg-slate-900 rounded-full h-10 aspect-square inline-flex text-white justify-center leading-none items-center text-sm">
        {username[0].toUpperCase()}
      </span>
      <button
        className="inline-flex p-2 h-10 rounded outline outline-transparent hover:outline-indigo-600 focus:outline-indigo-600"
        onClick={logout}
      >
        logout
      </button>
    </div>
  );
};

const LoginBlock = () => {
  const { pathname } = useLocation();
  console.log({
    pathnameoriginal: pathname,
    pathname: encodeURIComponent(pathname),
    decoded: decodeURIComponent(encodeURIComponent(pathname)),
  });

  if (pathname === "/login") {
    return null;
  }
  return (
    <Link to={`/login?origin=${encodeURIComponent(pathname)}`}>log in</Link>
  );
};

interface HeaderProps {
  logout: () => void;
}

const MenuLink: FC<PropsWithChildren<{ link: string }>> = ({
  children,
  link,
}) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        classnames(styles.link, {
          [styles.active]: isActive,
        })
      }
    >
      {children}
    </NavLink>
  );
};

export const Header: FC<HeaderProps> = ({ username, logout }) => {
  return (
    <header className="rounded p-4 mb-4 border flex items-center justify-between border-slate-900 ">
      <ul className=" flex gap-2">
        <li>
          <MenuLink link="/">home</MenuLink>
        </li>
        <li>
          <MenuLink link="/about">about</MenuLink>
        </li>
        <li>
          <MenuLink link="/private">private</MenuLink>
        </li>
      </ul>
      {username ? (
        <LoggedInBlock username={username} logout={logout} />
      ) : (
        <LoginBlock />
      )}
    </header>
  );
};
