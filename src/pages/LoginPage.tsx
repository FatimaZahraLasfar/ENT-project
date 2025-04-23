import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, UserRole } from "@/context/AuthContext";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password
        }),
      });
  
      const data = await response.json();
      
      if (response.ok) {
        login({
          id: data.email, // or any unique ID
          name: data.name,
          email: data.email,
          role: data.role
        }, data.access_token);
        
        // Redirect based on role
        switch(data.role) {
          case 'admin': navigate('/admin'); break;
          case 'teacher': navigate('/'); break;
          default: navigate('/');
        }
      } else {
        toast.error(data.detail || "Login failed");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword); // Add this function for password visibility toggle

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Portail Éducatif</CardTitle>
          <CardDescription className="text-center">
            Connectez-vous pour accéder à votre espace personnel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  </span>
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-eduBlue hover:bg-eduBlue-dark" type="submit" onClick={handleLogin}>
            Se connecter
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
