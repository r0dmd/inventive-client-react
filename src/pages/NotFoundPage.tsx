import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/index.js';

// ------------------------------------------
const NotFoundPage = () => {
  useDocumentTitle('Oops!');
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <main>
      <h2>Sorry!</h2>
      <p>The page you were trying to access was not found.</p>
      <button
        onClick={goHome}
        className='cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
      >
        Go back to the homepage
      </button>
    </main>
  );
};

export default NotFoundPage;
