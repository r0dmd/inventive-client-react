import { type ReactNode, useState, useEffect, useCallback } from "react";
import AuthContext, { type AuthUser } from "./AuthContext";
import { toast } from "sonner";

const { VITE_AUTH_TOKEN, VITE_API_URL } = import.meta.env;

type Props = {
	children: ReactNode;
};

// -----------------------
export const AuthProvider = ({ children }: Props) => {
	const [authUserLoading, setAuthUserLoading] = useState(true);
	const [authToken, setAuthToken] = useState<string | null>(
		localStorage.getItem(VITE_AUTH_TOKEN) || null,
	);
	const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
		const stored = localStorage.getItem("AuthUser");
		return stored ? JSON.parse(stored) : null;
	});

	const authLogout = useCallback(() => {
		setAuthToken(null);
		setAuthUser(null);
		localStorage.removeItem(VITE_AUTH_TOKEN);
		localStorage.removeItem("AuthUser");
	}, []);

	useEffect(() => {
		const fetchUser = async () => {
			setAuthUserLoading(true);

			try {
				if (authUser) return;

				const res = await fetch(`${VITE_API_URL}/users/profile`, {
					method: "GET",
					headers: {
						Authorization: authToken ?? "", // fallback to empty string
					},
				});
				const body = await res.json();

				if (body.status === "error") throw new Error(body.message);

				setAuthUser(body.data.user);
				localStorage.setItem("AuthUser", JSON.stringify(body.data.user));
			} catch (err) {
				authLogout();
				toast.error((err as Error).message);
			} finally {
				setAuthUserLoading(false);
			}
		};

		if (authToken) fetchUser();
		else {
			setAuthUser(null);
			setAuthUserLoading(false);
		}
	}, [authToken, authUser, authLogout]);

	const authLogin = (token: string) => {
		setAuthToken(token);
		localStorage.setItem(VITE_AUTH_TOKEN, token);
	};

	const authUpdateUserState = (userData: Partial<AuthUser>) => {
		const updatedUser = { ...authUser, ...userData } as AuthUser;
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
