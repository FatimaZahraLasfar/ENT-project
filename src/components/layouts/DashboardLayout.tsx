
import React from "react";
import Navbar from "../navigation/Navbar";
import { useAuth } from "@/context/AuthContext";
import LoginPage from "@/pages/LoginPage";
import { Toaster } from "@/components/ui/sonner";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      <Toaster />
    </div>
  );
};

export default DashboardLayout;
