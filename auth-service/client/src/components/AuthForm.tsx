import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthForm = () => {
   const [isLogin, setIsLogin] = useState(true);

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
