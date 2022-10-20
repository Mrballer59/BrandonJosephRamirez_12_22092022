import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../../config/User-slice";
import { useEffect, useState } from "react";
import { editProfile } from "../../config/New-User";
import "../../styles/index.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { rememberMe } from "../../config/authentification";

const User = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { entryUser, loading } = useSelector((state) => state.profile);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [editUserName, setEditUserName] = useState(false);

  const userDataBalance = [
    {
      title: "Argent Bank Checking (x8349)",
      balance: "$2,082.79",
      balanceType: "Available Balance",
    },
    {
      title: "Argent Bank Savings (x6712)",
      balance: "$10,928.42",
      balanceType: "Available Balance",
    },
    {
      title: "Argent Bank Credit Card (x8349)",
      balance: "$184.30",
      balanceType: "Current Balance",
    },
  ];
  const dispatch = useDispatch();

  const saveUser = (inputValue) => {
    const { firstName, lastName } = inputValue;
    dispatch(editProfile({ firstName, lastName }));
    setEditUserName(false);
    dispatch(getProfile());
  };

  useEffect(() => {
    dispatch(getProfile());
    const tokenUser = JSON.parse(localStorage.getItem("token"));
    const checkBoxReminder = localStorage.getItem("rememberMe");
    if (tokenUser && checkBoxReminder) {
      dispatch(rememberMe());
    }
  }, [dispatch]);

  const initialValues = {
    firstName: entryUser === null ? "" : entryUser.body.firstName,
    lastName: entryUser === null ? "" : entryUser.body.lastName,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("This field is required!"),
    lastName: Yup.string().required("This field is required!"),
  });

  if (!isLoggedIn) {
    return <Navigate to="/sign-in" />;
  }
  // console.log("entryUser", entryUser);
  if (entryUser === null) {
    return <p>Loading & getting your profile ready...</p>;
  }
  return (
    <main className="main bg-dark">
      {editUserName === false ? (
        <div className="header">
          <h1>
            Welcome back
            <br />
            {entryUser.body.firstName} {entryUser.body.lastName}!
          </h1>
          <button className="edit-button" onClick={() => setEditUserName(true)}>
            Edit Name
          </button>
        </div>
      ) : (
        <div className="header">
          <h1>
            Welcome back
            <br />
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={saveUser}
          >
            <Form>
              <Field
                name="firstName"
                type="text"
                className="edit-name-input"
                placeholder="First Name"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="alert alert-danger"
              />

              <Field
                name="lastName"
                type="text"
                className="edit-name-input"
                placeholder="Last Name"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="alert alert-danger"
              />
              <div>
                <button
                  className="edit-button edit-name-button"
                  onClick={() => setEditUserName(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="edit-button edit-name-button">
                  Save
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      )}
      <h2 className="sr-only">Accounts</h2>
      {userDataBalance.map((myCount, index) => (
        <section key={index} className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">{myCount.title}</h3>
            <p className="account-amount">{myCount.balance}</p>
            <p className="account-amount-description">{myCount.balanceType}</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      ))}
    </main>
  );
};

export default User;
