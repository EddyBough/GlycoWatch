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
   * Gère les messages utilisateur en appelant l'API IA
   */
  handleUserMessage = async (userMessage: string) => {
    // Afficher un indicateur de chargement
    const loadingMessage = this.createChatBotMessage("Réflexion en cours...");
    this.updateChatbotState(loadingMessage);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Gérer les erreurs
        let errorMessage = "Une erreur est survenue.";

        if (data.code === "NO_AI_ACCESS") {
          errorMessage =
            "L'accès IA nécessite un abonnement IA+. Veuillez souscrire pour utiliser cette fonctionnalité.";
        } else if (data.code === "AI_QUOTA_EXCEEDED") {
          errorMessage = "Votre quota quotidien est atteint. Réessayez demain.";
        } else if (data.error) {
          errorMessage = data.error;
        }

        // Remplacer le message de chargement par l'erreur
        this.setState((prev: any) => {
          const messages = [...prev.messages];
          messages[messages.length - 1] =
            this.createChatBotMessage(errorMessage);
          return { ...prev, messages };
        });
        return;
      }

      // Remplacer le message de chargement par la réponse de l'IA
      this.setState((prev: any) => {
        const messages = [...prev.messages];
        messages[messages.length - 1] = this.createChatBotMessage(
          data.response
        );
        return { ...prev, messages };
      });
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API IA:", error);

      // Remplacer le message de chargement par l'erreur
      this.setState((prev: any) => {
        const messages = [...prev.messages];
        messages[messages.length - 1] = this.createChatBotMessage(
          "Désolé, une erreur technique est survenue. Veuillez réessayer plus tard."
        );
        return { ...prev, messages };
      });
    }
  };

  /**
   * Met à jour l'état du chatbot
   */
  private updateChatbotState(message: any) {
    this.setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }
}

export default ActionProvider;
