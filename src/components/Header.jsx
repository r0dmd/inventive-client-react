import { NavLink } from 'react-router-dom';

const { VITE_APP_NAME } = import.meta.env;

// ------------------------------------------
const Header = () => {
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
