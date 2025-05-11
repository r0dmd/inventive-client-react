import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import toast from 'react-hot-toast';


// ------------------------------------------ //

const { VITE_API_URL } = import.meta.env;

const ProfilePage = () => {


    const { user, authToken } = useContext(AuthContext);
    const navigate = useNavigate();

    // check if the user has valid token, if not we direct him to the main no logged in page
     useEffect(() => {
    if (!authToken) {
      toast.error('You must be logged in to access the profile');
      navigate('/login');
    }
    if (!authToken) return null;
    
  }, [authToken, navigate]);

    


  const [username, setUsername] = useState(user?.username || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // form to change the username
  const handleUsernameSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${VITE_API_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authToken,
        },
        body: JSON.stringify({ username }),
      });

      const body = await res.json();

      if (body.status === 'error') {
        throw new Error(body.message);
      }

      toast.success('Username updated successfully');
    } catch (err) {
      toast.error(err.message);
    }
  };

  // form to change the password
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      const res = await fetch(`${VITE_API_URL}/users/profile/password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authToken,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const body = await res.json();

      if (body.status === 'error') {
        throw new Error(body.message);
      }

      toast.success('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <main className="min-h-screen bg-primary flex flex-col items-center justify-center p-6">
      <form
        onSubmit={handleUsernameSubmit}
        className="bg-white p-6 rounded shadow-md space-y-4 w-full max-w-md"
      >
        <h2 className="text-xl font-semibold">Update Username</h2>

        <input
          type="text"
          placeholder="New username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          Update Username
        </button>
      </form>

      <form
        onSubmit={handlePasswordChange}
        className="bg-white p-6 rounded shadow-md space-y-4 w-full max-w-md mt-6"
      >
        <h2 className="text-xl font-semibold">Change Password</h2>

        <input
          type="password"
          placeholder="Current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded"
        >
          Update Password
        </button>
      </form>
    </main>
  );
};

export default ProfilePage;
