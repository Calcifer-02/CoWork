// import { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "./store/hooks";
// import { checkAuth, logout } from "./store/store";
// import AuthForm from "./components/AuthForm";

// interface RootState {
//    auth: {
//       isAuth: boolean;
//       user: {
//          email: string;
//          isActivated: boolean;
//       };
//       isLoading: boolean;
//    };
// }

// function App() {
//    const dispatch = useAppDispatch();
//    const { isAuth, user, isLoading } = useAppSelector(
//       (state: RootState) => state.auth
//    );

//    useEffect(() => {
//       const token = localStorage.getItem("token");
//       console.log("Initial token check:", token);

//       if (token) {
//          dispatch(checkAuth())
//             .unwrap()
//             .catch((error) => {
//                console.error("Auth check failed:", error);
//                dispatch(logout());
//             });
//       } else {
//          // Если токена нет, явно устанавливаем isLoading в false
//          dispatch({ type: "auth/checkAuth/rejected" });
//       }
//    }, [dispatch]);

//    if (isLoading) {
//       return (
//          <div className="loading-container">
//             <div className="loading-spinner"></div>
//             <p>Проверка авторизации...</p>
//          </div>
//       );
//    }

//    if (!isAuth) {
//       return (
//          <div className="auth-container">
//             <AuthForm />
//          </div>
//       );
//    }

//    return (
//       <div className="app-container">
//          <h1>Пользователь авторизован: {user.email}</h1>
//          <h1>
//             {user.isActivated
//                ? "Аккаунт подтвержден по почте"
//                : "Подтвердите авторизацию по почте"}
//          </h1>
//          <button className="logout-button" onClick={() => dispatch(logout())}>
//             Выйти
//          </button>
//          <AuthForm />
//       </div>
//    );
// }

// export default App;
