import styles from "./Profile.module.css";
import NotificationSetting from "./NotificationSetting"; // Импортируем новый компонент
import AccountSetting from "./AccountSetting"; // Импортируем компонент для Account Setting
import { useState } from "react";
import { Button } from "../../components/Button/Button";

const Profile = () => {
   const [profileImage, setProfileImage] = useState<string>(""); // Состояние для хранения URL изображения
   const name = "Calcifer"; // Имя пользователя

   // Функция для получения первой буквы имени
   const getInitial = (name: string) => {
      return name.charAt(0).toUpperCase();
   };

   // Обработчик для изменения фотографии профиля
   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            if (reader.result) {
               setProfileImage(reader.result as string);
            }
         };
         reader.readAsDataURL(file); // Читаем файл как URL
      }
   };

   return (
      <div className={styles.profile}>
         <header className={styles.header}>
            <h1>Аккаунт</h1>
         </header>
         <section className={styles.profileSection}>
            <div className={styles.profileInfo}>
               <div className={styles.profileImageWrapper}>
                  <label
                     htmlFor="profile-image-upload"
                     className={styles.profileImageLabel}
                     style={{ cursor: "pointer" }}
                  >
                     {profileImage ? (
                        <img
                           src={profileImage}
                           alt="Profile"
                           className={styles.profileImage}
                        />
                     ) : (
                        <div className={styles.profileImageFallback}>
                           {getInitial(name)}
                        </div>
                     )}
                  </label>
                  {/* Скрытый input для выбора изображения */}
                  <input
                     type="file"
                     id="profile-image-upload"
                     accept="image/*"
                     onChange={handleImageChange}
                     style={{ display: "none" }}
                  />
               </div>

               <div className={styles.profileDetails}>
                  <h2>{name}</h2>
                  <p>02.calcifer@gmail.com</p>
                  <Button variant="text">Выйти из аккаунта</Button>
               </div>
            </div>

            <div className={styles.section}>
               <h3>Уведомления</h3>
               <NotificationSetting
                  label="Напоминания и подтверждения бронирования"
                  description="Получайте сообщения, когда начнется бронирование номера или стола, а также когда бронирования будут подтверждены или изменены."
               />
               <NotificationSetting
                  label="Акции, предложения и многое другое"
                  description="Получайте соответствующие рекламные и связанные с мероприятиями уведомления."
               />
               <NotificationSetting
                  label="Обновления по строительству и управлению сообществом"
                  description="Включая важную информацию о здании и текущих событиях."
               />
            </div>

            <div className={styles.section}>
               <h3>Язык</h3>
               <div className={styles.dropdown}>
                  <label>Выберите предпочитаемый язык</label>
                  <select className={styles.select}>
                     <option>Русский</option>
                     <option>English</option>
                     <option>French</option>
                  </select>
               </div>
            </div>

            <div className={styles.section}>
               <h3>Тема</h3>
               <div className={styles.dropdown}>
                  <label>Выберите предпочтительную тему</label>
                  <select className={styles.select}>
                     <option>Светлая</option>
                     <option>Темная</option>
                  </select>
               </div>
            </div>

            <div className={styles.section}>
               <h3>Безопасность аккаунта</h3>
               <AccountSetting
                  label="Логин и безопасность"
                  description="Управление логином и безопасностью аккаунта."
                  icon={
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                     >
                        <path
                           d="M19.0307 17.9694C19.1004 18.039 19.1557 18.1217 19.1935 18.2128C19.2312 18.3038 19.2506 18.4014 19.2506 18.5C19.2506 18.5985 19.2312 18.6961 19.1935 18.7872C19.1557 18.8782 19.1004 18.9609 19.0307 19.0306L14.5307 23.5306C14.461 23.6003 14.3783 23.6557 14.2873 23.6934C14.1962 23.7311 14.0986 23.7506 14.0001 23.7506C13.9015 23.7506 13.8039 23.7311 13.7128 23.6934C13.6218 23.6557 13.5391 23.6003 13.4694 23.5306L8.96943 19.0306C8.82869 18.8899 8.74963 18.699 8.74963 18.5C8.74963 18.301 8.82869 18.1101 8.96943 17.9694C9.11016 17.8286 9.30103 17.7496 9.50005 17.7496C9.69907 17.7496 9.88995 17.8286 10.0307 17.9694L14.0001 21.9397L17.9694 17.9694C18.0391 17.8996 18.1218 17.8443 18.2128 17.8066C18.3039 17.7688 18.4015 17.7494 18.5001 17.7494C18.5986 17.7494 18.6962 17.7688 18.7873 17.8066C18.8783 17.8443 18.961 17.8996 19.0307 17.9694ZM10.0307 10.0306L14.0001 6.06029L17.9694 10.0306C18.1102 10.1713 18.301 10.2504 18.5001 10.2504C18.6991 10.2504 18.8899 10.1713 19.0307 10.0306C19.1714 9.88987 19.2505 9.699 19.2505 9.49998C19.2505 9.30096 19.1714 9.11009 19.0307 8.96935L14.5307 4.46935C14.461 4.39962 14.3783 4.3443 14.2873 4.30656C14.1962 4.26882 14.0986 4.24939 14.0001 4.24939C13.9015 4.24939 13.8039 4.26882 13.7128 4.30656C13.6218 4.3443 13.5391 4.39962 13.4694 4.46935L8.96943 8.96935C8.82869 9.11009 8.74963 9.30096 8.74963 9.49998C8.74963 9.699 8.8287 9.88987 8.96943 10.0306C9.11016 10.1713 9.30103 10.2504 9.50005 10.2504C9.69907 10.2504 9.88995 10.1713 10.0307 10.0306Z"
                           fill="#1B0D0F"
                        />
                     </svg>
                  }
               />
               {/* <AccountSetting
                  label="Public profile"
                  description="Change your profile photo"
                  icon={
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                     >
                        <path
                           d="M19.0307 17.9694C19.1004 18.039 19.1557 18.1217 19.1935 18.2128C19.2312 18.3038 19.2506 18.4014 19.2506 18.5C19.2506 18.5985 19.2312 18.6961 19.1935 18.7872C19.1557 18.8782 19.1004 18.9609 19.0307 19.0306L14.5307 23.5306C14.461 23.6003 14.3783 23.6557 14.2873 23.6934C14.1962 23.7311 14.0986 23.7506 14.0001 23.7506C13.9015 23.7506 13.8039 23.7311 13.7128 23.6934C13.6218 23.6557 13.5391 23.6003 13.4694 23.5306L8.96943 19.0306C8.82869 18.8899 8.74963 18.699 8.74963 18.5C8.74963 18.301 8.82869 18.1101 8.96943 17.9694C9.11016 17.8286 9.30103 17.7496 9.50005 17.7496C9.69907 17.7496 9.88995 17.8286 10.0307 17.9694L14.0001 21.9397L17.9694 17.9694C18.0391 17.8996 18.1218 17.8443 18.2128 17.8066C18.3039 17.7688 18.4015 17.7494 18.5001 17.7494C18.5986 17.7494 18.6962 17.7688 18.7873 17.8066C18.8783 17.8443 18.961 17.8996 19.0307 17.9694ZM10.0307 10.0306L14.0001 6.06029L17.9694 10.0306C18.1102 10.1713 18.301 10.2504 18.5001 10.2504C18.6991 10.2504 18.8899 10.1713 19.0307 10.0306C19.1714 9.88987 19.2505 9.699 19.2505 9.49998C19.2505 9.30096 19.1714 9.11009 19.0307 8.96935L14.5307 4.46935C14.461 4.39962 14.3783 4.3443 14.2873 4.30656C14.1962 4.26882 14.0986 4.24939 14.0001 4.24939C13.9015 4.24939 13.8039 4.26882 13.7128 4.30656C13.6218 4.3443 13.5391 4.39962 13.4694 4.46935L8.96943 8.96935C8.82869 9.11009 8.74963 9.30096 8.74963 9.49998C8.74963 9.699 8.8287 9.88987 8.96943 10.0306C9.11016 10.1713 9.30103 10.2504 9.50005 10.2504C9.69907 10.2504 9.88995 10.1713 10.0307 10.0306Z"
                           fill="#1B0D0F"
                        />
                     </svg>
                  }
               /> */}
            </div>
         </section>
      </div>
   );
};

export default Profile;
