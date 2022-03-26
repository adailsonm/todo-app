import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../service/api";

const AuthContext = createContext({ signed: false});

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const [name, setName] = useState('');
    const [isAuthenticate, setAuthenticate] = useState(false);

    useEffect(() => {
      const storagedToken = sessionStorage.getItem("@App:token");
      const storagedName = sessionStorage.getItem("@App:name");

      if(storagedToken) {
        setToken(storagedToken);
        setAuthenticate(true);
        setName(storagedName);
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
      }
    }, []);

    async function Login(data) {
      const response = await api.post('/users/login', data);
      setToken(response.data.token);
      setName(response.data.name);
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
      sessionStorage.setItem('@App:token', response.data.token);
      sessionStorage.setItem('@App:name', response.data.name);
      setAuthenticate(true);
    }

    function Logout() {
      sessionStorage.removeItem('@App:token');
      sessionStorage.removeItem('@App:name');
      setToken(null);
      setAuthenticate(false)
      setName('');
    }

    return (
      <AuthContext.Provider value={{ signed: true, isAuthenticate, name, Login, Logout}}>
        {children}
      </AuthContext.Provider>
    )
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

