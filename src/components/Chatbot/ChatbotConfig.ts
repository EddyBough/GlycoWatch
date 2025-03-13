import { createChatBotMessage } from "react-chatbot-kit";

const ChatbotConfig = {
  botName: "GlycoBot",
  initialMessages: [
    createChatBotMessage(
      `Bonjour ! Je suis GlycoBot. Entrez votre type de diabète (1, 2, 3 ou diabète gestationnel), je vous renseignerai si elle est basse, normale ou élevée. Mais consultez votre médecin quoi qu'il arrive.`,
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
