import { createChatBotMessage } from "react-chatbot-kit";

const ChatbotConfig = {
  botName: "GlycoBot",
  initialMessages: [
    createChatBotMessage(
      `Bonjour ! Je suis GlycoBot. Je peux vous donner des conseils en fonction de vos mesures de glycémie, mais consultez votre médecin quoi qu'il arrive.`,
      {}
    ),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#00cba9",
    },
    chatButton: {
      backgroundColor: "#00cba9",
    },
  },
};

export default ChatbotConfig;
