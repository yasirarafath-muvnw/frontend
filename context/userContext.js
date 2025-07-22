'use client';

import { createContext, useState, useEffect, useContext } from 'react';

const   UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState('yasir');

  useEffect(() => {
    // const storedToken = Cookies.get('accessToken');
    // if (storedToken) {
    //   setAccessToken(storedToken);
    //   fetchUser(storedToken);
    // } else {
    //   setLoading(false);
    // }
  }, []);


  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
