import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useContext } from 'react';


const UserContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('https://employee-api-theta.vercel.app/api/auth/verify', {
            headers:
             { "Authorization": `Bearer ${token}` },
          });
          
          if (response.data.success) {
            setUser(response.data.user);
          } else {
            setUser(null)
            setLoading(false)
          }
        } 
      } catch (error) {
        if (error.response && !error.response.data.error) {
          setUser(null)
        }
      }finally{
        setLoading(false)
      }
    };
    
    verifyUser();
  }, []);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate('/login');
  };

  return (
    <UserContext.Provider value={{ user, login, logout ,loading}}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
export default AuthContext;
