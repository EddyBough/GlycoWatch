import { createChatBotMessage } from "react-chatbot-kit";

const ChatbotConfig = {
  botName: "GlycoBot",
  initialMessages: [
    createChatBotMessage(
      `Bonjour ! Je suis GlycoBot, votre assistant médical IA spécialisé dans le diabète. Posez-moi vos questions sur la glycémie, le diabète, ou votre suivi. Je vous rappelle que mes conseils sont généraux et qu'il est important de consulter un médecin pour tout conseil médical personnalisé.`,
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
