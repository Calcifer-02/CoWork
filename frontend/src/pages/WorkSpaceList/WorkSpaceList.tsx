import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./WorkspaceList.module.css";
import { useLocation } from "react-router-dom";
import Filters from "../../components/Filters/Filters";
import { workspaces } from "../../../../backend/types";
import ContactForm from "../../components/ContactForm/ContactForm";

interface WorkspaceListProps {
   yandexMapsApiKey: string;
}

const WorkspaceList = ({ yandexMapsApiKey }: WorkspaceListProps) => {
   const mapContainer = useRef<HTMLDivElement>(null);
   const mapInstance = useRef<any>(null);
   const navigate = useNavigate();
   const [filteredWorkspaces, setFilteredWorkspaces] = useState(workspaces);
   const location = useLocation();
   const [filters, setFilters] = useState({
      city: "",
      spaceType: "",
      capacity: "",
      amenities: "",
   });

   // Функция для применения фильтров
   const applyFilters = () => {
      const filtered = workspaces.filter((space) => {
         // Фильтр по городу
         if (filters.city && space.location !== filters.city) return false;

         // Фильтр по типу пространства
         if (filters.spaceType && space.type !== filters.spaceType)
            return false;

         // Фильтр по вместимости
         if (filters.capacity) {
            const filterCapacity = parseInt(filters.capacity);
            if (isNaN(filterCapacity)) return false;

            // Обрабатываем capacity в зависимости от его типа
            let spaceCapacities: number[] = [];

            if (typeof space.capacity === "string") {
               // Если capacity строка (например "4-6")
               const range = space.capacity.split("-").map(Number);
               spaceCapacities = range.filter((n) => !isNaN(n));
            } else if (Array.isArray(space.capacity)) {
               // Если capacity массив
               spaceCapacities = space.capacity
                  .map((c) => {
                     if (typeof c === "string") return parseInt(c);
                     return c;
                  })
                  .filter((n) => !isNaN(n));
            } else if (typeof space.capacity === "number") {
               // Если capacity число
               spaceCapacities = [space.capacity];
            }

            // Если не удалось получить числа - пропускаем фильтрацию
            if (spaceCapacities.length === 0) return true;

            // Проверяем максимальную вместимость
            const maxCapacity = Math.max(...spaceCapacities);
            if (maxCapacity < filterCapacity) return false;
         }

         // Фильтр по удобствам
         if (
            filters.amenities &&
            !space.amenities.includes(filters.amenities)
         ) {
            return false;
         }

         return true;
      });

      setFilteredWorkspaces(filtered);
      updateMapMarkers(filtered);
   };

   // Обновление маркеров на карте
   const updateMapMarkers = (spaces: typeof workspaces) => {
      if (!mapInstance.current) return;

      // Очищаем старые маркеры
      // @ts-ignore
      mapInstance.current.geoObjects.removeAll();

      // Добавляем новые маркеры
      spaces.forEach((space) => {
         const primaryImage = space.images.find((image) => image.isPrimary);

         const balloonContent = `
        <div style="text-align: center;">
          <img 
            src="${primaryImage?.url}" 
            alt="Workspace Image" 
            style="width: 100%; height: 150px; max-width: 300px; object-fit: cover;"/>
          <h3>${space.title}</h3>
          <p>${space.provider}</p>
          <p>${space.price}</p>
          <p>Amenities: ${space.amenities.join(", ")}</p>
          <a href="/building/${
             space.id
          }" style="display: inline-block; margin-top: 10px; padding: 5px 10px; background: #2563eb; color: white; text-decoration: none; border-radius: 4px;">View Details</a>
        </div>
      `;

         // @ts-ignore
         const placemark = new window.ymaps.Placemark(space.coords, {
            hintContent: space.title,
            balloonContent,
         });

         // @ts-ignore
         mapInstance.current.geoObjects.add(placemark);
      });

      // Центрируем карту по отфильтрованным маркерам
      if (spaces.length > 0) {
         // @ts-ignore
         mapInstance.current.setBounds(
            mapInstance.current.geoObjects.getBounds(),
            {
               checkZoomRange: true,
            }
         );
      }
   };

   // Обработчик изменения фильтров
   const handleFilterChange = (newFilters: {
      city: string;
      spaceType: string;
      capacity: string;
      amenities: string;
   }) => {
      setFilters(newFilters);
   };

   // Очистка фильтров
   const clearFilters = () => {
      setFilters({
         city: "",
         spaceType: "",
         capacity: "",
         amenities: "",
      });
      setFilteredWorkspaces(workspaces);
      updateMapMarkers(workspaces);
   };

   useEffect(() => {
      // Если есть переданные параметры, применяем их
      if (location.state?.filters) {
         setFilters((prev) => ({
            ...prev,
            city: location.state.filters.city || "",
            spaceType: location.state.filters.spaceType || "",
         }));
      }
   }, [location.state]);

   // Применяем фильтры при их изменении
   useEffect(() => {
      applyFilters();
   }, [filters]);
   useEffect(() => {
      if (!mapContainer.current) return;

      const script = document.createElement("script");
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=${yandexMapsApiKey}&lang=ru_RU`;
      script.async = true;

      script.onload = () => {
         // @ts-ignore
         window.ymaps.ready(() => {
            // @ts-ignore
            mapInstance.current = new window.ymaps.Map(mapContainer.current, {
               center: [55.75, 37.62],
               zoom: 12,
            });

            updateMapMarkers(filteredWorkspaces);
         });
      };

      document.body.appendChild(script);

      return () => {
         document.body.removeChild(script);
         if (mapInstance.current) {
            mapInstance.current.destroy();
         }
      };
   }, [yandexMapsApiKey]);

   const handleCardClick = (id: number) => {
      navigate(`/building/${id}`);
   };

   return (
      <>
         <Filters
            onApply={applyFilters}
            onFilterChange={handleFilterChange}
            onClear={clearFilters}
            currentFilters={filters}
         />

         <div className={styles.container}>
            <div className={styles.leftPanel}>
               <div className={styles.workspaces}>
                  {filteredWorkspaces.length === 0 ? (
                     <div className={styles.noResults}>
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                           />
                        </svg>
                        <div>No workspaces found matching your filters</div>
                        <button
                           className={styles.clearFiltersButton}
                           onClick={clearFilters}
                        >
                           Clear all filters
                        </button>
                     </div>
                  ) : (
                     filteredWorkspaces.map((space) => {
                        const primaryImage = space.images.find(
                           (image) => image.isPrimary
                        );
                        return (
                           <div
                              key={space.id}
                              className={styles.workspaceCard}
                              onClick={() => handleCardClick(space.id)}
                              style={{ cursor: "pointer" }}
                           >
                              {primaryImage && (
                                 <div className={styles.imageContainer}>
                                    <img
                                       src={primaryImage.url}
                                       alt={
                                          primaryImage.alt ||
                                          `Workspace ${space.id} Main Image`
                                       }
                                       className={styles.workspaceImage}
                                    />
                                 </div>
                              )}
                              <div className={styles.textContent}>
                                 <h3 className={styles.workspaceTitle}>
                                    {space.title}
                                 </h3>
                                 <p className={styles.workspaceProvider}>
                                    {space.provider}
                                 </p>
                                 <p className={styles.workspaceTypes}>
                                    {space.type}
                                 </p>
                                 <p className={styles.workspacePrice}>
                                    {space.price}
                                 </p>
                                 <div className={styles.amenities}>
                                    {space.amenities.map((item, index) => (
                                       <span key={index}>{item}</span>
                                    ))}
                                 </div>
                              </div>
                           </div>
                        );
                     })
                  )}
               </div>
            </div>

            <div ref={mapContainer} className={styles.mapContainer} />
         </div>

         <ContactForm workspaceType={filters.spaceType} />
      </>
   );
};

export default WorkspaceList;
