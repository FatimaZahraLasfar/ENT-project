
import React from "react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Mail, FileText, Calendar, Wrench, Brain, LifeBuoy } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role;

  // Define dashboard cards
  const cards = [
    {
      id: "messagerie",
      title: "Messagerie",
      description: "Messagerie électronique des étudiants de l'université",
      icon: <Mail size={32} />,
      link: "/messagerie",
      roles: ["student", "teacher", "admin"],
    },
    {
      id: "notes",
      title: "Notes",
      description: "Consulter vos notes aux épreuves",
      icon: <FileText size={32} />,
      link: "/notes",
      roles: ["student", "teacher", "admin"],
    },
    {
      id: "calendrier",
      title: "Calendrier des examens",
      description: "Consulter votre calendrier aux examens",
      icon: <Calendar size={32} />,
      link: "/calendrier",
      roles: ["student", "teacher", "admin"],
    },
    {
      id: "demande",
      title: "Demande d'intervention",
      description: "Assistance aux utilisateurs de l'université",
      icon: <Wrench size={32} />,
      link: "/demande",
      roles: ["student", "teacher", "admin"],
    },
    {
      id: "cours",
      title: "Cours en ligne",
      description: "Accéder à la plateforme pédagogique de l'université",
      icon: <Brain size={32} />,
      link: "/cours",
      roles: ["student", "teacher", "admin"],
    },
    {
      id: "assistance",
      title: "Assistance ENT",
      description: "Faire aux questions sur votre Environnement Numérique de Travail",
      icon: <LifeBuoy size={32} />,
      link: "/assistance",
      roles: ["student", "teacher", "admin"],
    },
  ];

  // Filter cards based on user role
  const filteredCards = cards.filter((card) => card.roles.includes(role || ""));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((card) => (
          <DashboardCard
            key={card.id}
            title={card.title}
            description={card.description}
            icon={card.icon}
            link={card.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
