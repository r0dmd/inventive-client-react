import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/index.js';
import AuthContext from '../context/AuthContext.js';

import toast from 'react-hot-toast';

const { VITE_API_URL } = import.meta.env;

// ------------------------------------------
const LoginPage = () => {
  useDocumentTitle('Login');

  const { authLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${VITE_API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const body = await res.json();
      console.log(body);

      if (body.status === 'error') {
        throw new Error(body.message);
      }

      authLogin(body.data.token);
      toast.success('Sesión iniciada correctamente');
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <main className='flex items-center justify-center min-h-screen bg-primary'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded shadow-md space-y-4 w-full max-w-md'
      >
        <h2 className='text-2xl font-bold mb-4'>Iniciar sesión</h2>

        <input
          type='text'
          placeholder='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className='w-full p-2 border rounded'
        />

        <input
          type='password'
          placeholder='Contraseña'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='w-full p-2 border rounded'
        />

        <button
          type='submit'
          className='w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded'
        >
          Iniciar sesión
        </button>
      </form>
    </main>
  );
};

export default LoginPage;
