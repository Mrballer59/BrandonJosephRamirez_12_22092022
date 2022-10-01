import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../../config/authentification";
import { clearMessage } from "../../config/message";
import "../../styles/index.css";

const SignIn = (props) => {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
    document.title = "Argent Bank -logn-in page";
  }, [dispatch]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationPath = Yup.object().shape({
    email: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue) => {
    const { email, password } = formValue;
    setLoading(true);
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        props.history.push("/user");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/user" />;
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <Formik
          initialValues={initialValues}
          validationPath={validationPath}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group input-wrapper">
              <label htmlFor="username">Username</label>
              <Field name="email" type="text" className="form-control" />
              <ErrorMessage
                name="email"
                component="div"
                className="alert alert-danger"
              />
              {/* <input type="text" id="username" /> */}
            </div>
            <div className="form-group input-wrapper">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
              {/* <input type="password" id="password" /> */}
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
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Sign In</span>
              </button>
            </div>
          </Form>
        </Formik>
        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default SignIn;
