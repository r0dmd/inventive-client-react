import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useTogglePasswordVisibility } from '../hooks';

const { VITE_API_URL } = import.meta.env;

// ---------------------------------------------- 

const ProfilePage = () => {
  const { authUser, authToken, authUpdateUserState } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState(authUser?.username || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Hooks para cada campo de contraseña
  const currentPassToggle = useTogglePasswordVisibility();
  const newPassToggle = useTogglePasswordVisibility();
  const confirmPassToggle = useTogglePasswordVisibility();

  useEffect(() => {
    if (!authToken) {
      toast.error('You must be logged in to access this page.');
      navigate('/');
    }
  }, [authToken, navigate]);

  if (!authToken) return null;

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();

    if (username === authUser.username) {
      toast('No changes detected.');
      return;
    }

    if (!window.confirm('Are you sure you want to update your username?')) return;

    try {
      const res = await fetch(`${VITE_API_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authToken,
        },
        body: JSON.stringify({ newUsername: username }),
      });

      const body = await res.json();

      if (body.status === 'error') throw new Error(body.message);

      toast.success('Username updated successfully.');
      authUpdateUserState({ username });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error('New passwords do not match.');
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
          oldPass: currentPassword,
          newPass: newPassword,
        }),
      });

      const body = await res.json();

      if (body.status === 'error') throw new Error(body.message);

      toast.success('Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const renderPasswordField = (label, value, setValue, visibilityHook, id) => (
    <div className="flex flex-col space-y-2 relative">
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      <input
        id={id}
        type={visibilityHook.isVisible ? 'text' : 'password'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        className="w-full p-2 border rounded pr-10"
      />
      <span
        onClick={visibilityHook.toggleVisibility}
        className="absolute right-3 top-9 cursor-pointer text-gray-600"
      >
        {visibilityHook.isVisible ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
  );

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

        {renderPasswordField('Current Password', currentPassword, setCurrentPassword, currentPassToggle, 'currentPassword')}
        {renderPasswordField('New Password', newPassword, setNewPassword, newPassToggle, 'newPassword')}
        {renderPasswordField('Confirm New Password', confirmNewPassword, setConfirmNewPassword, confirmPassToggle, 'confirmNewPassword')}

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