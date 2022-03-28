import { BrowserRouter as Router, Route, Routes as Switch, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import { Home } from "../Pages/Home";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";

export function Routes() {
    const { isAuthenticate, loading } = useAuth();
    return (
        <Router>
            <>
                <Switch>
                    <Route path="/" element={<Navigate to="/login"/>}/>
                    <Route path="/login" element={isAuthenticate ? <Navigate to="/todo" /> : <Login/>} />
                    <Route path="/todo" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                </Switch>
            </>
        </Router>
    )
}

