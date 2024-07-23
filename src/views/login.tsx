import { type ChangeEventHandler, useState } from "react";
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";

interface InputProps {
  label: string;
  value: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  type?: "text" | "password";
  placeholder?: string;
}

const Input = ({
  placeholder,
  label,
  value,
  handleChange,
  type = "text",
}: InputProps) => {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-semibold">{label}</span>
      <input
        className="border border-black rounded p-4"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </label>
  );
};

export const Login = () => {
  const [email, setEmail] = useState("ahmed.n.abbas@gmail.com");
  const [password, setPassword] = useState("randomrandomrandom");

  // @todo: add typing
  const { login } = useOutletContext();
  const [searchie] = useSearchParams();
  console.log(">>", searchie.get("origin"));
  console.log({ searchie });
  console.log({ login });
  const navigate = useNavigate();

  return (
    <>
      <h2 className="mb-4 text-xl font-bold"> login to recipes</h2>
      <form className="flex gap-4 flex-col">
        <Input
          label="email"
          value={email}
          handleChange={(e) => setEmail(e.currentTarget.value)}
        />
        <Input
          label="password"
          value={password}
          handleChange={(e) => setPassword(e.currentTarget.value)}
          type="password"
        />
        <button
          type="button"
          className="bg-slate-900 text-white rounded p-4"
          onClick={async () => {
            await login(email, password);
            const origin = searchie.get("origin");
            if (origin) {
              navigate(origin);
            }
          }}
        >
          log in
        </button>
      </form>
    </>
  );
};
