import ForgetPassword from "@/components/ForgetPassword/ForgetPassword";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forget Password",
  description: "Send a request to reset your password",
};

const ForgetPasswordPage = () => {
  return <ForgetPassword></ForgetPassword>;
};

export default ForgetPasswordPage;
