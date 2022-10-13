import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../../config/authentification";
import "../../styles/index.css";

const SignIn = () => {
  // const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { entryUser, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  // Veriables for the login in info
  const initialValues = {
    email: "",
    password: "",
  };
  // setup for the login in info
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required!"),
    password: Yup.string().required("Password is required!"),
  });

  const handleLogin = (formValue) => {
    const { email, password } = formValue;
    // setLoading(true);
    dispatch(login({ email, password }));
  };

  if (isLoggedIn) {
    return <Navigate to="/user" />;
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1 className="test1">Sign In</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group input-wrapper">
              <label htmlFor="email">Username</label>
              <Field name="email" type="text" className="form-control" />
              <ErrorMessage
                name="email"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="form-group input-wrapper">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-block sign-in-button"
                disabled={loading}
              >
                <span>Sign In</span>
              </button>
            </div>
          </Form>
        </Formik>
      </section>
    </main>
  );
};

export default SignIn;
