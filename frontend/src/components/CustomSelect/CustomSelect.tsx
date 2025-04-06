import { ChangeEventHandler } from "react";
import styles from "./CustomSelect.module.css";

interface CustomSelectProps {
   value: string;
   onChange: ChangeEventHandler<HTMLSelectElement>;
   options: { value: string; label: string }[];
   placeholder: string;
   ariaLabel: string;
   disabled?: boolean;
}

export const CustomSelect = ({
   value,
   onChange,
   options,
   placeholder,
   ariaLabel,
   disabled = false,
}: CustomSelectProps) => {
   return (
      <select
         className={styles.filterSelect}
         value={value}
         onChange={onChange}
         aria-label={ariaLabel}
         disabled={disabled}
      >
         <option value="" disabled hidden>
            {placeholder}
         </option>
         {options.map((option) => (
            <option key={option.value} value={option.value}>
               {option.label}
            </option>
         ))}
      </select>
   );
};
