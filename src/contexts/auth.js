import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../service/api";
import decode from 'jwt-decode';


const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const [name, setName] = useState(null);
    const [isAuthenticate, setIsAuthenticate] = useState(false);
    const [expiredToken, setExpiredToken] = useState(false);
    const [payload, setPayload] = useState({});
    const [refreshToken, setRefreshToken] = useState('');

    useEffect(() => {
      const storagedToken = localStorage.getItem("@App:token");
      const storagedRefreshToken = localStorage.getItem("@App:refreshToken");
      const storagedName = localStorage.getItem("@App:name");
      if(storagedToken) {
        setIsAuthenticate(true);
        setToken(storagedToken);
        setName(storagedName);
        setRefreshToken(storagedRefreshToken);
        const { exp, email, _id, name} = decode(storagedToken);
        if (exp <= Math.floor(new Date() / 1000)) {
          setExpiredToken(true);
          setPayload({email, _id, name});
        }

        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
      }
    }, []);

    async function Login(data) {
      try {
        const response = await api.post('/users/login', data);
        api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
        localStorage.setItem('@App:token', response.data.token);
        localStorage.setItem("@App:refreshToken", response.data.refreshToken);
        localStorage.setItem('@App:name', response.data.name);
        setToken(response.data.token);
        setRefreshToken(response.data.refreshToken);
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
      localStorage.removeItem('@App:refreshToken');

      setToken(null);
      setIsAuthenticate(false)
      setRefreshToken(null);
      setName('');
    }

    async function handleRefreshToken() {
      console.log(payload)
      let response = await api.post('/users/refresh',{
        payload,
        refreshToken
      });

      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
      localStorage.setItem('@App:token', response.data.token);
      localStorage.setItem('@App:name', response.data.name);
    }

    if (expiredToken) {
      handleRefreshToken();
      setExpiredToken(false);
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

