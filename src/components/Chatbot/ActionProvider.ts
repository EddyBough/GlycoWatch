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

  /**
   * 1️- Demande à l'utilisateur son type de diabète
   */
  handleDiabetesType = () => {
    const message = this.createChatBotMessage(
      "Avant de commencer, quel est votre type de diabète ?\n\n1️⃣ Type 1\n2️⃣ Type 2\n3️⃣ Diabète gestationnel\n\nRépondez avec le numéro correspondant."
    );
    this.updateChatbotState(message);
  };

  /**
   * 2️- Enregistre le type de diabète
   */
  setDiabetesType = (userInput: string) => {
    let diabetesType = "";

    // Vérifier si l'utilisateur a entré un numéro ou du texte
    const inputFormatted = userInput.trim().toLowerCase();
    if (["1", "type 1"].includes(inputFormatted)) {
      diabetesType = "Type 1";
    } else if (["2", "type 2", "diabète type 2"].includes(inputFormatted)) {
      diabetesType = "Type 2";
    } else if (["3", "diabète gestationnel"].includes(inputFormatted)) {
      diabetesType = "diabète gestationnel";
    } else {
      this.updateChatbotState(
        this.createChatBotMessage(
          "Je n'ai pas compris. Veuillez entrer 1, 2, 3 ou diabète gestationnel pour indiquer votre type de diabète."
        )
      );
      return;
    }

    // Mettre à jour l'état avec le type de diabète
    this.setState((prev: any) => ({
      ...prev,
      diabetesType,
    }));

    const confirmationMessage = this.createChatBotMessage(
      `Merci ! Vous avez indiqué que vous avez un diabète de type ${diabetesType}. Maintenant, indiquez-moi votre taux de glycémie.`
    );

    this.updateChatbotState(confirmationMessage);
  };

  /**
   * 3️- Analyse le taux de glycémie en fonction du type de diabète
   */
  handleGlycemyQuery = (userValue?: number) => {
    this.setState((prev: any) => {
      const diabetesType = prev.diabetesType;

      // Vérifier si le type de diabète est défini, sinon demander
      if (!diabetesType) {
        this.handleDiabetesType();
        return prev;
      }

      let message = "";
      if (userValue === undefined || isNaN(userValue)) {
        message =
          "Je n'ai pas compris la valeur de votre glycémie. Pouvez-vous préciser ?";
      } else {
        message = this.getGlycemyMessage(userValue, diabetesType);
      }

      // Vérifier si ce message est déjà présent pour éviter les doublons
      if (
        prev.messages.length > 0 &&
        prev.messages[prev.messages.length - 1].message === message
      ) {
        return prev; // Ne pas ajouter de doublon
      }

      const newMessage = this.createChatBotMessage(message);

      return {
        ...prev,
        messages: [...prev.messages, newMessage],
      };
    });
  };

  /**
   * 4️- Génère une réponse adaptée au taux de glycémie selon le type de diabète
   */
  getGlycemyMessage = (value: number, diabetesType: string) => {
    const thresholds: Record<string, { low: number; normalMax: number }> = {
      "Type 1": { low: 0.8, normalMax: 1.5 },
      "Type 2": { low: 0.7, normalMax: 1.3 },
      "diabète gestationnel": { low: 0.9, normalMax: 1.2 },
    };

    const { low, normalMax } = thresholds[diabetesType] || {
      low: 0.7,
      normalMax: 1.2,
    };

    if (value < low) {
      return `⚠️ Une glycémie de ${value} mg/L est basse pour un ${diabetesType}. Vous devriez consommer du sucre et consulter un médecin si cela persiste.`;
    } else if (value >= low && value <= normalMax) {
      return `✅ Une glycémie de ${value} mg/L est normale pour un ${diabetesType}. Continuez votre suivi régulier.`;
    } else {
      return `🚨 Une glycémie de ${value} mg/L est élevée pour un ${diabetesType}. Il est recommandé de consulter un professionnel de santé.`;
    }
  };

  /**
   * 5️- Gère l'entrée utilisateur et oriente vers la bonne fonction
   */
  handleUserInput = (userMessage: string) => {
    this.setState((prev: any) => {
      const { diabetesType } = prev;

      if (!diabetesType) {
        this.setDiabetesType(userMessage); // On enregistre le diabète d'abord
      } else {
        const userValue = parseFloat(userMessage);
        if (!isNaN(userValue)) {
          this.handleGlycemyQuery(userValue);
        } else {
          this.handleUnknown();
        }
      }

      return prev;
    });
  };

  handleUnknown = () => {
    this.updateChatbotState(
      this.createChatBotMessage(
        "Désolé, je n'ai pas compris. Indiquez d'abord votre type de diabète ou donnez-moi votre taux de glycémie."
      )
    );
  };

  /**
   * 6️- Met à jour l'état du chatbot
   */
  private updateChatbotState(message: any) {
    this.setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }
}

export default ActionProvider;
