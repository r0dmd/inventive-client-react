// NOTE:
// AuthContext is the "mailbox"
// AuthProvider is the "mailman" who puts mail (values/functions) into the mailbox
// useContext(AuthContext) is how you "open the mailbox" and retrieve the contents

import { createContext } from "react";

export type AuthUser = {
	id: string;
	name: string;
	role: string;
};

export type AuthContextType = {
	authToken: string | null;
	authLogin: (token: string) => void;
	authLogout: () => void;
	authUser: AuthUser | null;
	authUserLoading: boolean;
	authUpdateUserState: (userData: Partial<AuthUser>) => void;
};

// We use `undefined` to enable safe access via custom hook
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
