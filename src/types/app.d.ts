import { z } from "zod";

export interface UserSignInForm {
  email: string;
  password: string;
}
export interface UserSignUpForm {
  email: string;
  password: string;
  name: string;
  surname: string;
  image?: File | null;
}

enum AUTH {
  SIGN_IN = "SIGN_IN",
  SIGN_UP = "SIGN_UP",
}

export interface SignInProps {
  signInForm: UserLogin;
  setSignInForm: Dispatch<SetStateAction<UserLogin>>;
  signIn: Dispatch<SetStateAction<UserLogin>>;
  setAuth: Dispatch<SetStateAction<AUTH>>;
}

export interface SignUpProps {
  signUpForm: UserSignUpForm;
  setSignUpForm: Dispatch<SetStateAction<UserSignUpForm>>;
  setAuth: Dispatch<SetStateAction<AUTH>>;
}

export const UserLogin = z.object({
  email: z.string().email(),
  password: z.string().min(6, { msg: "Şifreniz en az 6 karakter olmalıdır." }),
});

type UserLogin = z.infer<typeof UserLogin>;

export interface TRPCError {
  validation: string;
  code: string;
  message: string;
  path: string[];
  minimum?: number;
  type: string;
  inclusive?: boolean;
}

enum POST_TYPE {
  TEXT = "TEXT",
  DOC = "DOC",
}

export interface SharePost {
  type: POST_TYPE;
  title: string;
  content: string;
  categoryId: string;
}
