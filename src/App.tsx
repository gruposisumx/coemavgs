import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { AuthCallback } from './pages/auth/AuthCallback';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { BlogPage } from './pages/Blog/BlogPage';
import { ResourcesPage } from './pages/Resources/ResourcesPage';
import { StaffDashboard } from './pages/Staff/StaffDashboard';
import { StaffLogin } from './pages/Staff/StaffLogin';
import { ResourcesManagement } from './pages/Staff/ResourcesManagement';
import { ProfessionalsPage } from './pages/Professionals/ProfessionalsPage';
import { AuthProvider } from './contexts/AuthContext';
import ChatbotIntegration from './components/ChatbotIntegration'; // Importación del nuevo componente

export function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/perfil" element={<ProfilePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/recursos" element={<ResourcesPage />} />
              <Route path="/staff" element={<StaffDashboard />} />
              <Route path="/staff/login" element={<StaffLogin />} />
              <Route path="/staff/resources" element={<ResourcesManagement />} />
              <Route path="/profesionales" element={<ProfessionalsPage />} />
            </Routes>
          </main>
          <Footer />
          <ChatbotIntegration /> {/* Sustitución del ChatWidget por el nuevo Chatbot */}
        </div>
      </Router>
    </AuthProvider>
  );
}
