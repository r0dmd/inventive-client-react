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
      <div className='bg-primary min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-5xl font-bold text-white mb-4'>Inventive</h1>
          <p className='text-black-500 font-bold p-4 rounded-lg'>
            La app que te hace las facturas más fáciles con solo una foto. Ahora
            con Tailwind dejandolo bonito
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
