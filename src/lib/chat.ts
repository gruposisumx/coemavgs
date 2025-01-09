import { supabase } from './supabase';

interface ChatResponse {
  message: string;
  needsEmergencyHelp?: boolean;
}

export async function getChatResponse(message: string, userId?: string): Promise<ChatResponse> {
  try {
    // Guardar el mensaje del usuario
    const { error: saveError } = await supabase
      .from('chat_messages')
      .insert({
        user_id: userId,
        content: message,
        sender: 'user'
      });

    if (saveError) throw saveError;

    // Analizar el mensaje para determinar la respuesta
    const response = await generateResponse(message);

    // Guardar la respuesta del bot
    const { error: responseSaveError } = await supabase
      .from('chat_messages')
      .insert({
        user_id: userId,
        content: response.message,
        sender: 'ai',
        is_emergency: response.needsEmergencyHelp
      });

    if (responseSaveError) throw responseSaveError;

    return response;
  } catch (error) {
    console.error('Error en el chat:', error);
    return {
      message: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.',
      needsEmergencyHelp: false
    };
  }
}

async function generateResponse(message: string): Promise<ChatResponse> {
  // Palabras clave que indican emergencia
  const emergencyKeywords = [
    'suicid', 'matar', 'morir', 'golpe', 'violencia', 'emergencia', 'ayuda',
    'peligro', 'amenaza', 'miedo', 'auxilio', 'socorro'
  ];

  const isEmergency = emergencyKeywords.some(keyword => 
    message.toLowerCase().includes(keyword)
  );

  if (isEmergency) {
    return {
      message: `Me preocupa lo que me cuentas. Por favor, contacta inmediatamente a nuestra línea de emergencia al 800-123-4567 o al 911. Estamos aquí para ayudarte y hay personas que pueden brindarte apoyo inmediato.`,
      needsEmergencyHelp: true
    };
  }

  // Respuestas predefinidas basadas en palabras clave
  const responses = [
    {
      keywords: ['triste', 'deprimida', 'sola'],
      response: 'Entiendo que te sientas así. Es normal tener momentos difíciles. ¿Te gustaría hablar más sobre lo que te está pasando? Estoy aquí para escucharte.'
    },
    {
      keywords: ['ansiedad', 'nerviosa', 'preocupada'],
      response: 'La ansiedad puede ser muy difícil de manejar. ¿Has intentado algunas técnicas de respiración? Podemos explorar juntas algunas estrategias que te ayuden a sentirte mejor.'
    },
    {
      keywords: ['ayuda', 'consejo', 'apoyo'],
      response: 'Me alegra que busques apoyo. ¿Podrías contarme más sobre la situación? Así podré orientarte mejor sobre los recursos y ayuda disponibles.'
    }
  ];

  // Buscar una respuesta apropiada
  for (const { keywords, response } of responses) {
    if (keywords.some(keyword => message.toLowerCase().includes(keyword))) {
      return { message: response };
    }
  }

  // Respuesta por defecto
  return {
    message: 'Gracias por compartir eso conmigo. ¿Podrías contarme más al respecto? Estoy aquí para escucharte y apoyarte.'
  };
}