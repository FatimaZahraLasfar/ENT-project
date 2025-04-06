
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  sender: "user" | "system";
  timestamp: Date;
}

const MessagerieConversation: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Bonjour! Comment puis-je vous aider aujourd'hui?",
      sender: "system",
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessageId = `msg-${Date.now()}`;
    const userMessage: Message = {
      id: userMessageId,
      text: newMessage,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    
    // Simulate response after a delay
    setTimeout(() => {
      const systemMessage: Message = {
        id: `resp-${Date.now()}`,
        text: "Merci pour votre message. Un conseiller va vous répondre dès que possible.",
        sender: "system",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, systemMessage]);
      toast("Nouvelle réponse reçue");
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Conversation</h1>
      
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="bg-eduBlue text-white">
          <CardTitle>Centre d'assistance</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[400px] overflow-y-auto p-4 flex flex-col gap-4">
            {messages.map(message => (
              <div 
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user" 
                      ? "bg-eduBlue text-white" 
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p>{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSendMessage} className="border-t p-4 flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Écrivez votre message ici..."
              className="flex-grow"
            />
            <Button type="submit" className="bg-eduBlue hover:bg-eduBlue-dark">
              <Send size={18} />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagerieConversation;
