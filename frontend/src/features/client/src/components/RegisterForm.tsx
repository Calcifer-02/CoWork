import { useState } from "react";
import { useAppDispatch } from "../../../../redux/store/hooks";
import { registration } from "../../../../redux/store/store";
import styles from "./AuthForm.module.css";

interface RegisterFormProps {
   switchToLogin: () => void;
}
const RegisterForm = ({ switchToLogin }: RegisterFormProps) => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [error, setError] = useState<string | null>(null);
   const dispatch = useAppDispatch();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (password !== confirmPassword) {
         setError("Passwords don't match");
         return;
      }

      setError(null);
      try {
         const result = await dispatch(registration({ email, password }));
         if (registration.rejected.match(result)) {
            setError((result.payload as string) || "Registration failed");
         }
      } catch (err) {
         setError(err instanceof Error ? err.message : "Unknown error");
      }
   };

   return (
      <div className={styles.formContainer}>
         <h2>Sign Up</h2>
         {error && <div className={styles.errorMessage}>{error}</div>}

         <form onSubmit={handleSubmit}>
            <div>
               <label className={styles.label}>Email</label>
               <input
                  className={styles.inputField}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
               />
            </div>

            <div>
               <label className={styles.label}>Password</label>
               <input
                  className={styles.inputField}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
               />
            </div>

            <div>
               <label className={styles.label}>Confirm Password</label>
               <input
                  className={styles.inputField}
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
               />
            </div>

            <button type="submit" className={styles.primaryButton}>
               Sign Up
            </button>
         </form>

         <p className={styles.switchFormText}>
            Already have an account?{" "}
            <button
               type="button"
               className={styles.switchFormLink}
               onClick={switchToLogin}
            >
               Sign In
            </button>
         </p>
      </div>
   );
};

export default RegisterForm;
