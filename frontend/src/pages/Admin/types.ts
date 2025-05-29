export interface SpaceRequest {
   id: number;
   name: string;
   address: string;
   status: "pending" | "approved" | "rejected";
}

export interface Workspace {
   id: number;
   name: string;
   address: string;
   createdAt: string;
}
