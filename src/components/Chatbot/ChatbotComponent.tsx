import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./ChatbotConfig";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import { BotIcon } from "lucide-react";

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="fixed bottom-5 right-5">
      <div
        className="w-12 h-12 bg-[#00cba9] text-white flex items-center justify-center rounded-full shadow-lg cursor-pointer hover:bg-[#00b598] transition"
        onClick={toggleChatbot}
        aria-label={isOpen ? "Fermer le chatbot" : "Ouvrir le chatbot"}
        role="button"
      >
        {isOpen ? (
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>×</span> // Croix
        ) : (
          <BotIcon />
        )}
      </div>
      {/* Chatbot */}
      <div
        className={`mt-3 shadow-lg bg-white rounded-lg transition-transform duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
        style={{ transformOrigin: "bottom right" }}
      >
        {isOpen && (
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        )}
      </div>
    </div>
  );
};

export default ChatbotComponent;
