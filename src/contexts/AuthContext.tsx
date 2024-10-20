import { createContext, useState, useEffect, FC, useContext } from 'react';

const API_URL = import.meta.env.API_URL

interface AuthState {
    username: string | null;
    uid: string | null;
    is_admin: boolean | null;
    is_verified: boolean | null;
}

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (email: string, password: string, first_name: string, middle_name: string | null, last_name: string, mobile: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const INITIAL_AUTH_STATE: AuthState = {
        username: null,
        uid: null,
        is_admin: null,
        is_verified: null
    };

    const [auth, setAuth] = useState<AuthState>(INITIAL_AUTH_STATE);

    const login = async (email: string, password: string) => {
        try {
            const loginRequest = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const loginResponse = await loginRequest.json();
            const loginToken = loginResponse.token;
            localStorage.setItem('token', loginToken);
            setAuth({
                username: loginResponse.username,
                uid: loginResponse.uid,
                is_admin: loginResponse.is_admin,
                is_verified: loginResponse.is_verified
            });
        } catch (error) {
            console.error(error);
        }
    };

    const register = async (email: string, password: string, first_name: string, middle_name: string | null ,last_name: string, mobile: string) => {
        try {
            const registerRequest = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password, first_name, middle_name, last_name, mobile})
            });
            const registerResponse = await registerRequest.json();
            const registerToken = registerResponse.token;
            localStorage.setItem('token', registerToken);
            setAuth({
                username: registerResponse.username,
                uid: registerResponse.uid,
                is_admin: registerResponse.is_admin,
                is_verified: registerResponse.is_verified
            });
        } catch (error) {
            console.error(error);
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setAuth(INITIAL_AUTH_STATE);
    };

    const isAuthenticated = async () => {
        const token = localStorage.getItem('token');
        if (!token) return false;
        try {
            const tokenCheckRequest = await fetch(`${API_URL}/auth/token/check`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const tokenCheckResponse = await tokenCheckRequest.json();
            return tokenCheckResponse.isAuthenticated;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    useEffect(() => {
        isAuthenticated().then((authenticated) => {
            if (!authenticated) {
                logout();
            }
        });
    }, []);

    return (
        <AuthContext.Provider value={{ ...auth, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);