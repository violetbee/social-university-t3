import { Dosis } from "next/font/google";
import KeyImage from "../../img/key.png";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";
import type { UserSignInForm, UserSignUpForm } from "../../types/app";
import SignIn from "../../components/pages/signin/SignIn";
import SignUp from "../../components/pages/signup/SignUp";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { GetServerSideProps } from "next";

enum AUTH {
  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
}

const dosis = Dosis({ weight: "400", preload: true, subsets: ["latin"] });
const Auth = () => {
  const [signInForm, setSignInForm] = useState<UserSignInForm>({
    email: "",
    password: "",
  });
  const [signUpForm, setSignUpForm] = useState<UserSignUpForm>({
    email: "",
    password: "",
    name: "",
    surname: "",
    image: null,
  });
  const [auth, setAuth] = useState<AUTH>(AUTH.SIGN_IN);

  return (
    <div
      className={`flex min-h-screen w-full  items-center ${dosis.className} justify-center bg-primary text-white`}
    >
      <div className="flex flex-col items-center justify-center rounded-md border-2 border-accent bg-box p-2">
        <Image src={KeyImage} height={52} width={52} alt="auth" />
        {auth === AUTH.SIGN_IN ? (
          <SignIn
            setAuth={setAuth}
            signInForm={signInForm}
            setSignInForm={setSignInForm}
            signIn={signIn}
          />
        ) : (
          <SignUp
            setAuth={setAuth}
            signUpForm={signUpForm}
            setSignUpForm={setSignUpForm}
          />
        )}
      </div>
    </div>
  );
};

export default Auth;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};
