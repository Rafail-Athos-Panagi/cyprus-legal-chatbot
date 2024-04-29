import ResetPassword from "@/components/ForgetPassword/ResetPassword";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your password",
};

const ResetPasswordPage = () => {
  return <ResetPassword></ResetPassword>;
};

export default ResetPasswordPage;
