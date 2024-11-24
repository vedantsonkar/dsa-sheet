import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserContext from "./contexts/UserContext";
import { useCallback, useEffect, useState } from "react";
import { UserDataType } from "./types";
import LoginModal from "./components/LoginSignupFlow/LoginSignupFlow";
import Header from "./components/Header/Header";
import { getUserData } from "./services/api";

const App = () => {
  const [user, setUser] = useState<UserDataType | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<"Login" | "Signup">("Signup");

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  const updateUser = useCallback(
    (userData: React.SetStateAction<UserDataType | null>) => {
      if (userData) {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        logout();
      }
    },
    [logout]
  );

  const checkUser = useCallback(async () => {
    if (!user) {
      const localStoredUser = localStorage.getItem("user");
      const localStoredToken = localStorage.getItem("token");
      if (localStoredUser) {
        const userData = JSON.parse(localStoredUser);
        setUser(userData);
      } else if (localStoredToken) {
        const userData = await getUserData();
        setUser(userData);
      }
    }
  }, [user]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <UserContext.Provider
      value={{
        updateUser,
        loginModalOpen,
        setLoginModalOpen,
        logout,
        user,
        setSelectedTab,
        selectedTab,
      }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
      <LoginModal />
    </UserContext.Provider>
  );
};

export default App;
