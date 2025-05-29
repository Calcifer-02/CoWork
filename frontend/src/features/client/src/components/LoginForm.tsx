import { useState } from "react";
import { useAppDispatch } from "../../../../redux/store/hooks";
import { login, registration } from "../../../../redux/store/store";
import styles from "./LoginForm.module.css";

interface LoginFormProps {
   switchToRegister: () => void;
}
const LoginForm = ({ switchToRegister }: LoginFormProps) => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [rememberMe, setRememberMe] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const dispatch = useAppDispatch();

   const handleAction = async (action: typeof login | typeof registration) => {
      setError(null);
      try {
         const result = await dispatch(action({ email, password }));
         if (action.fulfilled.match(result)) {
            console.log("Success:", result.payload);
         } else if (action.rejected.match(result)) {
            setError((result.payload as string) || "An error occurred");
         }
      } catch (err) {
         if (err instanceof Error) {
            setError(err.message);
         } else {
            setError("Unknown error");
         }
      }
   };

   return (
      <div className={styles.formContainer}>
         {error && <div className={styles.errorMessage}>{error}</div>}
         <h2>Sign In</h2>
         <div>
            <label className={styles.label}>Enter your Email</label>
            <input
               className={styles.inputField}
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
         </div>

         <div>
            <label className={styles.label}>Enter your Password</label>
            <input
               className={styles.inputField}
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
         </div>

         <div className={styles.rememberMe}>
            <input
               type="checkbox"
               id="rememberMe"
               checked={rememberMe}
               onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Remember me</label>
            <a href="#" className={styles.forgotPassword}>
               Forgot password?
            </a>
         </div>

         <button
            className={styles.signInButton}
            type="button"
            onClick={() => handleAction(login)}
         >
            Sign In
         </button>

         <p className={styles.switchFormText}>
            Don't have an account?{" "}
            <button
               type="button"
               className={styles.switchFormLink}
               onClick={switchToRegister}
            >
               Sign Up
            </button>
         </p>

         <div className={styles.divider}>
            <span className={styles.dividerText}>Or With</span>
         </div>

         <button className={styles.socialButton} type="button">
            <svg
               width="16"
               height="16"
               viewBox="0 0 24 24"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z"
                  fill="#4285F4"
               />
               <path
                  d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.14 18.63 6.71 16.7 5.84 14.1H2.18V16.94C4 20.53 7.7 23 12 23Z"
                  fill="#34A853"
               />
               <path
                  d="M5.84 14.1C5.62 13.43 5.49 12.72 5.49 12C5.49 11.28 5.62 10.57 5.84 9.9V7.06H2.18C1.43 8.55 1 10.22 1 12C1 13.78 1.43 15.45 2.18 16.94L5.84 14.1Z"
                  fill="#FBBC05"
               />
               <path
                  d="M12 5.38C13.62 5.38 15.06 5.94 16.21 7.02L19.36 3.87C17.45 2.09 14.97 1 12 1C7.7 1 4 3.47 2.18 7.06L5.84 9.9C6.71 7.3 9.14 5.38 12 5.38Z"
                  fill="#EA4335"
               />
            </svg>
            Google
         </button>

         <button className={styles.socialButton} type="button">
            <svg
               width="16"
               height="16"
               viewBox="0 0 24 24"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09999 22C7.78999 22.05 6.79999 20.68 5.95999 19.47C4.24999 16.91 2.93999 12.08 4.69999 9.27C5.56999 7.79 7.12999 6.91 8.81999 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.5C17.44 15.28 20.06 16.31 20.09 16.32C20.06 16.4 19.67 17.99 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"
                  fill="black"
               />
            </svg>
            Apple
         </button>
      </div>
   );
};

export default LoginForm;
