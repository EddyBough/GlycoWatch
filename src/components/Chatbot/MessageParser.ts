class MessageParser {
  private actionProvider: {
    handleGlycemyQuery: (value?: number) => void;
    setDiabetesType: (type: string) => void;
    handleUnknown: () => void;
  };

  constructor(actionProvider: {
    handleGlycemyQuery: (value?: number) => void;
    setDiabetesType: (type: string) => void;
    handleUnknown: () => void;
  }) {
    this.actionProvider = actionProvider;
  }

  parse(message: string) {
    const lowerCaseMessage = message.trim().toLowerCase();

    // Vérifier si l'utilisateur donne un type de diabète
    if (
      lowerCaseMessage.includes("type 1") ||
      lowerCaseMessage.includes("type 2") ||
      lowerCaseMessage.includes("diabète gestationnel") ||
      ["1", "2", "3"].includes(lowerCaseMessage)
    ) {
      this.actionProvider.setDiabetesType(lowerCaseMessage);
      return;
    }

    //  Vérifier si l'utilisateur donne un taux de glycémie
    const value = parseFloat(lowerCaseMessage.match(/\d+(\.\d+)?/)?.[0] || "");

    if (!isNaN(value)) {
      this.actionProvider.handleGlycemyQuery(value);
      return;
    }

    // Sinon, message inconnu
    this.actionProvider.handleUnknown();
  }
}

export default MessageParser;
