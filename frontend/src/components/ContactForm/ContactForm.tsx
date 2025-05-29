import styles from "./ContactForm.module.css"; // Не забудьте создать этот файл для стилизации
type ContactFormProps = {
   capacity?: string | string[];
   workspaceType?: string;
};

const ContactForm = ({}: ContactFormProps) => {
   return (
      <div className={styles.formContainer}>
         <h2 className={styles.formTitle}>Хотите забронировать эту локацию?</h2>
         <form className={styles.contactForm}>
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

            <button type="submit" className={styles.submitButton}>
               Связаться
            </button>
         </form>
      </div>
   );
};

export default ContactForm;
