import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';

// Estilos
import './styles/index.css';

// ------------------------------------------
// Punto de entrada principal de la aplicación. Se encarga de montar el árbol de componentes de React en el DOM. Incluye configuraciones globales como el modo estricto de React y enlaza el componente principal `App` al elemento raíz del HTML
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
