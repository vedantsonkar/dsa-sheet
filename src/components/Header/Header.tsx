import { FC } from "react";
import { useUser } from "../../contexts/UserContext";
import Button from "../Button/Button";

const Header: FC = () => {
  const { user, logout, setLoginModalOpen } = useUser();
  return (
    <header
      id="header"
      className="w-full flex items-center justify-between bg-white px-4 py-6 text-black rounded-b-lg"
    >
      <div className="text-4xl font-bold">DSA - Tracker</div>
      {!user ? (
        <Button
          onClick={() => setLoginModalOpen(true)}
          label={"Login / Signup"}
        />
      ) : (
        <Button onClick={() => logout()} label={"Logout"} />
      )}
    </header>
  );
};

export default Header;
