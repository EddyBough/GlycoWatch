class MessageParser {
  private actionProvider: {
    handleGlycemyQuery: (value?: number) => void;
    handleUnknown: () => void;
  };

  constructor(actionProvider: {
    handleGlycemyQuery: (value?: number) => void;
    handleUnknown: () => void;
  }) {
    this.actionProvider = actionProvider;
  }

  parse(message: string) {
    const lowerCaseMessage = message.toLowerCase();

    if (
      lowerCaseMessage.includes("glycémie") ||
      lowerCaseMessage.includes("taux") ||
      lowerCaseMessage.includes("mesure")
    ) {
      // verification to see if a number is in the question
      const value = parseFloat(
        lowerCaseMessage.match(/\d+(\.\d+)?/)?.[0] || ""
      );
      this.actionProvider.handleGlycemyQuery(value);
    } else {
      this.actionProvider.handleUnknown();
    }
  }
}

export default MessageParser;
