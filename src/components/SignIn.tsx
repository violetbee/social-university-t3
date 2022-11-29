import type { SignInProps } from "../types/app";
import { signIn } from "next-auth/react";

enum AUTH {
  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
}

const SignIn = ({ signInForm, setSignInForm, setAuth }: SignInProps) => {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await signIn("credentials", {
          email: signInForm.email,
          password: signInForm.password,
          // callbackUrl: "http://localhost:3000",
          redirect: false,
        });
        console.log(res);
      }}
      className="flex w-full flex-col items-center gap-2 p-4"
    >
      <div className="flex w-full items-center justify-between gap-4">
        <label htmlFor="email">Email</label>
        <input
          className="rounded-md border-2 px-2 py-1"
          type="email"
          name="email"
          id="email"
          value={signInForm.email}
          onChange={(e) => {
            setSignInForm({ ...signInForm, email: e.target.value });
          }}
        />
      </div>
      <div className="flex w-full items-center justify-between gap-4">
        <label htmlFor="password">Şifre</label>
        <input
          className="rounded-md border-2 px-2 py-1"
          type="password"
          name="password"
          id="password"
          value={signInForm.password}
          onChange={(e) => {
            setSignInForm({ ...signInForm, password: e.target.value });
          }}
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <button type="submit" className="w-full rounded-md border-2 px-2 py-1">
          Giriş Yap
        </button>
        <div className="flex w-full divide-x-2 rounded-md border-2">
          <button
            onClick={() => {
              setAuth(AUTH.SIGN_UP);
            }}
            className="w-full rounded-l-md bg-sky-800 px-2 py-1 text-white"
          >
            @
          </button>
          <button
            onClick={() => {
              signIn("discord");
            }}
            className="w-full bg-orange-300 px-2 py-1 text-white"
          >
            D
          </button>
          <button
            onClick={() => {
              setAuth(AUTH.SIGN_UP);
            }}
            className="w-full  px-2 py-1"
          >
            B
          </button>
          <button
            onClick={() => {
              setAuth(AUTH.SIGN_UP);
            }}
            className="w-full  px-2 py-1"
          >
            B
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
