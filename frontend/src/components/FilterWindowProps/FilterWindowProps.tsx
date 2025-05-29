import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FilterWindowProps.module.css";
import { workspaces } from "../../../../backend/types";

const uniqueLocations = Array.from(
   new Set(workspaces.map((workspace) => workspace.location))
);
const uniqueWorkspaceTypes = Array.from(
   new Set(workspaces.map((workspace) => workspace.type))
);

const FilterWindow = () => {
   const navigate = useNavigate();
   const [selectedLocation, setSelectedLocation] = React.useState<string>("");
   const [selectedWorkspaceType, setSelectedWorkspaceType] =
      React.useState<string>("");

   const handleStartClick = () => {
      navigate("/search", {
         state: {
            filters: {
               city: selectedLocation,
               spaceType: selectedWorkspaceType,
            },
         },
      });
   };

   return (
      <div className={styles.filterWindow}>
         <h2 className={styles.filterTitle}>
            Для всех способов вашей работы, мы здесь
         </h2>
         <p className={styles.filterSubtitle}>
            От готовых офисов до совместной работы, переговорных и технологий —
            узнайте о решениях для рабочего пространства, созданных для команд
            любого размера.
         </p>

         <div className={styles.filterControls}>
            <select
               value={selectedLocation}
               onChange={(e) => setSelectedLocation(e.target.value)}
               className={styles.locationSelect}
            >
               <option value="">Выберите город</option>
               {uniqueLocations.map((location, index) => (
                  <option key={index} value={location}>
                     {location}
                  </option>
               ))}
            </select>

            <select
               value={selectedWorkspaceType}
               onChange={(e) => setSelectedWorkspaceType(e.target.value)}
               className={styles.workspaceSelect}
            >
               <option value="">Выберите тип рабочего пространства</option>
               {uniqueWorkspaceTypes.map((type, index) => (
                  <option key={index} value={type}>
                     {type}
                  </option>
               ))}
            </select>

            <button
               className={styles.startButton}
               onClick={handleStartClick}
               disabled={!selectedLocation && !selectedWorkspaceType}
            >
               Поиск
            </button>
         </div>
      </div>
   );
};

export default FilterWindow;
