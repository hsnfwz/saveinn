import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [authMessage, setAuthMessage] = useState('');
  const [signInMessage, setSignInMessage] = useState('');
  const [signOutMessage, setSignOutMessage] = useState('');

  useEffect(() => {
    (async function() {
      try {
        const endpoint = 'http://localhost:5000/user';
  
        const options = {
          method: 'GET',
          credentials: 'include',
        };
  
        const res = await fetch(endpoint, options);
        const data = await res.json();
  
        setUser(data.user);
        setAuthMessage(data.message);

        console.log('[user]:', data.user);
        console.log('[message]:', data.message);
      } catch(error) {
        console.log(error);
      }
    }());
  }, []);

  async function signIn(email, password) {
    try {
      const endpoint = 'http://localhost:5000/user/sign_in';

      const body = {
        email,
        password,
      };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      setUser(data.user);
      setSignInMessage(data.message);

      console.log('[user]:', data.user);
      console.log('[message]:', data.message);
    } catch(error) {
      console.log(error);
    }
  }

  async function signOut() {
    try {
      const endpoint = 'http://localhost:5000/user/sign_out';

      const options = {
        method: 'DELETE',
        credentials: 'include',
      };

      const res = await fetch(endpoint, options);
      const data = await res.json();

      setUser(data.user);
      setSignOutMessage(data.message);
      setSignInMessage('');

      console.log('[user]:', data.user);
      console.log('[message]:', data.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, authMessage, signInMessage, signOutMessage, signIn, signOut }}>
      { children }
    </AuthContext.Provider>
  );
}