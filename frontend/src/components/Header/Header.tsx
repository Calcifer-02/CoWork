import { useState } from "react";
import Search from "../Search/Search";
import styles from "./Header.module.css";

const Header = () => {
   const [menuOpen, setMenuOpen] = useState(false); // Состояние для открытия/закрытия меню

   const toggleMenu = () => {
      setMenuOpen(!menuOpen); // Переключаем состояние
   };

   return (
      <header className={styles.header}>
         <div className={styles.container}>
            {/* Бургер-меню для маленьких экранов */}
            <div className={styles.burgerMenu} onClick={toggleMenu}>
               {/* Новый SVG для бургер-меню */}
               <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M5 12H18"
                     stroke="#000000"
                     strokeWidth="2"
                     strokeLinecap="round"
                  />
                  <path
                     d="M5 17H11"
                     stroke="#000000"
                     strokeWidth="2"
                     strokeLinecap="round"
                  />
                  <path
                     d="M5 7H15"
                     stroke="#000000"
                     strokeWidth="2"
                     strokeLinecap="round"
                  />
               </svg>
            </div>

            {/* Логотип */}
            <a
               href="/"
               className={`${styles.logo} ${menuOpen ? styles.hidden : ""}`}
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
               >
                  <path
                     fillRule="evenodd"
                     clipRule="evenodd"
                     d="M4.02655 8L1.33325 6.41596L3.31838 2.91738L6.01325 4.4987L6.01479 1.33333H9.98505L9.98659 4.4987L12.6815 2.91738L14.6666 6.41596L11.9733 8L14.6666 9.58403L12.6815 13.0826L9.98659 11.5013L9.98505 14.6667H6.01479L6.01325 11.5013L3.31838 13.0826L1.33325 9.58403L4.02655 8Z"
                     fill="#1B0D0F"
                  />
               </svg>
               CoWork
            </a>

            {/* Навигация */}
            <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
               <a href="/">Начальная страница</a>
               <a href="/how-it-works">Как это работает</a>
               <a href="/search">Локации</a>
               <a href="#">События</a>
            </nav>

            {/* Поиск и иконки */}
            <div className={styles.actions}>
               <Search />
               <button className={styles.iconButton}>
                  <svg
                     width="800px"
                     height="800px"
                     viewBox="0 0 24 24"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        d="M9.00195 17H5.60636C4.34793 17 3.71872 17 3.58633 16.9023C3.4376 16.7925 3.40126 16.7277 3.38515 16.5436C3.37082 16.3797 3.75646 15.7486 4.52776 14.4866C5.32411 13.1835 6.00031 11.2862 6.00031 8.6C6.00031 7.11479 6.63245 5.69041 7.75766 4.6402C8.88288 3.59 10.409 3 12.0003 3C13.5916 3 15.1177 3.59 16.2429 4.6402C17.3682 5.69041 18.0003 7.11479 18.0003 8.6C18.0003 11.2862 18.6765 13.1835 19.4729 14.4866C20.2441 15.7486 20.6298 16.3797 20.6155 16.5436C20.5994 16.7277 20.563 16.7925 20.4143 16.9023C20.2819 17 19.6527 17 18.3943 17H15.0003M9.00195 17L9.00031 18C9.00031 19.6569 10.3435 21 12.0003 21C13.6572 21 15.0003 19.6569 15.0003 18V17M9.00195 17H15.0003"
                        stroke="#000000"
                     />
                  </svg>
               </button>

               <a href="/profile">
                  <img
                     className={styles.avatar}
                     src="https://00.img.avito.st/image/1/1.p-ovg7a1HQMZJIkFbeXGzjciCQORKIkFGSQJAQ.--aRKXIrdsM5kmduOk7bOv6DUCojaZyFwSifscm89Oc"
                     alt="Аватар"
                  ></img>
               </a>
            </div>
         </div>

         {/* Затемнение фона */}
         {menuOpen && (
            <div className={styles.overlay} onClick={toggleMenu}></div>
         )}
      </header>
   );
};

export default Header;
