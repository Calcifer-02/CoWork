import { useState } from "react";

import styles from "./ContactForm.module.css"; // Не забудьте создать этот файл для стилизации
type ContactFormProps = {
   capacity?: string | string[];
   workspaceType?: string;
};

const ContactForm = ({ capacity, workspaceType }: ContactFormProps) => {
   const [seatCount, setSeatCount] = useState(1);
   const [selectedInterest, setSelectedInterest] = useState(
      workspaceType || ""
   );

   // Функция для поиска максимального числа в capacity
   const getMaxSeats = (): number => {
      if (!capacity || capacity.length === 0) return Infinity;

      const capacityArray = Array.isArray(capacity) ? capacity : [capacity];
      return Math.max(
         ...capacityArray.map((range: string) => {
            const parts = range.split("-");
            // Берем последнюю часть (для случаев типа "7+")
            const lastPart = parts[parts.length - 1];
            // Удаляем нечисловые символы (например "+")
            const numberStr = lastPart.replace(/\D/g, "");
            return numberStr ? parseInt(numberStr, 10) : 0;
         })
      );
   };
   const maxSeats = getMaxSeats(); // Максимально допустимое число мест

   const handleSeatChange = (delta: number) => {
      const newCount = seatCount + delta;
      if (newCount >= 0 && newCount <= maxSeats) {
         setSeatCount(newCount);
      }
   };

   return (
      <div className={styles.formContainer}>
         <h2 className={styles.formTitle}>Interested in this location?</h2>
         <form className={styles.contactForm}>
            <div className={styles.formGroup}>
               <label htmlFor="fullName" className={styles.formLabel}>
                  ФИО*
               </label>
               <input
                  type="text"
                  id="fullName"
                  className={styles.formInput}
                  required
               />
            </div>
            <div className={styles.formGroup}>
               <label htmlFor="companyName" className={styles.formLabel}>
                  Название компании
               </label>
               <input
                  type="text"
                  id="companyName"
                  className={styles.formInput}
               />
            </div>
            <div className={styles.formGroup}>
               <label htmlFor="email" className={styles.formLabel}>
                  Почтовый адрес*
               </label>
               <input
                  type="email"
                  id="email"
                  className={styles.formInput}
                  required
               />
            </div>
            <div className={styles.formGroup}>
               <label htmlFor="phone" className={styles.formLabel}>
                  Номер телефона
               </label>
               <input type="tel" id="phone" className={styles.formInput} />
            </div>
            <div className={styles.formGroup}>
               <label htmlFor="seats" className={styles.formLabel}>
                  Количество мест*
               </label>
               <div className={styles.seatsControl}>
                  <button
                     className={styles.seatsButton}
                     onClick={() => handleSeatChange(-1)}
                     type="button"
                     disabled={seatCount === 0}
                  >
                     -
                  </button>
                  <input
                     type="number"
                     id="seats"
                     value={seatCount}
                     className={styles.seatsInput}
                     onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value >= 0 && value <= maxSeats) {
                           setSeatCount(value);
                        }
                     }}
                  />
                  <button
                     className={styles.seatsButton}
                     onClick={() => handleSeatChange(1)}
                     type="button"
                     disabled={seatCount === maxSeats}
                  >
                     +
                  </button>
               </div>
            </div>
            <div className={styles.formGroup}>
               <label className={styles.formLabel}>Что вас интересует?*</label>
               <select
                  className={styles.formInput}
                  value={selectedInterest}
                  onChange={(e) => setSelectedInterest(e.target.value)}
               >
                  {/* Основной вариант из workspaceType (если есть) */}
                  {workspaceType && (
                     <option value={workspaceType}>{workspaceType}</option>
                  )}

                  <option value="">Хочу обсудить</option>
               </select>
            </div>
            <div className={styles.checkboxGroup}>
               <input
                  id="terms"
                  type="checkbox"
                  className={styles.checkbox}
                  required
               />
               <label htmlFor="terms" className={styles.checkboxLabel}>
                  Нажимая кнопку ниже, вы соглашаетесь с нашими Условиями
                  обслуживания и признаете нашу Глобальную политику
                  конфиденциальности.
               </label>
            </div>
            <div className={styles.checkboxGroup}>
               <input
                  id="newsletter"
                  type="checkbox"
                  className={styles.checkbox}
               />
               <label htmlFor="newsletter" className={styles.checkboxLabel}>
                  Я хочу получать на email интересные новости, предложения и
                  опросы о продуктах и услугах CoWork для их улучшения. Вы
                  можете отписаться в любое время, используя ссылку в конце
                  каждого письма.
               </label>
            </div>
            <button type="submit" className={styles.submitButton}>
               Связаться
            </button>
         </form>
      </div>
   );
};

export default ContactForm;
