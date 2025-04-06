
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { toast } from "sonner";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: "Accueil", path: "/" },
    { name: "Inscriptions", path: "/inscriptions" },
    { name: "Scolarité et examens", path: "/scolarite" },
    { name: "Outils pédagogiques", path: "/outils-pedagogiques" },
    { name: "Outils collaboratifs", path: "/outils-collaboratifs" },
    { name: "Assistance", path: "/assistance" },
  ];

  const handleLogout = () => {
    logout();
    toast.success("Déconnexion réussie");
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center mr-4 text-sm text-gray-600">
                <User size={16} className="mr-1" />
                <span>{user.name}</span>
                <span className="ml-2 px-2 py-0.5 rounded-full bg-eduBlue text-white text-xs">
                  {user.role === "student" ? "Étudiant" : user.role === "teacher" ? "Enseignant" : "Admin"}
                </span>
              </div>
            )}
          </div>

          {user && (
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut size={16} className="mr-1" />
              Déconnexion
            </Button>
          )}
        </div>
      </div>

      <div className="bg-eduBlue">
        <div className="container mx-auto">
          <nav className="flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-3 text-white hover:bg-eduBlue-dark transition-colors ${
                  location.pathname === item.path ? "bg-eduBlue-dark font-medium" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
