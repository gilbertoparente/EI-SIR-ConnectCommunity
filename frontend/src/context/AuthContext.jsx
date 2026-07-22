import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {

        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (savedToken && savedUser) {

            setToken(savedToken);
            setUser(JSON.parse(savedUser));

        }

    }, []);

    const login = (userData, jwtToken) => {

        setUser(userData);
        setToken(jwtToken);

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", jwtToken);

    };

    const logout = () => {

        setUser(null);
        setToken(null);

        localStorage.removeItem("user");
        localStorage.removeItem("token");

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}