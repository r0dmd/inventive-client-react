import { createContext } from "react";

export type AuthUser = {
	id: string;
	name: string;
	email: string;
	// Add more user fields if needed
};

export type AuthContextType = {
	authToken: string | null;
	authLogin: (token: string) => void;
	authLogout: () => void;
	authUser: AuthUser | null;
	authUserLoading: boolean;
	authUpdateUserState: (userData: Partial<AuthUser>) => void;
};

// NOTE:
// AuthContext is the "mailbox"
// AuthProvider is the "mailman" who puts mail (values/functions) into the mailbox
// useContext(AuthContext) is how you "open the mailbox" and retrieve the contents
const AuthContext = createContext<AuthContextType | null>(null);
export default AuthContext;
