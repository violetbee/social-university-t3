import React from "react";
import { SignUpProps, TRPCError } from "../types/app";
import { trpc } from "../utils/trpc";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

enum AUTH {
  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
}

const SignUp = ({ signUpForm, setSignUpForm, setAuth }: SignUpProps) => {
  const user = trpc.user.signUp.useMutation();
  const signUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await user.mutateAsync(
      {
        email: signUpForm.email,
        password: signUpForm.password,
        name: signUpForm.name,
        surname: signUpForm.surname,
      },
      {
        onSuccess: async () => {
          toast.success("Başarıyla kayıt oldunuz.", {
            autoClose: 2000,
          });
          await signIn("credentials", {
            email: signUpForm.email,
            password: signUpForm.password,
            redirect: false,
          }).then(() =>
            setTimeout(() => {
              window.location.href = "/";
            }, 2000)
          );
        },
        onError: (error) => {
          if (error.message.includes("[")) {
            const parsedError = JSON.parse(error.message);
            parsedError.forEach((err: TRPCError) => {
              toast(err.message, {
                type: "error",
                autoClose: 2000,
              });
            });
          } else {
            toast(error.message, {
              type: "error",
              autoClose: 2000,
            });
          }
        },
      }
    );
  };

  return (
    <form
      onSubmit={signUpHandler}
      className="flex w-full flex-col items-center gap-2 p-4"
    >
      <div className="flex w-full items-center justify-between gap-8">
        <label htmlFor="email">Email</label>
        <input
          className="w-full rounded-md border-2 px-2 py-1"
          type="email"
          name="email"
          id="email"
          value={signUpForm.email}
          onChange={(e) => {
            setSignUpForm({ ...signUpForm, email: e.target.value });
          }}
        />
      </div>
      <div className="flex w-full items-center justify-between">
        <label htmlFor="name">İsim</label>
        <input
          className=" rounded-md border-2 px-2 py-1"
          type="text"
          name="name"
          id="name"
          value={signUpForm.name}
          onChange={(e) => {
            setSignUpForm({ ...signUpForm, name: e.target.value });
          }}
        />
      </div>
      <div className="flex w-full items-center justify-between">
        <label htmlFor="surname">Soy isim</label>
        <input
          className="rounded-md border-2 px-2 py-1"
          type="text"
          name="surname"
          id="surname"
          value={signUpForm.surname}
          onChange={(e) => {
            setSignUpForm({ ...signUpForm, surname: e.target.value });
          }}
        />
      </div>

      <div className="flex w-full items-center justify-between">
        <label htmlFor="password">Şifre</label>
        <input
          className="rounded-md border-2 px-2 py-1"
          type="password"
          name="password"
          id="password"
          value={signUpForm.password}
          onChange={(e) => {
            setSignUpForm({ ...signUpForm, password: e.target.value });
          }}
        />
      </div>

      <button type="submit" className="w-full rounded-md border-2 px-2 py-1">
        Üye Ol
      </button>
      <button
        onClick={() => {
          setAuth(AUTH.SIGN_IN);
        }}
        type="submit"
        className="w-full rounded-md border-2 px-2 py-1"
      >
        Üyeliğin var mı? Öyleyse giriş yap
      </button>
    </form>
  );
};
export default SignUp;
