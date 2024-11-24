class ActionProvider {
  private createChatBotMessage: (
    message: string,
    options?: Record<string, any>
  ) => any;
  private setState: React.Dispatch<React.SetStateAction<any>>;

  constructor(
    createChatBotMessage: (
      message: string,
      options?: Record<string, any>
    ) => any,
    setStateFunc: React.Dispatch<React.SetStateAction<any>>
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleGlycemyQuery = (userValue?: number) => {
    let message = "";

    if (userValue === undefined) {
      message =
        "Je n'ai pas compris la valeur de votre glycémie. Pouvez-vous préciser ?";
    } else if (userValue < 0.7) {
      message = `Une glycémie de ${userValue} mg/L est considérée comme basse. Vous devriez consulter un médecin.`;
    } else if (userValue >= 0.7 && userValue <= 1.2) {
      message = `Une glycémie de ${userValue} mg/L est normale. Continuez à suivre vos mesures.`;
    } else {
      message = `Une glycémie de ${userValue} mg/L est élevée. Consultez un professionnel de santé.`;
    }

    this.updateChatbotState(this.createChatBotMessage(message));
  };

  handleUnknown = () => {
    const message = this.createChatBotMessage(
      "Désolé, je n'ai pas compris. Pouvez-vous reformuler votre question ?"
    );
    this.updateChatbotState(message);
  };

  private updateChatbotState(message: any) {
    this.setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }
}

export default ActionProvider;
