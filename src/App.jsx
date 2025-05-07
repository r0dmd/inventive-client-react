

// Hooks
import { Routes, Route } from 'react-router-dom';

// Páginas
/* import {
  HomePage,
  AboutPage,
  AllUsersPage,
  LoginPage,
  NotFoundPage,
  PrivacyPolicyPage,
  ProfilePage,
  RegisterPage,
} from './pages/index.js'; */

import HomePage from './pages/Home.jsx';
import LoginPage from './pages/LoginPage.jsx';



// Componentes
import { Header, Footer } from './components/index.js';


// Otras funciones
import { Toaster } from 'react-hot-toast';

// ------------------------------------------
// Componente principal de la aplicación, actúa como base de la estructura visual. También configura elementos globales como notificaciones, contextos compartidos, y el enrutamiento principal
function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-primary">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Agregarás más rutas aquí más adelante */}
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}

export default App;

