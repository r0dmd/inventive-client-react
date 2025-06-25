import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const { VITE_APP_NAME } = import.meta.env;

const Header = () => {
  const { authUser, authLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    authLogout();
    navigate('/'); 
  };

  return (
    <header className="mr-3 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-white">{VITE_APP_NAME}</h1>
      <nav>
        <ul className="flex gap-4 text-gray-700">
          <li>
            <NavLink
  to="/"
  className={({ isActive }) =>
    `hover:text-orange-400 hover:bg-gradient-to-br hover:from-black hover:via-gray-900 hover:to-gray-800 px-2 py-1 rounded ${
      isActive ? 'font-bold text-white' : 'text-white'
    }`
  }
>
  Home
</NavLink>
          </li>

          {!authUser && (
            <>
              <li>
                <NavLink
                  to="/?mode=register"
                  className={({ isActive }) =>
                    `hover:text-orange-400 hover:bg-gradient-to-br hover:from-black hover:via-gray-900 hover:to-gray-800 px-2 py-1 rounded ${
                      isActive ? 'font-bold text-white' : 'text-white'
                    }`
                  }
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/?mode=login"
                  className={({ isActive }) =>
                    `hover:text-orange-400 hover:bg-gradient-to-br hover:from-black hover:via-gray-900 hover:to-gray-800 px-2 py-1 rounded ${
                      isActive ? 'font-bold text-white' : 'text-white'
                    }`
                  }
                >
                  Login
                </NavLink>
              </li>
            </>
          )}

          {authUser && (
            <>
              {/* <li className="text-white font-medium">
                <span className="text-orange-400">{authUser.username}</span>
              </li> */}

              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `hover:text-orange-400 hover:bg-gradient-to-br hover:from-black hover:via-gray-900 hover:to-gray-800 px-2 py-1 rounded ${
                      isActive ? 'font-bold text-orange-400' : 'text-white'
                    }`
                  }
                >
                  Profile
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/inventories"
                  className={({ isActive }) =>
                    `hover:text-orange-400 hover:bg-gradient-to-br hover:from-black hover:via-gray-900 hover:to-gray-800 px-2 py-1 rounded ${
                      isActive ? 'font-bold text-orange-400' : 'text-white'
                    }`
                  }
                >
                  My inventories
                </NavLink>
              </li>

              {authUser.role === 'admin' && (
                <li>
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      `text-white hover:text-blue-500 ${isActive ? 'font-bold' : ''}`
                    }
                  >
                    User management
                  </NavLink>
                </li>
              )}

              <li>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-orange-400 font-semibold"
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
