import { FC } from "react";
import { useUser } from "../../contexts/UserContext";
import LoadingGif from "../../assets/loading.gif";

const Loading: FC = () => {
  const { isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-[#3A3A3A] bg-opacity-50 z-50">
        <img
          src={LoadingGif}
          aria-label="Loading"
          alt="Loading"
          width={32}
          height={32}
          className="w-12 h-12 md:w-48 md:h-48"
        />
      </div>
    );
  }
  return null;
};

export default Loading;
