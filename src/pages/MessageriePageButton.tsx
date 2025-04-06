
import React from "react";
import { ArrowRight, Search, Laptop } from "lucide-react"; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MessageriePageButton: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Centre de Messagerie</h1>
      
      <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
        <Card className="w-full">
          <CardHeader className="bg-eduBlue text-white">
            <CardTitle className="text-xl">Bienvenue</CardTitle>
            <CardDescription className="text-white opacity-90">
              Nous sommes là pour vous aider
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Lancer une conversation</h3>
            <Button 
              onClick={() => navigate("/messagerie/conversation")}
              className="w-full bg-eduBlue hover:bg-eduBlue-dark flex items-center justify-between p-4"
            >
              <ArrowRight className="mr-2" /> 
              <span>Envoyez-nous un message</span>
              <span></span>
            </Button>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Que recherchez-vous ?</h3>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Rechercher un sujet..." 
                className="pl-10 py-6" 
              />
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Parcourez cette page avec nous</h3>
            <Button 
              onClick={() => navigate("/messagerie/co-navigation")}
              className="bg-eduBlue hover:bg-eduBlue-dark flex items-center"
            >
              <Laptop className="mr-2" /> 
              <span>Rejoindre la co-navigation</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MessageriePageButton;
