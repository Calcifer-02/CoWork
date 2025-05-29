import { useState, useRef, useEffect } from "react";
import styles from "./Search.module.css";
import { workspaces } from "../../../../backend/types";

const combined: string[] = [
   ...workspaces.reduce<string[]>((acc, { title, provider, amenities }) => {
      acc.push(title, provider, ...amenities);
      return acc;
   }, []),
];

const data: string[] = [...new Set(combined)];

const Search = () => {
   const [inputValue, setInputValue] = useState("");
   const [filteredResults, setFilteredResults] = useState<string[]>([]);
   const inputRef = useRef<HTMLInputElement | null>(null);
   const dropdownRef = useRef<HTMLUListElement | null>(null);

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setInputValue(query);

      if (query) {
         const results = data.filter((item) =>
            item.toLowerCase().includes(query.toLowerCase())
         );
         setFilteredResults(results);
      } else {
         setFilteredResults([]);
      }
   };

   const handleBlur = () => {
      setTimeout(() => {
         setFilteredResults([]);
      }, 100);
   };

   useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
         if (
            inputRef.current &&
            !inputRef.current.contains(e.target as Node) &&
            dropdownRef.current &&
            !dropdownRef.current.contains(e.target as Node)
         ) {
            setFilteredResults([]);
         }
      };

      document.addEventListener("click", handleClickOutside);

      return () => {
         document.removeEventListener("click", handleClickOutside);
      };
   }, []);

   return (
      <div className={styles.search}>
         <input
            ref={inputRef}
            type="text"
            placeholder="Поиск..."
            value={inputValue}
            onChange={handleSearch}
            onBlur={handleBlur}
         />
         {filteredResults.length > 0 && (
            <ul ref={dropdownRef} className={styles.dropdown}>
               {filteredResults.map((result, index) => (
                  <li key={index} className={styles.dropdownItem}>
                     {result}
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
};

export default Search;
