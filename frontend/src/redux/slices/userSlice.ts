// src/store/slices/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Типы данных для состояния пользователя
interface UserState {
   name: string;
   email: string;
}

const initialState: UserState = {
   name: "",
   email: "",
};

// Создаем slice
const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      setUser: (state, action: PayloadAction<UserState>) => {
         state.name = action.payload.name;
         state.email = action.payload.email;
      },
   },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
