import type { SignInProps } from "../../types/app";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineAlternateEmail } from "react-icons/md";

enum AUTH {
  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
}

const SignIn = ({ signInForm, setSignInForm, setAuth }: SignInProps) => {
  const { data } = useSession();
  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await signIn("credentials", {
            email: signInForm.email,
            password: signInForm.password,
            redirect: false,
          }).then((res) => {
            res?.error
              ? toast(res?.error, {
                  type: "error",
                  autoClose: 2000,
                })
              : toast("Giriş başarılı", {
                  type: "success",
                  autoClose: 1000,
                }) &&
                setTimeout(() => {
                  window.location.href = "/";
                }, 1000);
          });
        }}
        className="flex w-full flex-col items-center gap-2 px-4 py-3 "
      >
        <div className="flex w-full items-center justify-between gap-4">
          <label htmlFor="email">Email</label>
          <input
            className="rounded-md border-2 px-2 py-1 text-primary"
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
            className="rounded-md border-2 px-2 py-1 text-primary"
            type="password"
            name="password"
            id="password"
            value={signInForm.password}
            onChange={(e) => {
              setSignInForm({ ...signInForm, password: e.target.value });
            }}
          />
        </div>
        <button
          disabled={data ? true : false}
          type="submit"
          className="w-full rounded-md bg-[#B21EED] px-2 py-1 text-white"
        >
          Giriş Yap
        </button>
      </form>
      <div className="flex w-full flex-col">
        <div className="flex w-full">
          <button
            onClick={() => {
              setAuth(AUTH.SIGN_UP);
            }}
            className="flex w-full items-center justify-center rounded-l-md bg-sky-800 p-2 text-white"
          >
            <MdOutlineAlternateEmail size={25} />
          </button>
          <button
            onClick={() => {
              toast("Google ile giriş işlemleri geliştirme aşamasında.", {
                type: "info",
              });
            }}
            className="flex w-full items-center justify-center bg-white p-2 text-white"
          >
            <FcGoogle size={25} />
          </button>
          <button
            onClick={() => {
              signIn("discord", {
                redirect: false,
              }).then((res) => console.log(res));
            }}
            className="flex w-full items-center justify-center bg-[#5662f6] p-2 text-white"
          >
            <FaDiscord size={25} />
          </button>
          <button
            onClick={() => {
              toast("Twitter ile giriş işlemleri geliştirme aşamasında.", {
                type: "info",
              });
            }}
            className="flex w-full items-center justify-center rounded-r-md bg-[#30c2f2] px-2 py-1 text-white"
          >
            <FaTwitter size={25} />
          </button>
        </div>
      </div>
    </>
  );
};

export default SignIn;
