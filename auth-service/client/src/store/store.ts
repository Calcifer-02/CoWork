import {
   configureStore,
   createAsyncThunk,
   createSlice,
} from "@reduxjs/toolkit";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";

interface AuthState {
   user: IUser;
   isAuth: boolean;
   isLoading: boolean;
}

const initialState: AuthState = {
   user: {
      email: "",
      isActivated: false,
   } as IUser,
   isAuth: false,
   isLoading: true,
};

// Создаем асинхронные thunk-actions
export const login = createAsyncThunk(
   "auth/login",
   async (
      { email, password }: { email: string; password: string },
      { rejectWithValue }
   ) => {
      try {
         const response = await AuthService.login(email, password);
         console.log(response);
         return response; // Просто возвращаем объект AuthResponse напрямую
      } catch (err) {
         if (err instanceof Error) {
            return rejectWithValue(err.message);
         }
         return rejectWithValue("Ошибка авторизации");
      }
   }
);

export const registration = createAsyncThunk(
   "auth/registration",
   async (
      { email, password }: { email: string; password: string },
      { rejectWithValue }
   ) => {
      try {
         const response = await AuthService.registration(email, password);
         console.log(response);
         return response.data; // Теперь возвращаем data, так как она обернута в объект
      } catch (err) {
         if (err instanceof Error) {
            return rejectWithValue(err.message);
         }
         return rejectWithValue("Ошибка регистрации");
      }
   }
);

export const checkAuth = createAsyncThunk(
   "auth/checkAuth",
   async (_, { rejectWithValue }) => {
      try {
         const response = await AuthService.refresh();
         console.log("Refresh response:", response);
         return response; // Возвращаем AuthResponse напрямую
      } catch (err) {
         console.error("Refresh error:", err);
         localStorage.removeItem("token");
         throw rejectWithValue(
            err instanceof Error ? err.message : "Ошибка аутентификации"
         );
      }
   }
);

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      logout(state) {
         state.isAuth = false;
         state.user = { email: "", isActivated: false } as IUser;
         state.isLoading = false;
         localStorage.removeItem("token");
      },
   },
   extraReducers: (builder) => {
      builder
         // Login
         .addCase(login.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(login.fulfilled, (state, action) => {
            state.isAuth = true;
            state.user = {
               email: action.payload.user.email,
               isActivated: action.payload.user.isActivated,
               id: action.payload.user.id,
            };
            state.isLoading = false;
            localStorage.setItem("token", action.payload.accessToken);
         })
         .addCase(login.rejected, (state) => {
            state.isLoading = false;
         })

         // Registration
         .addCase(registration.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(registration.fulfilled, (state, action) => {
            state.isAuth = true;
            state.user = action.payload.user;
            state.isLoading = false;
            localStorage.setItem("token", action.payload.accessToken);
         })
         .addCase(registration.rejected, (state) => {
            state.isLoading = false;
         })

         // CheckAuth
         .addCase(checkAuth.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(checkAuth.fulfilled, (state, action) => {
            state.isAuth = true;
            state.user = action.payload.user;
            state.isLoading = false;
            localStorage.setItem("token", action.payload.accessToken);
         })
         .addCase(checkAuth.rejected, (state) => {
            state.isAuth = false;
            state.user = {} as IUser;
            state.isLoading = false;
            localStorage.removeItem("token");
         });
   },
});

export const { logout } = authSlice.actions;
export const store = configureStore({
   reducer: {
      auth: authSlice.reducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
