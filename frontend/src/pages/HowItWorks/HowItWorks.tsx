import { TabContent } from "./TabContent";
import {
   businessContent,
   individualsContent,
   hostsContent,
} from "./howItWorksContent";
import styles from "./HowItWorks.module.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const HowItWorks = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const [activeTab, setActiveTab] = useState("businesses");

   const tabs = [
      { id: "businesses", label: "Для бизнеса", content: businessContent },
      { id: "individuals", label: "Частные лица", content: individualsContent },
      { id: "hosts", label: "Размещение", content: hostsContent },
   ];

   useEffect(() => {
      const hash = location.hash.substring(1);
      if (hash && tabs.some((tab) => tab.id === hash)) {
         setActiveTab(hash);
      }
   }, [location]);

   const handleTabChange = (tabId: string) => {
      setActiveTab(tabId);
      navigate(`/how-it-works#${tabId}`);
   };

   const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

   return (
      <div className={styles.container}>
         <div className={styles.tabs}>
            {tabs.map((tab) => (
               <button
                  key={tab.id}
                  className={`${styles.tab} ${
                     activeTab === tab.id ? styles.active : ""
                  }`}
                  onClick={() => handleTabChange(tab.id)}
               >
                  {tab.label}
               </button>
            ))}
         </div>

         {activeTabContent && (
            <TabContent
               title={activeTabContent.title}
               description={activeTabContent.description}
               features={activeTabContent.features}
            />
         )}
      </div>
   );
};

export default HowItWorks;
