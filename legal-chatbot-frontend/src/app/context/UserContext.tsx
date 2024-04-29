import { createContext, useContext } from "react";
import { registerStep1Form } from "./interfaces/registerStep1Form";
import { registerStep2Form } from "./interfaces/registerStep2Form";

interface IUserContext {
  emailLogin: string;
  changeEmailLogin: (email: string) => void;
  registerStep1Form: registerStep1Form;
  changeRegisterStep1Form: (registerStep1: registerStep1Form) => void;
  registerStep2Form: registerStep2Form;
  changeRegisterStep2Form: (registerStep2: registerStep2Form) => void;
  activationEmail: string;
  changeActivationEmail: (email: string) => void;
  isGreek: boolean;
  changeIsGreek: (isGreek:boolean) => void;
}

export const UserContext = createContext<IUserContext>({
  emailLogin: "",
  changeEmailLogin(email) {},
  registerStep1Form: {
    email: "",
    password: "",
  },
  changeRegisterStep1Form(registerStep1) {},
  registerStep2Form: {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
  },
  changeRegisterStep2Form(registerStep2Form) {},
  activationEmail: "",
  changeActivationEmail(email) {},
  isGreek: false,
  changeIsGreek(isGreek) {},
});

export const useUserContext = () => useContext(UserContext);
