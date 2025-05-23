import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { Header, Footer } from './components/index.js';
import {
  HomePage,
  //AboutPage,
  //AllUsersPage,
  LoginPage,
  NotFoundPage,
  //PrivacyPolicyPage,
  ProfilePage,
  RegisterPage,
} from './pages/index.js';

// ------------------------------------------
// Componente principal de la aplicación, actúa como base de la estructura visual. También configura elementos globales como notificaciones, contextos compartidos, y el enrutamiento principal
function App() {
  return (
    <>
      <Header />
      <main className='min-h-screen bg-primary'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='*' element={<NotFoundPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position='top-center' />
    </>
  );
}

export default App;
