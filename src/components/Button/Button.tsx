import { FC, useCallback } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonPropTypes {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  customClasses?: string;
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
}

const Button: FC<ButtonPropTypes> = ({
  label,
  onClick,
  variant = "primary",
  customClasses,
  disabled = false,
  type = "button",
}) => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      if (onClick) {
        onClick();
      }
    },
    [onClick]
  );
  return (
    <button
      type={type}
      title={label}
      aria-label={label}
      onClick={handleClick}
      className={twMerge(
        "py-[0.563rem] px-[0.625rem] rounded-[0.625rem] text-white text-xs md:text-sm font-medium hover:shadow-lg transition-all",
        variant === "primary" ? "bg-brandpurple" : "bg-lightgrey",
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "opacity-100 cursor-pointer",
        customClasses
      )}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
