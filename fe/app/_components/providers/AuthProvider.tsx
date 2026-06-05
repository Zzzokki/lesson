"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Auth } from "../Auth";
import { api } from "@/axios";
import { Loader } from "lucide-react";

export type User = {
  id: number;
  username: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) return setIsReady(true);

      try {
        const { data } = await api.get<{ user: User }>("/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUser(data.user);
      } catch {
        localStorage.removeItem("accessToken");
      } finally {
        setIsReady(true);
      }
    };

    fetchUser();
  }, []);

  if (!isReady) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {user && children}

      {!user && <Auth />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


