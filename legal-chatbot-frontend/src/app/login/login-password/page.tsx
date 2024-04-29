import LogInFormStep2 from "@/components/login/LogInFormStep2";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login into the Cyprus legal chatbot service",
};

const LoginPasswordPage = () => {
  return <LogInFormStep2></LogInFormStep2>;
};

export default LoginPasswordPage;
