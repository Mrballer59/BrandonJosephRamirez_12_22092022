import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../../config/User-slice";
import { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { editProfile } from "../../config/New-User";
import "../../styles/index.css";
const User = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { entryUser, loading } = useSelector((state) => state.profile);
  const [editUserName, setEditUserName] = useState(false);
  const dispatch = useDispatch();
  const saveUser = (inputValue) => {
    const { firstName, lastName } = inputValue;
    dispatch(editProfile({ firstName, lastName }));
    setEditUserName((editUserName) => false);
    dispatch(getProfile());
  };

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const initialValues = {
    firstName: "",
    lastName: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("This field is required!"),
    lastName: Yup.string().required("This field is required!"),
  });
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

  if (!currentUser) {
    return <Navigate to="/sign-in" />;
  }
  console.log("entryUser", entryUser);
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
            {entryUser.body.firstName} {entryUser.body.lastName} !
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
          {/* <form>
            <p>
              <input
                className="edit-name-input"
                placeholder="First Name"
                defaultValue={entryUser.body.firstName}
              />
              <input
                className="edit-name-input"
                placeholder="Second Name"
                defaultValue={entryUser.body.lastName}
              />
            </p>
            <button
              className="edit-button"
              onClick={() => setEditUserName(false)}
            >
              Cancel
            </button>
            <button type="submit" className="edit-button">
              Save
            </button>
          </form> */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={saveUser}
          >
            <Form>
              {/* <div className="form-group input-wrapper">
                <label htmlFor="firstName">First Name</label> */}
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
              {/* </div> */}
              {/* <div className="form-group input-wrapper">
                <label htmlFor="lastName">Last Name</label> */}
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
              {/* </div> */}
              <div className="form-group">
                <button
                  className="edit-button edit-name-button"
                  onClick={() => setEditUserName(false)}
                >
                  Cancel
                </button>
              </div>
              <div className="form-group">
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
