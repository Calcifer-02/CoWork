// NotificationSetting.tsx
import React from "react";
import styles from "./Profile.module.css";

interface NotificationSettingProps {
   label: string;
   description: string;
}

const NotificationSetting: React.FC<NotificationSettingProps> = ({
   label,
   description,
}) => {
   return (
      <div className={styles.toggleContainer}>
         <div className={styles.toggleItem}>
            <label>{label}</label>
            <p className={styles.description}>{description}</p>
         </div>
         <label className={styles.switch}>
            <input type="checkbox" />
            <span className={styles.slider}></span>
         </label>
      </div>
   );
};

export default NotificationSetting;
