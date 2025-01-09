import React, { useEffect } from 'react';

const ChatbotIntegration = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://bots.easy-peasy.ai/bot/54229d4e-1440-4c42-805f-ad39b1b2e1a8';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="chatbot-container"></div>;
};

export default ChatbotIntegration;
 