import BookingForm from "../../components/BookingForm/BookingForm";
import FilterWindow from "../../components/FilterWindowProps/FilterWindowProps";
import styles from "./HomePage.module.css";

export default function HomePage() {
   return (
      <div className={styles.container}>
         {/* Блок с фоновым изображением */}
         <div className={styles.heroSection}></div>
         <div className={styles.filterContainer}>
            <FilterWindow />
         </div>
         {/* Остальной контент */}
         <div className={styles.content}>
            {/* Контактный блок */}
            <div className={styles.contactBlock}>
               <h1 className={styles.mainTitle}>НАЙТИ РАБОЧИЕ ПОМЕЩЕНИЯ</h1>
               <h2 className={styles.contactTitle}>СВЯЖИТЕСЬ С НАМИ СЕГОДНЯ</h2>
               <p className={styles.contactText}>
                  Свяжитесь с нами, и мы поможем вам найти идеальное рабочее
                  помещение.
               </p>
               <div className={styles.phone}>8 (666) 666-69-69</div>
               <BookingForm
                  buttonText="ПОПРОСИТЕ ВАШУ КОМАНДУ СВЯЗАТЬСЯ С ВАМИ"
                  className={styles.contactButton}
               />
            </div>
         </div>
      </div>
   );
}
