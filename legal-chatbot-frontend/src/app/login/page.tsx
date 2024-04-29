import LogInFormStep1 from "@/components/login/LogInFormStep1";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login into the Cyprus legal chatbot service",
};

const LoginPage = () => {
  return <LogInFormStep1></LogInFormStep1>;
};

export default LoginPage;
