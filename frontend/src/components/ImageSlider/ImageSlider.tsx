import React, { useState } from "react";
import styles from "./ImageSlider.module.css";

interface ImageSliderProps {
   images: Array<{
      id: string;
      url: string;
      alt?: string;
   }>;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
   const [currentIndex, setCurrentIndex] = useState(0);
   const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

   const nextSlide = () => {
      setCurrentIndex((prevIndex) =>
         prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
   };

   const prevSlide = () => {
      setCurrentIndex((prevIndex) =>
         prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
   };

   const nextFullscreenSlide = () => {
      if (fullscreenIndex !== null) {
         setFullscreenIndex(
            fullscreenIndex === images.length - 1 ? 0 : fullscreenIndex + 1
         );
      }
   };

   const prevFullscreenSlide = () => {
      if (fullscreenIndex !== null) {
         setFullscreenIndex(
            fullscreenIndex === 0 ? images.length - 1 : fullscreenIndex - 1
         );
      }
   };

   const openModal = (index: number) => {
      setFullscreenIndex(index);
   };

   const closeModal = () => {
      setFullscreenIndex(null);
   };

   const handleNavButtonClick = (e: React.MouseEvent) => {
      e.stopPropagation(); // Останавливаем всплытие события
   };

   return (
      <div className={styles.sliderContainer}>
         <div className={styles.mainImageContainer}>
            <img
               src={images[currentIndex].url}
               alt={images[currentIndex].alt || "Workspace image"}
               className={styles.mainImage}
               onClick={() => openModal(currentIndex)} // Открытие модального окна по клику
            />
            {images.length > 1 && (
               <>
                  <button
                     className={styles.navButton}
                     onClick={(e) => {
                        handleNavButtonClick(e); // Прерывание всплытия
                        prevSlide();
                     }}
                     aria-label="Previous image"
                  >
                     &lt;
                  </button>
                  <button
                     className={`${styles.navButton} ${styles.nextButton}`}
                     onClick={(e) => {
                        handleNavButtonClick(e); // Прерывание всплытия
                        nextSlide();
                     }}
                     aria-label="Next image"
                  >
                     &gt;
                  </button>
               </>
            )}
         </div>

         {images.length > 1 && (
            <div className={styles.thumbnailContainer}>
               {images.map((image, index) => (
                  <button
                     key={image.id}
                     className={`${styles.thumbnail} ${
                        index === currentIndex ? styles.activeThumbnail : ""
                     }`}
                     onClick={() => setCurrentIndex(index)}
                     aria-label={`View image ${index + 1}`}
                  >
                     <img
                        src={image.url}
                        alt=""
                        className={styles.thumbnailImage}
                     />
                  </button>
               ))}
            </div>
         )}

         {/* Модальное окно для просмотра изображений на весь экран */}
         {fullscreenIndex !== null && (
            <div className={styles.modalOverlay} onClick={closeModal}>
               <div className={styles.modal}>
                  <button className={styles.closeButton} onClick={closeModal}>
                     ×
                  </button>
                  <div className={styles.modalImageContainer}>
                     <img
                        src={images[fullscreenIndex].url}
                        alt={images[fullscreenIndex].alt || "Workspace image"}
                        className={styles.modalImage}
                     />
                     <button
                        className={styles.navButton}
                        onClick={(e) => {
                           handleNavButtonClick(e); // Прерывание всплытия
                           prevFullscreenSlide();
                        }}
                        aria-label="Previous image"
                     >
                        &lt;
                     </button>
                     <button
                        className={`${styles.navButton} ${styles.nextButton}`}
                        onClick={(e) => {
                           handleNavButtonClick(e); // Прерывание всплытия
                           nextFullscreenSlide();
                        }}
                        aria-label="Next image"
                     >
                        &gt;
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};
