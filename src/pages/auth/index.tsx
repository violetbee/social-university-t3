import { Dosis } from "@next/font/google";
import KeyImage from "../../img/key.png";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";
import type { UserSignInForm, UserSignUpForm } from "../../types/app";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";

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
  // const session = useSession();
  return (
    <div
      className={`flex min-h-screen w-full  items-center ${dosis.className} justify-center bg-[#F6F8FC]`}
    >
      <div className="flex flex-col items-center justify-center rounded-md border-2 p-2">
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
