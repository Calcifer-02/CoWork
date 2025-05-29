import React, { useState } from "react";
import { createDraft } from "./api";
import styles from "./AddSpaceForm.module.css";

type FormData = {
   country: string;
   region: string;
   city: string;
   inn: string;
   abbreviation: string;
   name: string;
   fullName: string;
   legalAddress: string;
   actualAddress: string;
   phone: string;
   fax: string;
   email: string;
   website: string;
   coworkingType: string;
};

const AddSpaceForm: React.FC = () => {
   const [formData, setFormData] = useState<FormData>({
      country: "Россия",
      region: "Санкт-Петербург",
      city: "Санкт-Петербург",
      inn: "",
      abbreviation: "",
      name: "",
      fullName: "",
      legalAddress: "",
      actualAddress: "",
      phone: "",
      fax: "",
      email: "",
      website: "",
      coworkingType: "Швейные",
   });

   const [isSubmitting, setIsSubmitting] = useState(false);
   const [submitError, setSubmitError] = useState<string | null>(null);
   const [submitSuccess, setSubmitSuccess] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
         await createDraft({
            country: formData.country,
            region: formData.region,
            city: formData.city,
            inn: formData.inn,
            abbreviation: formData.abbreviation,
            name: formData.name,
            full_name: formData.fullName,
            juridical_address: formData.legalAddress,
            actual_address: formData.actualAddress,
            phone: formData.phone,
            email: formData.email,
            website: formData.website,
            coworking_type: formData.coworkingType,
         });

         // Показываем уведомление об успехе
         alert("Черновик успешно сохранен!");

         // Очищаем форму
         setFormData({
            country: "Россия",
            region: "Санкт-Петербург",
            city: "Санкт-Петербург",
            inn: "",
            abbreviation: "",
            name: "",
            fullName: "",
            legalAddress: "",
            actualAddress: "",
            phone: "",
            fax: "",
            email: "",
            website: "",
            coworkingType: "Швейные",
         });
      } catch (error) {
         console.error("Ошибка при сохранении:", error);
         alert("Произошла ошибка при сохранении черновика");
      }
   };

   const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   return (
      <div className={styles.container}>
         <h1 className={styles.title}>Добавление в каталог</h1>

         {submitSuccess && (
            <div className={styles.successMessage}>
               Черновик успешно сохранен! Администратор рассмотрит вашу заявку.
            </div>
         )}

         {submitError && (
            <div className={styles.errorMessage}>{submitError}</div>
         )}

         <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
               <label>Страна</label>
               <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  disabled
               />
            </div>

            <div className={styles.formRow}>
               <div className={styles.formGroup}>
                  <label>Регион</label>
                  <input
                     type="text"
                     name="region"
                     value={formData.region}
                     onChange={handleChange}
                     disabled
                  />
               </div>

               <div className={styles.formGroup}>
                  <label>Город</label>
                  <input
                     type="text"
                     name="city"
                     value={formData.city}
                     onChange={handleChange}
                     disabled
                  />
               </div>
            </div>

            <div className={styles.formRow}>
               <div className={styles.formGroup}>
                  <label>ИНН</label>
                  <input
                     type="text"
                     name="inn"
                     value={formData.inn}
                     onChange={handleChange}
                     pattern="\d{10}"
                     required
                  />
               </div>

               <div className={styles.formGroup}>
                  <label>Аббревиатура</label>
                  <input
                     type="text"
                     name="abbreviation"
                     value={formData.abbreviation}
                     onChange={handleChange}
                     maxLength={5}
                     required
                  />
               </div>
            </div>

            <div className={styles.formGroup}>
               <label>Название</label>
               <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
               />
            </div>

            <div className={styles.formGroup}>
               <label>Полное название</label>
               <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
               />
            </div>

            <div className={styles.formRow}>
               <div className={styles.formGroup}>
                  <label>Юр. адрес</label>
                  <input
                     type="text"
                     name="legalAddress"
                     value={formData.legalAddress}
                     onChange={handleChange}
                     required
                  />
               </div>

               <div className={styles.formGroup}>
                  <label>Факт. адрес</label>
                  <input
                     type="text"
                     name="actualAddress"
                     value={formData.actualAddress}
                     onChange={handleChange}
                     required
                  />
               </div>
            </div>

            <div className={styles.formRow}>
               <div className={styles.formGroup}>
                  <label>Телефон</label>
                  <input
                     type="tel"
                     name="phone"
                     value={formData.phone}
                     onChange={handleChange}
                     pattern="\(\d{3}\) \d{3}-\d{2}-\d{2}"
                     placeholder="(123) 456-78-90"
                     required
                  />
               </div>

               <div className={styles.formGroup}>
                  <label>Факс</label>
                  <input
                     type="tel"
                     name="fax"
                     value={formData.fax}
                     onChange={handleChange}
                     pattern="\(\d{3}\) \d{3}-\d{2}-\d{2}"
                     placeholder="(123) 456-78-90"
                  />
               </div>
            </div>

            <div className={styles.formRow}>
               <div className={styles.formGroup}>
                  <label>E-mail</label>
                  <input
                     type="email"
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     required
                  />
               </div>

               <div className={styles.formGroup}>
                  <label>Сайт</label>
                  <input
                     type="url"
                     name="website"
                     value={formData.website}
                     onChange={handleChange}
                     placeholder="www.example.com"
                  />
               </div>
            </div>

            <div className={styles.formGroup}>
               <label>Тип коворкинга</label>
               <select
                  name="coworkingType"
                  value={formData.coworkingType}
                  onChange={handleChange}
                  className={styles.select}
               >
                  <option>Швейные</option>
                  <option>IT</option>
                  <option>Дизайн</option>
                  <option>Общие</option>
               </select>
            </div>

            <button
               type="submit"
               className={styles.submitButton}
               disabled={isSubmitting}
            >
               {isSubmitting ? "Сохранение..." : "Добавить"}
            </button>
         </form>
      </div>
   );
};

export default AddSpaceForm;
