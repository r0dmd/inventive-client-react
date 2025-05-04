import { useState } from 'react'
import Header from './componentes/Header';
import './App.css'

function App() {
  return (
    <>
    <Header />
    <div className="bg-primary min-h-screen flex items-center justify-center bg-blue-50">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          Inventive
        </h1>
        <p className="text-black-500 font-bold p-4 rounded-lg">
          La app que te hace las facturas más fáciles con solo una foto.
          Ahora con Tailwind dejandolo bonito 
        </p>
      </div>
    </div>
    </>
  );
}

export default App;

