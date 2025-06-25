// AuthProvider.tsx
import { useEffect, useState, type ReactNode } from "react";
import AuthContext, {
	type AuthUser,
	type AuthContextType,
} from "./AuthContext";
import { toast } from "sonner";

const { VITE_AUTH_TOKEN, VITE_API_URL } = import.meta.env;

type AuthProviderProps = {
	children: ReactNode;
};

// --------------------------------
export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [authUserLoading, setAuthUserLoading] = useState(true);

	const [authToken, setAuthToken] = useState<string | null>(
		localStorage.getItem(VITE_AUTH_TOKEN) || null,
	);

	const [authUser, setAuthUser] = useState<AuthUser | null>(
		JSON.parse(localStorage.getItem("AuthUser") || "null"),
	);

	useEffect(() => {
		const fetchUser = async () => {
			setAuthUserLoading(true);

			try {
				if (authUser) return;

				const res = await fetch(`${VITE_API_URL}/users/profile`, {
					method: "GET",
					headers: {
						Authorization: authToken ?? "", // Ensure string
					},
				});

				const body = await res.json();

				if (body.status === "error") {
					throw new Error(body.message);
				}

				setAuthUser(body.data.user);
				localStorage.setItem("AuthUser", JSON.stringify(body.data.user));
			} catch (err) {
				if (err instanceof Error) {
					setAuthToken(null);
					setAuthUser(null);
					localStorage.removeItem(VITE_AUTH_TOKEN);
					localStorage.removeItem("AuthUser");
					toast.error(err.message);
				} else {
					toast.error("An unknown error occurred");
				}
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
	}, [authToken, authUser]);

	const authLogin = (token: string) => {
		setAuthToken(token);
		localStorage.setItem(VITE_AUTH_TOKEN, token);
	};

	const authLogout = () => {
		setAuthToken(null);
		setAuthUser(null);
		localStorage.removeItem(VITE_AUTH_TOKEN);
		localStorage.removeItem("AuthUser");
	};

	const authUpdateUserState = (userData: Partial<AuthUser>) => {
		const updatedUser = {
			...authUser,
			...userData,
		} as AuthUser;

		setAuthUser(updatedUser);
		localStorage.setItem("AuthUser", JSON.stringify(updatedUser));
	};

	const contextValue: AuthContextType = {
		authToken,
		authLogin,
		authLogout,
		authUser,
		authUserLoading,
		authUpdateUserState,
	};

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};
