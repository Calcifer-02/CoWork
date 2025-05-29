import React, { useState, useEffect } from "react";
import styles from "./BookingForm.module.css";

interface BookingFormProps {
   buttonText: string;
   className: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ buttonText, className }) => {
   const [isOpen, setIsOpen] = useState(false);

   useEffect(() => {
      if (isOpen) {
         document.body.style.overflow = "hidden";
         document.body.style.touchAction = "none"; // Блокируем масштабирование на мобильных
      } else {
         document.body.style.overflow = "";
         document.body.style.touchAction = "";
      }

      return () => {
         document.body.style.overflow = "";
         document.body.style.touchAction = "";
      };
   }, [isOpen]);

   const openDialog = () => {
      setIsOpen(true);
   };

   const closeDialog = () => {
      setIsOpen(false);
   };

   const handleDialogClick = (e: React.MouseEvent) => {
      e.stopPropagation();
   };

   return (
      <div>
         <button onClick={openDialog} className={className}>
            {buttonText}
         </button>

         {isOpen && (
            <div className={styles.modalOverlay} onClick={closeDialog}>
               <div className={styles.modalContainer}>
                  <dialog
                     open
                     className={styles.dialog}
                     onClick={handleDialogClick}
                  >
                     <button
                        onClick={closeDialog}
                        className={styles.closeButton}
                     >
                        ✖
                     </button>
                     <div className={styles.dialogContent}>
                        <h2>Свяжитесь с нами</h2>

                        <form className={styles.form}>
                           <div className={styles.inputGroup}>
                              <label htmlFor="name">Мое имя: *</label>
                              <input id="name" type="text" required />
                           </div>

                           <div className={styles.inputGroup}>
                              <label htmlFor="email">
                                 Мой электронный адрес: *
                              </label>
                              <input id="email" type="email" required />
                           </div>

                           <div className={styles.inputGroup}>
                              <label htmlFor="phone">
                                 Мой номер телефона: *
                              </label>
                              <input id="phone" type="tel" required />
                           </div>

                           <div className={styles.inputGroup}>
                              <label htmlFor="product">
                                 Интересующий продукт:
                              </label>
                              <select id="product">
                                 <option>Пожалуйста, выберите</option>
                                 <option>Продукт 1</option>
                                 <option>Продукт 2</option>
                              </select>
                           </div>

                           <div className={styles.inputGroup}>
                              <label htmlFor="location">
                                 Место, интересующее клиента:
                              </label>
                              <input id="location" type="text" />
                           </div>

                           <div className={styles.inputGroup}>
                              <label htmlFor="date">Дата:</label>
                              <input id="date" type="date" />
                           </div>

                           <div className={styles.inputGroup}>
                              <label htmlFor="time">Время:</label>
                              <input id="time" type="time" />
                           </div>

                           <div className={styles.checkboxGroup}>
                              <input
                                 id="checkbox"
                                 type="checkbox"
                                 className={styles.checkbox}
                              />
                              <label
                                 htmlFor="checkbox"
                                 className={styles.checkboxLabel}
                              >
                                 Я хочу получать такие же предложения и новости
                                 от CoWork.
                              </label>
                           </div>

                           <div className={styles.inputGroup}>
                              <label htmlFor="comments">Комментарии:</label>
                              <textarea id="comments" rows={4}></textarea>
                           </div>

                           <button
                              type="submit"
                              className={styles.submitButton}
                           >
                              Забронировать визит
                           </button>
                        </form>
                     </div>
                  </dialog>
               </div>
            </div>
         )}
      </div>
   );
};

export default BookingForm;
