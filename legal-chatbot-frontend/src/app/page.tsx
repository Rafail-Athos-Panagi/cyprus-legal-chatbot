import Homepage from "@/components/homepage/Homepage";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homepage",
  description: "Explore the benefits and powers of the Cyprus legal chatbot service",
};

export default function HomePage() {
  return <Homepage />;
}
