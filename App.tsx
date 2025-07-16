import React, { useState, useEffect, useCallback } from 'react';
import type { Chat, Part } from '@google/genai';
import { Sender, ChatMessage, AIPersonality, PERSONALITIES } from './types';
import { startChat, generateImage as generateGeminiImage, searchWeb, generateWebCodeWithImages, enhancedDeveloperResponse } from './services/ConversacionService';
import Header from './components/Header';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chat, setChat] = useState<Chat | null>(null); // Gemini-specific chat session
  const [error, setError] = useState<string | null>(null);
  const [personality, setPersonality] = useState<AIPersonality>('flash');

  const initializeChat = useCallback((selectedPersonality: AIPersonality) => {
    setError(null);
    const config = PERSONALITIES[selectedPersonality];

    // Reset messages with the welcome message for the new personality
    const welcomeMessage = {
      id: 'initial-message',
      sender: Sender.AI,
      text: config.welcomeMessage,
    };

    if (config.provider === 'google' && config.type === 'chat') {
        setIsLoading(true);
        try {
          const chatSession = startChat(config.systemInstruction, config.model);
          setChat(chatSession);
          setMessages([welcomeMessage]);
        } catch (e: unknown) {
            handleApiError(e, 'An unknown error occurred during initialization.');
            setMessages([]);
        } finally {
            setIsLoading(false);
        }
    } else {
        // For 'image' type or OpenAI, reset Gemini chat and set welcome message
        setChat(null);
        setMessages([welcomeMessage]);
    }
  }, []);
  
  const handleApiError = (e: unknown, defaultMessage: string) => {
    let errorMessage = defaultMessage;
    if (e instanceof Error) {
        errorMessage = e.message;
    }
    console.error(e);
    setError(errorMessage);
  };

  useEffect(() => {
    initializeChat(personality);
  }, [initializeChat, personality]);

  const handlePersonalityChange = (newPersonality: AIPersonality) => {
    if (newPersonality !== personality) {
      setPersonality(newPersonality);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
    });
  };

  const handleSendMessage = useCallback(async (text: string, file?: File) => {
    const currentConfig = PERSONALITIES[personality];
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: Sender.User,
      text,
      fileInfo: file ? { name: file.name, type: file.type, size: file.size } : undefined,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);
    setError(null);

    const aiMessageId = (Date.now() + 1).toString();

    try {
      // Add placeholder for AI response
      setMessages((prev) => [
        ...prev,
        { id: aiMessageId, sender: Sender.AI, text: '' },
      ]);

      if (currentConfig.provider === 'google') {
        if (currentConfig.type === 'image') {
          if (!text) throw new Error("Por favor, proporciona una descripción para generar la imagen.");
          const base64Image = await generateGeminiImage(text);
          setMessages((prev) => prev.map(msg => msg.id === aiMessageId ? { ...msg, imageUrl: base64Image, text: 'Aquí tienes la imagen que he generado:' } : msg));
        } else { // 'chat' type
          if (text.toLowerCase().includes("busca en internet") || text.toLowerCase().includes("search for")) {
            const query = text.toLowerCase().replace("busca en internet", "").replace("search for", "").trim();
            let searchResponseText = "";
            if (query) {
              const searchResults = await searchWeb(query);
              searchResponseText = `Aquí tienes lo que encontré en internet para "${query}":\n\n${searchResults}`;
            } else {
              searchResponseText = "Por favor, especifica qué quieres que busque en internet.";
            }
            setMessages((prev) => prev.map((msg) => msg.id === aiMessageId ? { ...msg, text: searchResponseText } : msg));
          } else if (text.toLowerCase().includes("crear") && (text.toLowerCase().includes("web") || text.toLowerCase().includes("página") || text.toLowerCase().includes("sitio"))) {
            // Detectar solicitudes de creación de webs
            const webCode = await generateWebCodeWithImages(text);
            const responseText = `¡Perfecto! He creado una página web para ti con imágenes automáticamente descargadas de internet. Aquí está el código completo:\n\n\`\`\`html\n${webCode}\n\`\`\`\n\nEste código incluye:\n- Diseño responsive para móvil y PC\n- Imágenes automáticamente buscadas y descargadas\n- Animaciones y efectos visuales\n- Estilos modernos con gradientes\n\n¡Puedes copiar y pegar este código en un archivo .html para verlo en acción!`;
            setMessages((prev) => prev.map((msg) => msg.id === aiMessageId ? { ...msg, text: responseText } : msg));
          } else { // 'chat' type
            if (!chat) throw new Error("El chat no está inicializado. Por favor, recarga la página.");
            
            // Usar respuesta mejorada para el modelo desarrollador
            if (personality === 'developer') {
              const enhancedResponse = await enhancedDeveloperResponse(text, chat);
              setMessages((prev) => prev.map((msg) => msg.id === aiMessageId ? { ...msg, text: enhancedResponse } : msg));
            } else {
              // Respuesta normal para otros modelos
              const parts: Part[] = [{ text }];
              if (file) {
                  if (file.size > 120 * 1024 * 1024) throw new Error("El archivo es demasiado grande. El límite es 120 MB.");
                  const base64Data = await fileToBase64(file);
                  parts.push({ inlineData: { data: base64Data, mimeType: file.type } });
              }

              const stream = await chat.sendMessageStream({ message: parts });
              let aiResponseTextStream = "";
              for await (const chunk of stream) {
                  aiResponseTextStream += chunk.text;
                  setMessages((prev) => prev.map((msg) => msg.id === aiMessageId ? { ...msg, text: aiResponseTextStream } : msg));
              }
            }
          }
        }
      } else { // 'chat' type
        // This else block was previously for OpenAI, now it will just be a fallback or error
        throw new Error("Proveedor de IA no soportado o tipo de modelo incorrecto.");
      }
    } catch (e) {
        handleApiError(e, 'Ocurrió un error al obtener la respuesta.');
        setMessages((prev) => {
            const filtered = prev.filter(msg => msg.id !== aiMessageId);
            return [
                ...filtered,
                { id: (Date.now() + 2).toString(), sender: Sender.AI, text: 'Lo siento, algo salió mal. Por favor, inténtalo de nuevo.' },
            ];
        });
    } finally {
      setIsLoading(false);
    }
  }, [chat, personality, messages]);

  return (
    <div className="flex flex-col h-screen bg-zinc-900 text-black font-sans">
      <Header 
        currentPersonality={personality} 
        onPersonalityChange={handlePersonalityChange} 
        isLoading={isLoading} 
      />
      {error && (
        <div className="bg-red-900/50 border-t border-b border-red-600/30 text-red-100 p-3 text-center text-sm">
            <strong>Error:</strong> {error}
        </div>
      )}
      <MessageList messages={messages} isLoading={isLoading} />
      <ChatInput 
        onSendMessage={handleSendMessage} 
        isLoading={isLoading}
        isImageModel={PERSONALITIES[personality].type === 'image'}
      />
    </div>
  );
};

export default App;


