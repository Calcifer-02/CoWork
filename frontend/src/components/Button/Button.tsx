import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
   children: React.ReactNode;
   variant?: "primary" | "secondary" | "text";
   onClick?: () => void;
   className?: string;
   type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
   children,
   variant = "primary",
   onClick,
   className = "",
   type = "button",
}) => {
   const variantClass = {
      primary: styles.primaryButton,
      secondary: styles.secondaryButton,
      text: styles.textButton,
   }[variant];

   return (
      <button
         type={type}
         className={`${variantClass} ${className}`}
         onClick={onClick}
      >
         {children}
      </button>
   );
};
