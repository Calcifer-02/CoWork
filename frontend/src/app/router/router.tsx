import { RouteObject } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "../../pages/HomePage/HomePage";
import NotFoundPage from "../../pages/NotFoundPage";
import Profile from "../../pages/Profile/Profile";
import PrivacyPolicy from "../../pages/PrivacyPolicy/PrivacyPolicy";
import WorkspaceList from "../../pages/WorkSpaceList/WorkSpaceList";
import Building from "../../pages/Building/Building";
import TermsOfService from "../../pages/TermsOfService/TermsOfService";
import AuthForm from "../../features/client/src/components/AuthForm";
import HowItWorks from "../../pages/HowItWorks/HowItWorks";
import Admin from "../../pages/Admin/Admin";
import AddSpaceForm from "../../pages/AddSpaceForm/AddSpaceForm";

const routes: RouteObject[] = [
   {
      path: "/",
      element: <MainLayout />,
      children: [
         { index: true, element: <HomePage /> },
         { path: "/profile", element: <Profile /> },
         {
            path: "/search",
            element: (
               <WorkspaceList yandexMapsApiKey="010aa97e-e6ca-48a8-be55-c0e3f5c63ee7" />
            ),
         },
         {
            path: "/building/:id",
            element: (
               <Building yandexMapsApiKey="010aa97e-e6ca-48a8-be55-c0e3f5c63ee7" />
            ),
         },

         { path: "/register", element: <AuthForm /> },
         { path: "/how-it-works", element: <HowItWorks /> },
         { path: "/privacy-policy", element: <PrivacyPolicy /> },
         { path: "/terms-of-service", element: <TermsOfService /> },
         { path: "/add-form", element: <AddSpaceForm /> },
         { path: "*", element: <NotFoundPage /> },
         { path: "/admin", element: <Admin /> },
      ],
   },
];

export default routes;
