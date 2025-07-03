import { useId, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../hooks/index.js";
import { useAuth } from "../context/useAuth.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTogglePasswordVisibility } from "../hooks";

import { toast } from "sonner";

const { VITE_API_URL } = import.meta.env;

// ------------------------------------------
const LoginPage = () => {
	useDocumentTitle("Login");

	const { authLogin } = useAuth();
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { isVisible, toggleVisibility } = useTogglePasswordVisibility();
	const passwordId = useId();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const res = await fetch(`${VITE_API_URL}/users/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			const body = await res.json();
			console.log(body);

			if (body.status === "error") {
				throw new Error(body.message);
			}

			authLogin(body.data.token);
			toast.success("Sesión iniciada correctamente");
			navigate("/");
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Ocurrió un error inesperado";
			toast.error(errorMessage);
		}
	};

	return (
		<main className="flex items-center justify-center  ">
			<form
				onSubmit={handleSubmit}
				className="bg-black/50 p-8 rounded shadow-md space-y-4 w-full max-w-md"
			>
				<h2 className="text-4xl text-center font-bold mb-4">Login</h2>

				<div className="flex flex-col space-y-2 relative">
					<label htmlFor="username" className="text-m font-medium">
						Username
					</label>

					<input
						type="text"
						placeholder="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						className="w-full p-2 border rounded"
					/>

					<div className="flex flex-col space-y-2 relative">
						<label htmlFor="password" className="text-m font-medium">
							Password
						</label>
						<input
							id={passwordId}
							type={isVisible ? "text" : "password"}
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full p-2 border rounded pr-10"
						/>
						<button
							type="button"
							onClick={toggleVisibility}
							className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
						>
							{isVisible ? <FaEyeSlash /> : <FaEye />}
						</button>
					</div>
				</div>

				<button
					type="submit"
					className="w-full bg-orange-500 hover:bg-orange-700 text-white p-2 rounded"
				>
					Log In
				</button>
			</form>
		</main>
	);
};

export default LoginPage;
