import { IoClose } from "react-icons/io5";
import css from "./ModalLogin.module.css";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../../FireBase/auth.js";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function ModalLogin({ toggleModalLogin }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required!"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required!"),
  });

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      toggleModalLogin();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        toggleModalLogin();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleModalLogin]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (values, { setSubmitting }) => {
    const { email, password } = values;
    try {
      await login(email, password);
      toggleModalLogin();
    } catch (err) {
      console.log("Incorrect password or login.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={css.backdrop} onClick={handleOverlayClick}>
      <div className={css.modalContainer}>
        <button onClick={toggleModalLogin} className={css.closeButton}>
          <IoClose size={38} />
        </button>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className={css.loginForm}>
              <div className={css.loginHeader}>
                <h2 className={css.loginHeaderTitle}>Log In</h2>
                <p className={css.loginHeaderText}>
                  Welcome back! Please enter your credentials to access your
                  account and continue your search for an teacher.
                </p>
              </div>

              <div className={css.inputContainer}>
                <label htmlFor="email">
                  <Field
                    className={css.input}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={css.errorMessage}
                  />
                </label>

                <label className={css.label} htmlFor="password">
                  <Field
                    className={css.input}
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Password"
                  />
                  <span
                    className={css.eyeIcon}
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </span>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={css.errorMessage}
                  />
                </label>
              </div>

              <button
                className={css.loginBtn}
                type="submit"
                disabled={isSubmitting}
              >
                Log In
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
