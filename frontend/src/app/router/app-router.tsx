import { useRoutes, BrowserRouter } from "react-router-dom";
import routes from "./router";

const AppRouter = () => {
   const element = useRoutes(routes); // Применяем маршруты
   return element;
};

const RouterProvider = () => (
   <BrowserRouter>
      <AppRouter />
   </BrowserRouter>
);

export default RouterProvider;
