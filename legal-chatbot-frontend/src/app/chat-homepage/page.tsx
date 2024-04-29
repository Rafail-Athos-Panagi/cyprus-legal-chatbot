import ChatHomepage from "@/components/chat-homepage/ChatHomepage";
import { Metadata } from "next";
import ChatInterfaceNew from "@/components/chat-homepage/ChatInterfaceNew";

export const metadata: Metadata = {
  title: "Cyprus Chatbot Service",
  description: "Cyprus Legal chatbot service for the lawyers and the citizens",
};

const ChatHomePage = () => {
  return (
    <div>
      <ChatInterfaceNew />
    </div>
  )
};

export default ChatHomePage;
