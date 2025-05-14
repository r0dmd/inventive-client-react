import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTogglePasswordVisibility } from '../hooks';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const { VITE_API_URL } = import.meta.env;
// ----------------

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isVisible, toggleVisibility } = useTogglePasswordVisibility();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${VITE_API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const body = await res.json();

      if (body.status === 'error') {
        throw new Error(body.message);
      }

      toast.success('Account created successfully. Please log in.');
      navigate('/login');
    } catch (err) {
      toast.error(err.message || 'Failed to create account');
    }
  };

  return (
    <main className='flex items-center justify-center min-h-screen bg-primary'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded shadow-md space-y-4 w-full max-w-md'
      >
        <h2 className='text-2xl font-bold mb-4'>Register Form</h2>

        <input
          type='text'
          placeholder='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className='w-full p-2 border rounded'
        />

                <div className="flex flex-col space-y-2 relative">
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <input
            id="password"
            type={isVisible ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded pr-10"
          />
          <span
            onClick={toggleVisibility}
            className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
          >
            {isVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>


        <button
          type='submit'
          className='w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded'
        >
          Create Account
        </button>

        <p className='text-center text-sm'>
          Already have an account with us?{' '}
          <Link to='/login' className='text-blue-600 hover:underline'>
            Login here!
          </Link>
        </p>
      </form>
    </main>
  );
};

export default RegisterPage;
