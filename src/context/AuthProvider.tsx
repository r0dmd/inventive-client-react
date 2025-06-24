import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import { toast } from "sonner";

const {
	VITE_AUTH_TOKEN,
	VITE_API_URL,
	/* VITE_API_UPLOADS */
} = import.meta.env;

// ------------------------------------------
export const AuthProvider = ({ children }) => {
	const [authUserLoading, setAuthUserLoading] = useState(true);

	const [authToken, setAuthToken] = useState(
		localStorage.getItem(VITE_AUTH_TOKEN) || null,
	);

	const [authUser, setAuthUser] = useState(
		JSON.parse(localStorage.getItem("AuthUser")) || null,
	);
	const navigate = useNavigate();

	const authLogout = () => {
		setAuthToken(null);
		setAuthUser(null);
		localStorage.removeItem(VITE_AUTH_TOKEN);
		localStorage.removeItem("AuthUser");
	};

	useEffect(() => {
		const fetchUser = async () => {
			setAuthUserLoading(true);

			try {
				if (authUser) return;

				const res = await fetch(`${VITE_API_URL}/users/profile`, {
					method: "GET", // Por defecto GET si no se especifica, aunque es buena práctica hacerlo siempre
					headers: {
						Authorization: authToken,
					},
				});

				const body = await res.json();

				if (body.status === "error") {
					throw new Error(body.message);
				}

				setAuthUser(body.data.user);
				localStorage.setItem("AuthUser", JSON.stringify(body.data.user));
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
	}, [authToken, authUser, authLogout]);

	const authLogin = (token) => {
		setAuthToken(token);
		localStorage.setItem(VITE_AUTH_TOKEN, token);
	};

	const authUpdateUserState = (userData) => {
		const updatedUser = {
			...authUser,
			...userData,
		};
		setAuthUser(updatedUser);
		localStorage.setItem("AuthUser", JSON.stringify(updatedUser));
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
