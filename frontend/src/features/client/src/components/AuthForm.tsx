import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useAppDispatch } from "../../../../redux/store/hooks";

const AuthForm = () => {
   const [isLogin, setIsLogin] = useState(true);
   const dispatch = useAppDispatch();

   if (!dispatch) {
      console.error("Redux store not available!");
      return <div>Loading...</div>;
   }

   return (
      <div>
         {isLogin ? (
            <LoginForm switchToRegister={() => setIsLogin(false)} />
         ) : (
            <RegisterForm switchToLogin={() => setIsLogin(true)} />
         )}
      </div>
   );
};

export default AuthForm;
