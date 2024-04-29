import RegisterFormStep2 from "@/components/registration/RegisterFormStep2";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Create new account for the Cyprus legal chatbot service",
};

const RegisterStep2Page = () => {
  return <RegisterFormStep2></RegisterFormStep2>;
};

export default RegisterStep2Page;
