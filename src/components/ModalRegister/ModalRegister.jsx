import { IoClose } from "react-icons/io5";
import css from "./ModalRegister.module.css";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { register } from "../../FireBase/auth.js";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function ModalRegister({ toggleModalRegister }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      toggleModalRegister();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        toggleModalRegister();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleModalRegister]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required!"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required!"),
  });

  const handleRegister = async (values, { setSubmitting }) => {
    const { name, email, password } = values;
    try {
      await register(name, email, password);
      toggleModalRegister();
    } catch (err) {
      console.log("Error during registration.", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={css.backdrop} onClick={handleOverlayClick}>
      <div className={css.modalContainer}>
        <button onClick={toggleModalRegister} className={css.closeButton}>
          <IoClose size={38} />
        </button>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ isSubmitting }) => (
            <Form className={css.loginForm}>
              <div className={css.loginHeader}>
                <h2 className={css.loginHeaderTitle}>Registration</h2>
                <p className={css.loginHeaderText}>
                  Thank you for your interest in our platform! In order to
                  register, we need some information. Please provide us with the
                  following information.
                </p>
              </div>

              <div className={css.inputContainer}>
                <label htmlFor="name">
                  <Field
                    className={css.input}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={css.errorMessage}
                  />
                </label>

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
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
