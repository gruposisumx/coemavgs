import { supabase } from '../../lib/supabase';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export class ChatAI {
  private messages: Message[] = [];
  private testInProgress = false;
  private testAnswers: string[] = [];
  private currentQuestion = 0;
  
  private readonly testQuestions = [
    "¿Cómo te has sentido emocionalmente en las últimas semanas?",
    "¿Has experimentado algún tipo de violencia recientemente?",
    "¿Te sientes segura en tu entorno actual?",
    "¿Tienes alguien de confianza con quien hablar?",
    "¿Necesitas ayuda inmediata?"
  ];

  async getResponse(userMessage: string, userId?: string): Promise<Message> {
    try {
      const { data, error } = await supabase.functions.invoke('chat-ai', {
        body: {
          message: userMessage,
          userId,
          context: this.messages.slice(-5) // Últimos 5 mensajes para contexto
        }
      });

      if (error) throw error;

      if (data.needsEmergencyHelp) {
        this.triggerEmergencyProtocol();
      }

      const response: Message = {
        id: Date.now().toString(),
        content: data.response,
        sender: 'ai',
        timestamp: new Date()
      };

      this.messages.push(response);
      return response;
    } catch (error) {
      console.error('Error getting AI response:', error);
      return {
        id: Date.now().toString(),
        content: "Lo siento, estoy teniendo problemas técnicos. Por favor, intenta de nuevo.",
        sender: 'ai',
        timestamp: new Date()
      };
    }
  }

  async startTest(): Promise<string> {
    this.testInProgress = true;
    this.testAnswers = [];
    this.currentQuestion = 0;
    return this.testQuestions[0];
  }

  async processTestAnswer(answer: string): Promise<string> {
    this.testAnswers.push(answer);
    this.currentQuestion++;

    if (this.currentQuestion >= this.testQuestions.length) {
      this.testInProgress = false;
      await this.submitTestResults();
      return "Gracias por completar el test. Nuestro equipo analizará tus respuestas y te contactará pronto.";
    }

    return this.testQuestions[this.currentQuestion];
  }

  private async submitTestResults() {
    const riskLevel = this.analyzeRiskLevel();
    
    if (riskLevel === 'high') {
      this.triggerEmergencyProtocol();
    }

    // Guardar resultados en Supabase
    await supabase.from('test_results').insert({
      answers: this.testAnswers,
      risk_level: riskLevel,
      timestamp: new Date().toISOString()
    });
  }

  private analyzeRiskLevel(): 'low' | 'medium' | 'high' {
    const riskIndicators = this.testAnswers.filter(answer => 
      answer.toLowerCase().includes('sí') || 
      answer.toLowerCase().includes('miedo') ||
      answer.toLowerCase().includes('peligro')
    ).length;

    if (riskIndicators >= 3) return 'high';
    if (riskIndicators >= 1) return 'medium';
    return 'low';
  }

  private triggerEmergencyProtocol() {
    // Implementar lógica de emergencia
    console.warn('Emergency protocol triggered');
  }
}