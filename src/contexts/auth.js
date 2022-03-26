import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../service/api";

const AuthContext = createContext({ signed: false});

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null);

    const [isAuthenticate, setAuthenticate] = useState(false);

    useEffect(() => {
      const storagedToken = sessionStorage.getItem("@App:token");

      if(storagedToken) {
        setToken(storagedToken);
        setAuthenticate(true);
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
      }
    }, []);

    async function Login(data) {
      const response = await api.post('/users/login', data);
      setToken(response.data.token);
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
      sessionStorage.setItem('@App:token', response.data.token);
      setAuthenticate(true);
    }

    function Logout() {
      setToken(null);
      setAuthenticate(false)
    }

    return (
      <AuthContext.Provider value={{ signed: true, isAuthenticate, token, Login, Logout}}>
        {children}
      </AuthContext.Provider>
    )
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

