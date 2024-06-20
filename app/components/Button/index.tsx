"use client";

import clsx from "clsx";

interface IButtonProps {
  type: "submit" | "reset" | "button" | undefined;
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  danger?: boolean;
  secondary?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<IButtonProps> = ({
  type,
  fullWidth,
  onClick,
  disabled,
  loading,
  danger,
  secondary,
  children,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        `
        flex
        justify-center
        gap-3  
        px-3
        py-2
        text-sm
        font-semibold
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
        rounded-md
        shadow-lg
        whitespace-nowrap
        dark:bg-slate-800
          
    `,
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary &&
        "bg-pink-200 text-black hover:bg-pink-300 active:bg-pink-400 active:scale-95  dark:bg-slate-800",
        danger &&
        "bg-[rgb(38,37,78)] hover:bg-[rgb(64,63,134)] text-white focus-visible:outline-blue-600  dark:bg-slate-800",

        !secondary &&
        !danger &&
        "bg-transparent  hover:bg-[rgb(64,63,134)] transition hover:text-white dark:bg-[#3d3d3d] dark:hover:bg-[#242424] focus-visible:outline-[rgb(89,100,199)]  "
      )}
    >
      {children}
    </button>
  );
};

export default Button;
