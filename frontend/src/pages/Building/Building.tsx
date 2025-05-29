import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "./Building.module.css";
import { workspaces } from "../../../../backend/types";
import { Button } from "../../components/Button/Button";
import { ImageSlider } from "../../components/ImageSlider/ImageSlider";
import ContactForm from "../../components/ContactForm/ContactForm";

interface BuildingProps {
   yandexMapsApiKey: string;
}
const Building = ({ yandexMapsApiKey }: BuildingProps) => {
   const { id } = useParams<{ id: string }>();
   const mapContainer = useRef<HTMLDivElement>(null);
   const mapInstance = useRef<any>(null);
   const workspace = workspaces.find((ws) => ws.id === Number(id));

   if (!workspace) {
      return <div className={styles.notFound}>Workspace not found</div>;
   }
   useEffect(() => {
      if (!mapContainer.current || !workspace) return;

      const script = document.createElement("script");
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=${yandexMapsApiKey}&lang=ru_RU`;
      script.async = true;

      script.onload = () => {
         // @ts-ignore
         window.ymaps.ready(() => {
            // @ts-ignore
            mapInstance.current = new window.ymaps.Map(mapContainer.current, {
               center: workspace.coords,
               zoom: 12,
            });

            const primaryImage = workspace.images.find((img) => img.isPrimary);

            const balloonContent = `
          <div style="text-align: center;">
            <img 
              src="${primaryImage?.url}" 
              alt="Workspace Image" 
              style="width: 100%; height: 150px; max-width: 300px; object-fit: cover;"/>
            <h3>${workspace.title}</h3>
            <p>${workspace.provider}</p>
            <p>${workspace.price}</p>
          </div>
        `;

            // @ts-ignore
            const placemark = new window.ymaps.Placemark(workspace.coords, {
               hintContent: workspace.title,
               balloonContent,
            });

            // @ts-ignore
            mapInstance.current.geoObjects.add(placemark);
            // @ts-ignore
            mapInstance.current.setBounds(
               mapInstance.current.geoObjects.getBounds(),
               {
                  checkZoomRange: true,
               }
            );
         });
      };

      document.body.appendChild(script);

      return () => {
         document.body.removeChild(script);
         if (mapInstance.current) {
            mapInstance.current.destroy();
         }
      };
   }, [yandexMapsApiKey, workspace]);

   if (!workspace) {
      return <div className={styles.notFound}>Workspace not found</div>;
   }

   return (
      <div className={styles.container}>
         {/* Navigation tabs */}
         {/* <div className={styles.tabs}>
            <Button variant="text" className={styles.tabButton}>
               Photos
            </Button>
            <Button variant="text" className={styles.tabButton}>
               Highlights
            </Button>
            <Button variant="text" className={styles.tabButton}>
               Office Spaces
            </Button>
            <Button variant="text" className={styles.tabButton}>
               Location
            </Button>
            <Button variant="text" className={styles.tabButton}>
               Reviews
            </Button>
         </div> */}

         <div className={styles.mainContainer}>
            {/* Left column - main content */}
            <div className={styles.mainContent}>
               <h1 className={styles.title}>{workspace.title}</h1>
               <div className={styles.ratingContainer}>
                  <div className={styles.rating}>
                     <svg
                        className={styles.ratingIcon}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                     >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                     </svg>
                     <span className={styles.ratingText}>4.5</span>
                  </div>
                  <span className={styles.divider}>|</span>
                  <span className={styles.reviewCount}>32 отзыва</span>
                  <span className={styles.divider}>|</span>
                  <span className={styles.location}>{workspace.location}</span>
               </div>

               {/* Image slider */}
               <ImageSlider images={workspace.images} />

               {/* Description */}
               <section className={styles.descriptionSection}>
                  <h2 className={styles.sectionTitle}>Об этом пространстве</h2>
                  <p className={styles.descriptionText}>
                     {workspace.description}
                  </p>
                  <Button variant="text" className={styles.viewMoreButton}>
                     View more
                  </Button>
               </section>

               {/* Amenities */}
               <section className={styles.amenitiesSection}>
                  <h2 className={styles.sectionTitle}>Удобства</h2>
                  <div className={styles.amenitiesGrid}>
                     {workspace.amenities.map((amenity, index) => (
                        <div key={index} className={styles.amenityItem}>
                           <svg
                              className={styles.amenityIcon}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="2"
                                 d="M5 13l4 4L19 7"
                              />
                           </svg>
                           <span className={styles.amenityText}>{amenity}</span>
                        </div>
                     ))}
                  </div>
                  <Button variant="text" className={styles.viewAllButton}>
                     Просмотреть все удобства
                  </Button>
               </section>
            </div>

            {/* Right column - contact form */}
            <div className={styles.sidebar}>
               <ContactForm
                  capacity={
                     typeof workspace.capacity === "number"
                        ? workspace.capacity.toString()
                        : workspace.capacity
                  }
                  workspaceType={workspace.type}
               />

               {/* Price box */}
               <div className={styles.priceBox}>
                  <h3 className={styles.priceTitle}>Ценообразование</h3>
                  <p className={styles.priceValue}>{workspace.price}</p>
                  <p className={styles.priceNote}>Доступны гибкие планы</p>
               </div>
            </div>
         </div>
         <section className={styles.mapSection}>
            <h2 className={styles.sectionTitle}>Location</h2>
            <div ref={mapContainer} className={styles.mapContainer} />
         </section>
      </div>
   );
};

export default Building;
