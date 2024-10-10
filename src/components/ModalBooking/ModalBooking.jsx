import { IoClose } from "react-icons/io5";
import css from "./ModalBooking.module.css";
import { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

export const ModalBooking = ({ onClose, teacher }) => {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const validationSchema = Yup.object().shape({
    reason: Yup.string().required("Please select a reason"),
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      toast.success("Booking request sent successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to send booking request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={css.backdrop} onClick={handleOverlayClick}>
      <div className={css.modalContainer}>
        <button className={css.closeButton} onClick={onClose}>
          <IoClose size={38} />
        </button>
        <h1>Book trial lesson</h1>
        <p className={css.description}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>

        <div className={css.teacherInfo}>
          <img
            src={teacher.avatar_url}
            alt={teacher.name}
            className={css.teacherPhoto}
          />
          <div className={css.teacherDetails}>
            <span className={css.teacherDetailsSpan}>Your teacher</span>
            <h2>
              {teacher.name} {teacher.surname}
            </h2>
          </div>
        </div>

        <Formik
          initialValues={{
            reason: "",
            fullName: "",
            email: "",
            phoneNumber: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={css.form}>
              <p>What is your main reason for learning English?</p>

              <div className={css.radioGroup}>
                <label className={css.radio}>
                  <Field type="radio" name="reason" value="career" />
                  Career and business
                </label>

                <label className={css.radio}>
                  <Field type="radio" name="reason" value="kids" />
                  Lesson for kids
                </label>

                <label className={css.radio}>
                  <Field type="radio" name="reason" value="abroad" />
                  Living abroad
                </label>

                <label className={css.radio}>
                  <Field type="radio" name="reason" value="exams" />
                  Exams and coursework
                </label>

                <label className={css.radio}>
                  <Field type="radio" name="reason" value="hobby" />
                  Culture, travel or hobby
                </label>
              </div>
              <ErrorMessage
                name="reason"
                component="div"
                className={css.errorMessage}
              />
              <div className={css.inputContainer}>
                <label className={css.label} htmlFor="fullName">
                  {" "}
                  <Field
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    className={css.inputField}
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className={css.errorMessage}
                  />
                </label>
                <label className={css.label} htmlFor="email">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={css.inputField}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={css.errorMessage}
                  />
                </label>
                <label className={css.label} htmlFor="phoneNumber">
                  <Field
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone number"
                    className={css.inputField}
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className={css.errorMessage}
                  />
                </label>
              </div>

              <button
                type="submit"
                className={css.submitButton}
                disabled={isSubmitting}
              >
                Book
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
