import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../service/api";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const [name, setName] = useState(null);
    const [isAuthenticate, setAuthenticate] = useState(false);

    useEffect(() => {
      const storagedToken = localStorage.getItem("@App:token");
      const storagedName = localStorage.getItem("@App:name");

      if(storagedToken) {
        setToken(storagedToken);
        setName(storagedName);
        setAuthenticate(true);
        
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
      }
    }, []);

    async function Login(data) {
      const response = await api.post('/users/login', data);
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
      localStorage.setItem('@App:token', response.data.token);
      localStorage.setItem('@App:name', response.data.name);
      setToken(response.data.token);
      setName(response.data.name);
      setAuthenticate(true);

    }

    function Logout() {
      localStorage.removeItem('@App:token');
      localStorage.removeItem('@App:name');
      setToken(null);
      setAuthenticate(false)
      setName('');
    }

    return (
      <AuthContext.Provider value={{ isAuthenticate, name, Login, Logout}}>
        {children}
      </AuthContext.Provider>
    )
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

