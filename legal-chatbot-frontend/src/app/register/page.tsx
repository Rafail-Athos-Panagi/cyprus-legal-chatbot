import RegisterFormStep1 from "@/components/registration/RegisterFormStep1"

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Create new account for the Cyprus legal chatbot service",
};

const RegisterStep1Page = () => {
    return (
        <RegisterFormStep1></RegisterFormStep1>
    )
}

export default RegisterStep1Page