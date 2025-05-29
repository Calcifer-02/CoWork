import $api from "../http";

import { IUser } from "../models/IUser";

export default class AuthService {
   static async fetchUsers(): Promise<{ data: IUser[] }> {
      const response = await $api.get<IUser[]>("/users");
      return response;
   }
}
