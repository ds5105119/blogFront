import React from "react";

type NavBarButtonProps = {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const NavBarButton: React.FC<NavBarButtonProps> = ({
  onClick,
  className = "",
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center justify-center bg-white rounded-lg hover:brightness-95 transition duration-250 ${className}`}
    >
      <div className="inline-flex items-center justify-center p-3 rounded-md text-black hover:text-gray-600 transition duration-300">
        {children}
      </div>
    </button>
  );
};

export default NavBarButton;
