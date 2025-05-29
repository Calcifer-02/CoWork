import styles from "./HowItWorks.module.css";

interface TabContentProps {
   title: string;
   description: string;
   features: {
      title: string;
      items: string[];
      cta?: string;
   }[];
}

export const TabContent = ({
   title,
   description,
   features,
}: TabContentProps) => {
   return (
      <div className={styles.tabContent}>
         <h1 className={styles.title}>{title}</h1>
         <p className={styles.description}>{description}</p>

         {features.map((feature, index) => (
            <div key={index} className={styles.feature}>
               <h2 className={styles.featureTitle}>{feature.title}</h2>
               <ul className={styles.featureList}>
                  {feature.items.map((item, i) => (
                     <li key={i}>{item}</li>
                  ))}
               </ul>
               {feature.cta && (
                  <a href="/search">
                     <button className={styles.ctaButton}>{feature.cta}</button>
                  </a>
               )}
            </div>
         ))}
      </div>
   );
};
