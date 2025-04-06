
import React from "react";
import { MessageCircle, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const MessageWidget: React.FC = () => {
  const navigate = useNavigate();

  const handleStartConversation = () => {
    navigate("/messagerie");
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button 
        onClick={handleStartConversation}
        className="h-14 w-14 rounded-full bg-eduBlue hover:bg-eduBlue-dark shadow-lg"
      >
        <MessageCircle size={24} />
      </Button>
    </div>
  );
};

export default MessageWidget;
