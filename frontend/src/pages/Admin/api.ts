import { SpaceRequest, Workspace } from "./types";

export const fetchRequests = async (): Promise<SpaceRequest[]> => {
   return [
      {
         id: 1,
         name: 'Коворкинг "Офис1"',
         address: "Москва, ул. Ленина, 10",
         status: "pending",
      },
      {
         id: 2,
         name: "Creative Space",
         address: "Санкт-Петербург, Невский пр., 45",
         status: "rejected",
      },
   ];
};

export const fetchWorkspaces = async (): Promise<Workspace[]> => {
   return [
      {
         id: 101,
         name: 'Коворкинг "Код"',
         address: "Москва, ул. Пушкина, 3",
         createdAt: "2023-10-15",
      },
      {
         id: 102,
         name: "WorkHub",
         address: "Казань, ул. Баумана, 12",
         createdAt: "2023-11-01",
      },
   ];
};

export const deleteWorkspace = async (id: number): Promise<void> => {
   console.log(`Workspace ${id} deleted`); // Замените на реальный DELETE-запрос
};
