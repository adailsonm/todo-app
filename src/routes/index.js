import { BrowserRouter as Router, Route, Routes as Switch, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import { Home } from "../Pages/Home";
import { Login } from "../Pages/Login";

export function Routes() {
    const { isAuthenticate } = useAuth();
    return (
        <Router>
            <Switch>
                { isAuthenticate ? (
                     <Route path="/" element={<Navigate to="/todo" replace />} />
                ): ( <Route path="/" element={<Navigate to="/login" replace />} /> )}
                <Route path="/login" element={<Login />} />
                <Route path="/todo" element={<Home />} />

            </Switch>
        </Router>
    )
}

