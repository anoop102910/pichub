import { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  id: null | string;
  username: null | string;
  profileImage: null | string;
}

interface DecodedToken {
  exp?: number;
  userId: string;
  username: string;
  profileImage: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User>({ id: null, username: null, profileImage: null });

  const login = () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          setIsAuthenticated(false);
          setUser({ id: null, username: null, profileImage: null });
          localStorage.removeItem("token");
        } else {
          setIsAuthenticated(true);
          setUser({
            id: decodedToken.userId,
            username: decodedToken.username,
            profileImage: decodedToken.profileImage,
          });
        }
      } else {
        setIsAuthenticated(false);
        setUser({ id: null, username: null, profileImage: null });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout =  () => {
    setIsAuthenticated(false);
    setUser({ id: null, username: null, profileImage: null });
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext) as AuthContextType;
