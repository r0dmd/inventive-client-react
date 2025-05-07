import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

const { VITE_AUTH_TOKEN, VITE_API_URL } = import.meta.env;

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem(VITE_AUTH_TOKEN) || null
  );

  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem('AuthUser')) || null
  );

  const [authUserLoading, setAuthUserLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${VITE_API_URL}/users/profile`, {
          headers: {
            Authorization: authToken,
          },
        });

        const body = await res.json();

        if (body.status === 'error') {
          throw new Error(body.message);
        }

        setAuthUser(body.data.user);
        localStorage.setItem('AuthUser', JSON.stringify(body.data.user));
      } catch (err) {
        authLogout();
        toast.error(err.message);
      } finally {
        setAuthUserLoading(false);
      }
    };

    if (authToken) {
      fetchUser();
    } else {
      setAuthUser(null);
      setAuthUserLoading(false);
    }
  }, [authToken]);

  const authLogin = (token) => {
    setAuthToken(token);
    localStorage.setItem(VITE_AUTH_TOKEN, token);
  };

  const authLogout = () => {
    setAuthToken(null);
    setAuthUser(null);
    localStorage.removeItem(VITE_AUTH_TOKEN);
    localStorage.removeItem('AuthUser');
  };

  const authUpdateUserState = (userData) => {
    const updatedUser = {
      ...authUser,
      ...userData,
    };
    setAuthUser(updatedUser);
    localStorage.setItem('AuthUser', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        authLogin,
        authLogout,
        authUser,
        authUserLoading,
        authUpdateUserState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
