import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, isRememberMe } from "../../auth/authSlice";
import "../../styles/index.css";

const SignIn = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isError, isSuccess, rememberMe, token } = useSelector(
    (state) => state.auth
  );
  // Veriables for the login in info
  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/user");
    }
  }, [isSuccess, navigate]);

  const handleRememberMe = (e) => {
    dispatch(isRememberMe(e.target.checked));
  };

  const submitForm = (form) => {
    dispatch(login(form));
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required!"),
    password: Yup.string().required("Password is required!"),
  });

  if (rememberMe === true) {
    localStorage.setItem("token", token);
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit(submitForm)}
        >
          <Form className="form" onSubmit={handleSubmit(submitForm)}>
            {isError && <div>Connexion error </div>}
            <div className="form-group input-wrapper">
              <label htmlFor="email">Username</label>
              <input
                {...register("email", { required: true })}
                name="email"
                type="text"
                id="email"
                className="form-control"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-group input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                {...register("password", { required: true })}
                name="password"
                type="password"
                className="form-control"
                id="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                name="rememberMeBox"
                onChange={handleRememberMe}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button
              className="btn btn-primary btn-block sign-in-button"
              type="submit"
            >
              Sign In
            </button>
          </Form>
        </Formik>
      </section>
    </main>
  );
};

export default SignIn;
