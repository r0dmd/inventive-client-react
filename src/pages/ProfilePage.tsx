import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FaEye, FaEyeSlash, FaUserEdit, FaKey } from "react-icons/fa";
import { useTogglePasswordVisibility } from "../hooks";
import { useAuth } from "../context/useAuth";

const { VITE_API_URL } = import.meta.env;

type VisibilityHook = {
	isVisible: boolean;
	toggleVisibility: () => void;
};

const ProfilePage = () => {
	const { authUser, authToken, authUpdateUserState } = useAuth();
	const navigate = useNavigate();

	const [username, setUsername] = useState(authUser?.username || "");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");

	const currentPassToggle = useTogglePasswordVisibility();
	const newPassToggle = useTogglePasswordVisibility();
	const confirmPassToggle = useTogglePasswordVisibility();

	useEffect(() => {
		if (!authToken) {
			toast.error("You must be logged in to access this page.");
			navigate("/");
		}
	}, [authToken, navigate]);

	if (!authToken) return null;

	const handleUsernameSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (username === authUser?.username) {
			toast("No changes detected.");
			return;
		}

		if (!window.confirm("Are you sure you want to update your username?")) return;

		try {
			const res = await fetch(`${VITE_API_URL}/users/profile`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: authToken,
				},
				body: JSON.stringify({ newUsername: username }),
			});

			const body = await res.json();

			if (body.status === "error") throw new Error(body.message);

			toast.success("Username updated successfully.");
			authUpdateUserState({ username });
		} catch (err: unknown) {
			if (err instanceof Error) toast.error(err.message);
		}
	};

	const handlePasswordChange = async (e: FormEvent) => {
		e.preventDefault();

		if (newPassword !== confirmNewPassword) {
			toast.error("New passwords do not match.");
			return;
		}

		try {
			const res = await fetch(`${VITE_API_URL}/users/profile/password`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: authToken,
				},
				body: JSON.stringify({
					oldPass: currentPassword,
					newPass: newPassword,
				}),
			});

			const body = await res.json();

			if (body.status === "error") throw new Error(body.message);

			toast.success("Password updated successfully.");
			setCurrentPassword("");
			setNewPassword("");
			setConfirmNewPassword("");
		} catch (err: unknown) {
			if (err instanceof Error) toast.error(err.message);
		}
	};

	const renderPasswordField = (
		label: string,
		value: string,
		setValue: React.Dispatch<React.SetStateAction<string>>,
		visibilityHook: VisibilityHook,
		id: string,
	) => (
		<div className="flex flex-col space-y-2 relative">
			<label htmlFor={id} className="text-sm font-medium text-gray-100">
				{label}
			</label>
			<input
				id={id}
				type={visibilityHook.isVisible ? "text" : "password"}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				required
				className="w-full p-3 border border-gray-300 rounded-xl pr-10 focus:outline-none focus:ring-2 focus:ring-orange-400"
			/>
			<button
				type="button"
				aria-label="Toggle password visibility"
				onClick={visibilityHook.toggleVisibility}
				className="absolute right-3 top-10 text-gray-600"
			>
				{visibilityHook.isVisible ? <FaEyeSlash /> : <FaEye />}
			</button>
		</div>
	);

	return (
		<main className="min-h-screen text-white bg-primary flex flex-col items-center justify-center p-6">
			<h1 className="text-3xl font-bold mb-8">
				Welcome,  <span className="text-orange-400">{authUser?.username}</span> !
			</h1>
			<p className="text-lg text-gray-200 mb-6">
				Here you can change your Username and modify your password.
			</p>

			<div className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-xl space-y-10 w-full max-w-md">
			<h2 className="text-2xl font-semibold text-black text-center flex items-center justify-center gap-2"> <FaUserEdit />
  Update Username
</h2>


				<form onSubmit={handleUsernameSubmit} className="space-y-4">
					<input
						type="text"
						placeholder="New username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						className="w-full p-3 border text-gray-100 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
					/>
					<button
						type="submit"
						className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl font-medium shadow-md hover:shadow-lg transition"
					>
						Update Username
					</button>
		
				<h2 className="text-2xl font-semibold text-black text-center flex items-center justify-center gap-2">
  <FaKey />Change Password 
</h2>


					{renderPasswordField(
						"Current Password",
						currentPassword,
						setCurrentPassword,
						currentPassToggle,
						"currentPassword",
					)}
					{renderPasswordField(
						"New Password",
						newPassword,
						setNewPassword,
						newPassToggle,
						"newPassword",
					)}
					{renderPasswordField(
						"Confirm New Password",
						confirmNewPassword,
						setConfirmNewPassword,
						confirmPassToggle,
						"confirmNewPassword",
					)}

					<button
						type="submit"
						className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl font-medium shadow-md hover:shadow-lg transition"
					>
						Update Password
					</button>
				</form>
			</div>
		</main>
	);
};

export default ProfilePage;
