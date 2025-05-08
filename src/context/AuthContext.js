import { createContext } from 'react';

const AuthContext = createContext(null);

export default AuthContext;

// NOTE:
// AuthContext is the "mailbox"
// AuthProvider is the "mailman" who puts mail (values/functions) into the mailbox
// useContext(AuthContext) is how you "open the mailbox" and retrieve the contents
