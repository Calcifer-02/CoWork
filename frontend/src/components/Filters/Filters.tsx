import { useMemo } from "react";
import styles from "./Filters.module.css";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import { workspaces } from "../../../../backend/types";

type FiltersProps = {
   onApply: () => void;
   onFilterChange: (filters: {
      city: string;
      spaceType: string;
      capacity: string;
      amenities: string;
   }) => void;
   onClear: () => void;
   currentFilters: {
      city: string;
      spaceType: string;
      capacity: string;
      amenities: string;
   };
};

const Filters = ({
   onApply,
   onFilterChange,
   onClear,
   currentFilters,
}: FiltersProps) => {
   const useFilterOptions = () => {
      return useMemo(() => {
         const cities = [
            { value: "", label: "Очистить фильтр" },
            ...Array.from(new Set(workspaces.map((ws) => ws.location))).map(
               (city) => ({
                  value: city,
                  label: city,
               })
            ),
         ];

         const spaceTypes = [
            { value: "", label: "Очистить фильтр" },
            ...Array.from(new Set(workspaces.map((ws) => ws.type))).map(
               (type) => ({
                  value: type,
                  label: type.replace("-", " "),
               })
            ),
         ];

         const capacities = [
            { value: "", label: "Очистить фильтр" },
            ...Array.from(
               new Set(workspaces.flatMap((ws) => ws.capacity ?? []))
            ).map((cap) => ({
               value: cap.toString(),
               label: cap.toString(),
            })),
         ];

         const amenities = [
            { value: "", label: "Очистить фильтр" },
            ...Array.from(
               new Set(workspaces.flatMap((ws) => ws.amenities))
            ).map((amenity) => ({
               value: amenity,
               label: amenity,
            })),
         ];

         return [
            { id: "city", placeholder: "Город", options: cities },
            {
               id: "spaceType",
               placeholder: "Тип пространства",
               options: spaceTypes,
            },
            { id: "capacity", placeholder: "Вместимость", options: capacities },
            { id: "amenities", placeholder: "Удобства", options: amenities },
         ];
      }, []);
   };

   const filterConfigs = useFilterOptions();

   const handleFilterChange = (
      type: keyof typeof currentFilters,
      value: string
   ) => {
      onFilterChange({
         ...currentFilters,
         [type]: value,
      });
   };

   return (
      <div className={styles.filtersContainer}>
         <div className={styles.filterRow}>
            <button className={styles.applyButton} onClick={onApply}>
               Применить
            </button>

            {filterConfigs.map((config) => (
               <div key={config.id} className={styles.filterGroup}>
                  <CustomSelect
                     value={
                        currentFilters[config.id as keyof typeof currentFilters]
                     }
                     onChange={(e) =>
                        handleFilterChange(
                           config.id as keyof typeof currentFilters,
                           e.target.value
                        )
                     }
                     options={config.options}
                     placeholder={config.placeholder}
                     ariaLabel={config.placeholder}
                  />
               </div>
            ))}

            <button className={styles.clearButton} onClick={onClear}>
               Очистить фильтры
            </button>
         </div>
      </div>
   );
};

export default Filters;
