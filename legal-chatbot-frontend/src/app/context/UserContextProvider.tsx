"use client";

import { registerStep1Form } from "./interfaces/registerStep1Form";
import { registerStep2Form } from "./interfaces/registerStep2Form";
import React, { ReactNode, useState } from "react";
import { UserContext } from "./UserContext";

interface IProps {
  children: ReactNode;
}

const UserContextProvider = ({ children }: IProps) => {
  const [emailLogin, setEmailLogin] = useState<string>("");
  const [activationEmail, setActivationEmail] = useState<string>("");
  const [isGreek , setIsGreek] = useState<boolean>(false);
  const changeEmailLogin = (emailLogin: string) => {
    setEmailLogin(emailLogin);
  };
  const [registerStep1Form, setRegisterStep1Form] = useState<registerStep1Form>(
    {
      email: "",
      password: "",
    }
  );
  const changeRegisterStep1Form = (registerStep1: registerStep1Form) => {
    setRegisterStep1Form(registerStep1);
  };
  const [registerStep2Form, setRegisterStep2Form] = useState<registerStep2Form>(
    {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
    }
  );
  const changeRegisterStep2Form = (registerStep2: registerStep2Form) => {
    setRegisterStep2Form(registerStep2);
  };
  const changeActivationEmail = (activationEmail: string) => {
    setActivationEmail(activationEmail);
  };

  const changeIsGreek = () => {
    setIsGreek(prevIsGreek => !prevIsGreek);
  }

  return (
    <UserContext.Provider
      value={{
        emailLogin,
        changeEmailLogin,
        registerStep1Form,
        changeRegisterStep1Form,
        registerStep2Form,
        changeRegisterStep2Form,
        activationEmail,
        changeActivationEmail,
        isGreek,
        changeIsGreek,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
