import styles from "./PrivacyPolicy.module.css";
import { privacyPolicyData } from "../../../../backend/privacypolicy";

// Улучшенный компонент для разделов с поддержкой многострочного контента
const Section = ({ title, content }: { title: string; content: string }) => {
   return (
      <div className={styles.section}>
         <h2 className={styles.sectionTitle}>{title}</h2>
         {content.split("\n").map((paragraph, index) => (
            <p key={index} className={styles.sectionContent}>
               {paragraph}
            </p>
         ))}
      </div>
   );
};

// Главный компонент
const PrivacyPolicy = () => {
   return (
      <div className={styles.container}>
         {/* Header */}
         <h1 className={styles.header}>{privacyPolicyData.title}</h1>

         {/* Introduction */}
         <section className={styles.introduction}>
            {privacyPolicyData.introduction
               .split("\n")
               .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
               ))}
         </section>

         {/* Основные разделы */}
         {privacyPolicyData.sections.map((section, index) => (
            <Section
               key={index}
               title={section.title}
               content={section.content}
            />
         ))}

         {/* Footer */}
         <footer className={styles.footer}>
            <p>
               {privacyPolicyData.footer.includes("calcifer02@gmail.com") ? (
                  <>
                     {privacyPolicyData.footer.split("calcifer02@gmail.com")[0]}
                     <a href="mailto:calcifer02@gmail.com">
                        calcifer02@gmail.com
                     </a>
                     {privacyPolicyData.footer.split("calcifer02@gmail.com")[1]}
                  </>
               ) : (
                  privacyPolicyData.footer
               )}
            </p>
         </footer>
      </div>
   );
};

export default PrivacyPolicy;
