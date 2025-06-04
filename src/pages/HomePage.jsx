import { useContext } from 'react';
import AuthContext from '../context/AuthContext.js';
import { useDocumentTitle } from '../hooks/index.js';

// ------------------------------------------
const HomePage = () => {
  useDocumentTitle('Home');

  const { authUser, authLogout, authUserLoading } = useContext(AuthContext);

  if (authUserLoading) return <p className="p-4">Loading User...</p>;

  return (
    <div className="p-4">
      {authUser ? (
        <>
          <p className="text-xl mb-4">WELCOME to Inventive, {authUser.name}!</p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={authLogout}
          >
            sign out
          </button>
        </>
      ) : (
        <p className="text-lg">You are no logged in.</p>
      )}
    </div>
  );
};

export default HomePage;
