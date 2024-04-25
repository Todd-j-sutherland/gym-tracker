import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  username: string;
  setUsername: (username: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const loadStoredUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("@username");
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error("Failed to fetch username from storage:", error);
      }
    };

    loadStoredUsername();
  }, []);

  useEffect(() => {
    const updateStoredUsername = async () => {
      try {
        await AsyncStorage.setItem("@username", username);
      } catch (error) {
        console.error("Failed to save username:", error);
      }
    };

    if (username) {
      updateStoredUsername();
    }
  }, [username]);

  return (
    <AuthContext.Provider value={{ username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
