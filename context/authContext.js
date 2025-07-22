'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const storedToken = Cookies.get('accessToken');
    // if (storedToken) {
    //   setAccessToken(storedToken);
    //   fetchUser(storedToken);
    // } else {
    //   setLoading(false);
    // }
  }, []);

  const fetchUser = async (token) => {
    try {
      const res = await axios.get('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data.user);
    } catch (err) {
      console.error('Failed to fetch user:', err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
    //   const res = await axios.post('/api/auth/login', { email, password });
    //   const { accessToken } = res.data;

    //   Cookies.set('accessToken', accessToken, { expires: 1 });
    //   setAccessToken(accessToken);
    //   await fetchUser(accessToken);

    //   router.push('/');
    } catch (err) {
    //   throw new Error(err.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    // Cookies.remove('accessToken');
    // setAccessToken('');
    // setUser(null);
    // router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
