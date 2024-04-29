import ActivationCode from "@/components/registration/ActivationCode";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activate Account",
  description: "Activate your account in order to use the Cyprus legal chatbot service",
};

const ActivateCodePage = () => {

  return <ActivationCode></ActivationCode>;
};

export default ActivateCodePage;
