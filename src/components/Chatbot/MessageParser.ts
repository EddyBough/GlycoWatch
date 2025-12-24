class MessageParser {
  private actionProvider: {
    handleUserMessage: (message: string) => void;
  };

  constructor(actionProvider: {
    handleUserMessage: (message: string) => void;
  }) {
    this.actionProvider = actionProvider;
  }

  parse(message: string) {
    // Envoyer tous les messages à l'API IA
    this.actionProvider.handleUserMessage(message.trim());
  }
}

export default MessageParser;
