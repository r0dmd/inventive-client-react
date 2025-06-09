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
     <div className="w-1/2 bg-[url('/recibo.jpg')] bg-cover bg-center relative">
  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <h2 className="text-white text-3xl font-bold text-center px-4">
     Welcome to <span className="text-white-400">Inventive</span>
    </h2>
  </div>
</div>

      )}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
        
     
        </div>
      </div>
    </div>
  
      )}

export default HomePage;


