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
