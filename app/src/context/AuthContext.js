import { createContext, useState } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);

  async function signIn() {
    console.log('Sign In');
  }

  async function signOut() {
    console.log('Sign Out');
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      { children }
    </AuthContext.Provider>
  );
}