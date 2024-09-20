import { IoClose } from "react-icons/io5";
import css from "./ModalLogIn.module.css";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ModalLogIn({ toggleModal }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        toggleModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleModal]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className={css.backdrop} onClick={handleOverlayClick}>
      <div className={css.modalContainer}>
        <button onClick={toggleModal} className={css.closeButton}>
          <IoClose size={38} />
        </button>
        <form className={css.loginForm}>
          <div className={css.loginHeader}>
            <h2 className={css.loginHeaderTitle}>Log In</h2>
            <p className={css.loginHeaderText}>
              Welcome back! Please enter your credentials to access your account
              and continue your search for an teacher.
            </p>
          </div>
          <div className={css.inputContainer}>
            <label htmlFor="email">
              <input
                className={css.input}
                type="email"
                id="email"
                placeholder="Email"
              />
            </label>
            <label className={css.label} htmlFor="password">
              <input
                className={css.input}
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="Password"
              />
              <span className={css.eyeIcon} onClick={togglePasswordVisibility}>
                {passwordVisible ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <FaEye size={20} />
                )}
              </span>
            </label>
          </div>
          <button className={css.loginBtn}>Log In</button>
        </form>
      </div>
    </div>
  );
}
