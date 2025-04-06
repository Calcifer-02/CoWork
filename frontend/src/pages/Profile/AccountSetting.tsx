// AccountSetting.tsx
import React from "react";
import styles from "./Profile.module.css";

interface AccountSettingProps {
   label: string;
   description: string;
   icon: React.ReactNode;
}

const AccountSetting: React.FC<AccountSettingProps> = ({
   label,
   description,
   icon,
}) => {
   return (
      <div className={styles.accountSetting}>
         <div className={styles.accountSettingContent}>
            <div>
               <label>{label}</label>
               <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.iconContainer}>{icon}</div>
         </div>
      </div>
   );
};

export default AccountSetting;
