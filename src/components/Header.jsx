import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const { VITE_APP_NAME } = import.meta.env;

// ------------------------------------------
const Header = () => {
  const { authUser, authLogout } = useContext(AuthContext);
  const navigate = useNavigate(); 

  return (
    <header className='bg-stone-700 py-4 px-6 flex items-center justify-between mb-4'>
      <h1 className='text-2xl font-bold text-white'>{VITE_APP_NAME}</h1>
      <nav>
        <ul className='flex gap-4 text-gray-700'>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) =>
                `text-white hover:text-blue-500 ${isActive ? 'font-bold' : ''}`
              }
            >
              Home
            </NavLink>
          </li>

          {!authUser && (
            <>
              <li>
                <NavLink
                  to='/register'
                  className={({ isActive }) =>
                    `text-white hover:text-blue-500 ${isActive ? 'font-bold' : ''}`
                  }
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/login'
                  className={({ isActive }) =>
                    `text-white hover:text-blue-500 ${isActive ? 'font-bold' : ''}`
                  }
                >
                  Login
                </NavLink>
              </li>
            </>
          )}

          {authUser && (
            <>
              <li>
                <NavLink
                  to='/profile'
                  className={({ isActive }) =>
                    `text-white hover:text-blue-500 ${isActive ? 'font-bold' : ''}`
                  }
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <button
                  onClick={() => {
                    authLogout(); 
                    navigate('/'); 
                  }}
                  className='text-white hover:text-red-500 font-semibold'
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
