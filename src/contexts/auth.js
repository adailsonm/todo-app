import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../service/api";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const [name, setName] = useState(null);
    const [isAuthenticate, setIsAuthenticate] = useState(false);

    useEffect(() => {
      const storagedToken = localStorage.getItem("@App:token");
      const storagedName = localStorage.getItem("@App:name");
      if(storagedToken) {
        setIsAuthenticate(true);
        setToken(storagedToken);
        setName(storagedName);
        
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
      }
    }, []);

    async function Login(data) {
      try {
        const response = await api.post('/users/login', data);
        api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
        localStorage.setItem('@App:token', response.data.token);
        localStorage.setItem('@App:name', response.data.name);
        setToken(response.data.token);
        setName(response.data.name);
        setIsAuthenticate(true);
      } catch(error) {
        if(error.response) {
          toast.error(error.response.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          });
        }
      }
    }

    function Logout() {
      localStorage.removeItem('@App:token');
      localStorage.removeItem('@App:name');
      setToken(null);
      setIsAuthenticate(false)
      setName('');
    }

    return (
      <AuthContext.Provider value={{ isAuthenticate, name, token, Login, Logout}}>
        {children}
      </AuthContext.Provider>
    )
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

