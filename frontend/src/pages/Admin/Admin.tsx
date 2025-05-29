import React, { useState, useEffect } from "react";
import { SpaceRequest, Workspace } from "./types";
import { fetchRequests, fetchWorkspaces, deleteWorkspace } from "./api";
import styles from "./Admin.module.css";

const Admin: React.FC = () => {
   const [requests, setRequests] = useState<SpaceRequest[]>([]);
   const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [activeTab, setActiveTab] = useState<"requests" | "workspaces">(
      "requests"
   );
   const [selectedItem, setSelectedItem] = useState<
      SpaceRequest | Workspace | null
   >(null);

   useEffect(() => {
      const loadData = async () => {
         const requestsData = await fetchRequests();
         const workspacesData = await fetchWorkspaces();
         setRequests(requestsData);
         setWorkspaces(workspacesData);
      };
      loadData();
   }, []);

   const filteredWorkspaces = workspaces.filter(
      (ws) =>
         ws.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         ws.address.toLowerCase().includes(searchTerm.toLowerCase())
   );

   const handleDelete = async (id: number) => {
      if (window.confirm("Вы уверены, что хотите удалить это пространство?")) {
         await deleteWorkspace(id);
         setWorkspaces(workspaces.filter((ws) => ws.id !== id));
      }
   };

   return (
      <div className={styles.container}>
         <h1 className={styles.title}>Админ-панель</h1>

         <div className={styles.tabs}>
            <button
               className={`${styles.tab} ${
                  activeTab === "requests" ? styles.active : ""
               }`}
               onClick={() => setActiveTab("requests")}
            >
               Запросы на добавление
            </button>
            <button
               className={`${styles.tab} ${
                  activeTab === "workspaces" ? styles.active : ""
               }`}
               onClick={() => setActiveTab("workspaces")}
            >
               Управление пространствами
            </button>
         </div>

         <div className={styles.tabContent}>
            {activeTab === "requests" ? (
               <div className={styles.tableContainer}>
                  <table className={styles.table}>
                     <thead>
                        <tr>
                           <th>ID</th>
                           <th>Название</th>
                           <th>Адрес</th>
                           <th>Статус</th>
                           <th>Действия</th>
                        </tr>
                     </thead>
                     <tbody>
                        {requests.map((request) => (
                           <tr key={request.id}>
                              <td>{request.id}</td>
                              <td>{request.name}</td>
                              <td>{request.address}</td>
                              <td>
                                 <span
                                    className={`${styles.badge} ${
                                       request.status === "pending"
                                          ? styles.pending
                                          : request.status === "approved"
                                          ? styles.approved
                                          : styles.rejected
                                    }`}
                                 >
                                    {request.status === "pending"
                                       ? "На рассмотрении"
                                       : request.status === "approved"
                                       ? "Одобрено"
                                       : "Отклонено"}
                                 </span>
                              </td>
                              <td>
                                 <button
                                    className={styles.viewButton}
                                    onClick={() => setSelectedItem(request)}
                                 >
                                    Просмотр
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            ) : (
               <>
                  <input
                     type="text"
                     placeholder="Поиск..."
                     className={styles.searchInput}
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className={styles.tableContainer}>
                     <table className={styles.table}>
                        <thead>
                           <tr>
                              <th>ID</th>
                              <th>Название</th>
                              <th>Адрес</th>
                              <th>Дата добавления</th>
                              <th>Действия</th>
                           </tr>
                        </thead>
                        <tbody>
                           {filteredWorkspaces.map((workspace) => (
                              <tr key={workspace.id}>
                                 <td>{workspace.id}</td>
                                 <td>{workspace.name}</td>
                                 <td>{workspace.address}</td>
                                 <td>{workspace.createdAt}</td>
                                 <td>
                                    <button
                                       className={styles.viewButton}
                                       onClick={() =>
                                          setSelectedItem(workspace)
                                       }
                                    >
                                       Просмотр
                                    </button>
                                    <button
                                       className={styles.deleteButton}
                                       onClick={() =>
                                          handleDelete(workspace.id)
                                       }
                                    >
                                       Удалить
                                    </button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </>
            )}
         </div>

         {/* Модальное окно */}
         {selectedItem && (
            <div className={styles.modalOverlay}>
               <div className={styles.modal}>
                  <h2>{selectedItem.name}</h2>
                  <p>
                     <strong>Адрес:</strong> {selectedItem.address}
                  </p>
                  {"status" in selectedItem && (
                     <p>
                        <strong>Статус:</strong>{" "}
                        {selectedItem.status === "pending"
                           ? "На рассмотрении"
                           : selectedItem.status === "approved"
                           ? "Одобрено"
                           : "Отклонено"}
                     </p>
                  )}
                  {"createdAt" in selectedItem && (
                     <p>
                        <strong>Дата добавления:</strong>{" "}
                        {selectedItem.createdAt}
                     </p>
                  )}
                  <button
                     className={styles.closeButton}
                     onClick={() => setSelectedItem(null)}
                  >
                     Закрыть
                  </button>
               </div>
            </div>
         )}
      </div>
   );
};

export default Admin;
