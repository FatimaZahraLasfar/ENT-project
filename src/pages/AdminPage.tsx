
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertCircle, UserPlus, Users } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock data for users
const mockUsers = [
  { id: 1, name: "Jean Dupont", email: "jean@example.com", role: "student" },
  { id: 2, name: "Marie Curie", email: "marie@example.com", role: "teacher" },
  { id: 3, name: "Pierre Durand", email: "pierre@example.com", role: "student" },
  { id: 4, name: "Sophie Martin", email: "sophie@example.com", role: "teacher" },
];

const AdminPage: React.FC = () => {
  const { user } = useAuth();

  if (user?.role !== "admin") {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Accès refusé</AlertTitle>
          <AlertDescription>
            Vous n'avez pas les autorisations nécessaires pour accéder à cette page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Administration</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Utilisateurs</CardTitle>
            <CardDescription>Gestion des utilisateurs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">{mockUsers.length}</span>
              <Button variant="outline" size="sm">
                <Users size={16} className="mr-2" />
                Gérer
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Cours</CardTitle>
            <CardDescription>Gestion des ressources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">12</span>
              <Button variant="outline" size="sm" onClick={() => toast.success("Fonctionnalité à venir")}>
                Gérer
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Demandes</CardTitle>
            <CardDescription>Demandes en attente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">3</span>
              <Button variant="outline" size="sm" onClick={() => toast.success("Fonctionnalité à venir")}>
                Traiter
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Liste des utilisateurs</CardTitle>
          <CardDescription>Gérez les utilisateurs de la plateforme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 bg-muted p-4 font-medium">
              <div className="col-span-1">#</div>
              <div className="col-span-4">Nom</div>
              <div className="col-span-4">Email</div>
              <div className="col-span-2">Rôle</div>
              <div className="col-span-1">Action</div>
            </div>
            {mockUsers.map((user) => (
              <div key={user.id} className="grid grid-cols-12 p-4 items-center border-t">
                <div className="col-span-1">{user.id}</div>
                <div className="col-span-4">{user.name}</div>
                <div className="col-span-4">{user.email}</div>
                <div className="col-span-2 capitalize">{user.role}</div>
                <div className="col-span-1">
                  <Button variant="ghost" size="sm" onClick={() => toast.success(`Modification de ${user.name}`)}>
                    Éditer
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button onClick={() => toast.success("Ajout d'utilisateur à venir")}>
              <UserPlus size={16} className="mr-2" />
              Ajouter un utilisateur
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
