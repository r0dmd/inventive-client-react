import { useNavigate } from 'react-router-dom';
import { PlusCircleIcon, FolderOpenIcon } from '@heroicons/react/24/solid';

const LoggedInHome = ({ authUser, authLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">
      <div className="text-center mb-14">
        <h1 className="text-5xl font-extrabold mb-6drop-shadow-lg">
          Welcome to Inventive <span className=' text-orange-400'> {authUser.username}</span> !
        </h1>
        <p className="text-lg p-1.5 text-gray-300 max-w-xl mx-auto">
           Organise your bills and inventories with ease.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12 mb-16">
        {/* Crear Inventario */}
        <div
          onClick={() => navigate('/create-inventory')}
          className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 p-10 rounded-2xl shadow-lg flex flex-col items-center justify-center cursor-pointer hover:scale-105 hover:bg-opacity-20 transition-all duration-300"
        >
          <PlusCircleIcon className="h-24 w-24 text-orange-400 mb-6 drop-shadow" />
          <p className="text-2xl text-black font-semibold">Create New Inventory</p>
        </div>

        {/* Ver Inventarios */}
        <div
          onClick={() => navigate('/inventories')}
          className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 p-10 rounded-2xl shadow-lg flex flex-col items-center justify-center cursor-pointer hover:scale-105 hover:bg-opacity-20 transition-all duration-300"
        >
          <FolderOpenIcon className="h-24 w-24 text-orange-400 mb-6 drop-shadow" />
          <p className="text-2xl text-black font-semibold">Your Inventories</p>
        </div>
      </div>

  
    </div>
  );
};

export default LoggedInHome;
