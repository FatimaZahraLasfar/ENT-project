
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import CoursPage from "./pages/CoursPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import MessageriePageButton from "./pages/MessageriePageButton";
import MessagerieConversation from "./pages/MessagerieConversation";
import MessageWidget from "./components/messaging/MessageWidget";
import ProtectedRoute from "./pages/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
            <Route path="/cours" element={<DashboardLayout><CoursPage /></DashboardLayout>} />
            <Route path="/admin" element={<DashboardLayout><AdminPage /></DashboardLayout>} />
            <Route path="/messagerie" element={<DashboardLayout><MessageriePageButton /></DashboardLayout>} />
            <Route path="/messagerie/conversation" element={<DashboardLayout><MessagerieConversation /></DashboardLayout>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
            <Route element={<ProtectedRoute allowedRoles={['admin', 'teacher', 'student']} />}>
            <Route path="/StudentDashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>}  /></Route>
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/AdminDashboard" element={<AdminPage />} /></Route>
            <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
            <Route path="/TeacherDashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} /></Route>
          </Routes>
          <MessageWidget />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
