import React, { createContext, useContext } from "react";
import { UserDataType } from "../types";

interface UserContextType {
  user: UserDataType | null; // User data or null if not logged in
  loginModalOpen: boolean;
  setLoginModalOpen: (loginModalOpen: React.SetStateAction<boolean>) => void;
  updateUser: (userData: React.SetStateAction<UserDataType | null>) => void; // Function to update user data
  logout: () => void; // Function to clear user data
  selectedTab: "Login" | "Signup";
  setSelectedTab: (
    selectedTab: React.SetStateAction<"Login" | "Signup">
  ) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loginModalOpen: false,
  selectedTab: "Signup",
  setLoginModalOpen: () => {},
  updateUser: () => {},
  logout: () => {},
  setSelectedTab: () => {},
});

export const useUser = () => useContext(UserContext);

export default UserContext;
