import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "../../styles/index.css";
import { useNavigate } from "react-router-dom";
import { userProfile, updateUserData } from "../../auth/authSlice";

const User = () => {
  const { token, firstName, lastName } = useSelector((state) => state.auth);
  const authFirstName = useSelector((state) => state.auth.firstName);
  const authLastName = useSelector((state) => state.auth.lastName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/sign-in");
    }
    navigate("/user");
    dispatch(userProfile());
  }, [token, navigate, dispatch]);

  //Edit input name
  const [editUserNameForm, setEditNameForm] = useState(false);

  const editUserForm = (e) => {
    e.preventDefault();
    setEditNameForm(!editUserNameForm);
  };

  const [updateFirstName, setUpdateFirstName] = useState("");
  const [updateLastName, setUpdateLastName] = useState("");

  const saveForm = (e) => {
    e.preventDefault();
    // dispatch(updateUserData(updateUserName));
    // console.log(updateUserName);
    const userUpdateName = {
      firstName: updateFirstName ? updateFirstName : firstName,
      lastName: updateLastName ? updateLastName : lastName,
    };
    dispatch(updateUserData(userUpdateName));
    console.log(userUpdateName);
    setEditNameForm();
  };
  if (!token) {
    return <Navigate to="/sign-in" />;
  }
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

  //Jsx for the userName switch and the the transaction.
  return (
    <main className="main bg-dark">
      <div className="header">
        <h1 className="blackTitle whiteTitle">Welcome back</h1>
        {editUserNameForm ? (
          <form className="userForm">
            <div className="inputWrapper">
              <label htmlFor="firstName"></label>
              <input
                className="edit-name-input"
                type="text"
                id="firstName"
                name="firstName"
                placeholder={firstName}
                required
                onChange={(e) => setUpdateFirstName(e.target.value)}
              />
              <label htmlFor="lastName"></label>
              <input
                className="edit-name-input"
                type="text"
                id="lastName"
                name="lastName"
                placeholder={lastName}
                required
                onChange={(e) => setUpdateLastName(e.target.value)}
              />
            </div>

            <div className="userButtons">
              <button
                className="edit-button edit-name-button"
                type="submit"
                onClick={editUserForm}
              >
                Cancel
              </button>
              <button
                className="edit-button edit-name-button"
                type="submit"
                onClick={saveForm}
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <div>
            <h1>{authFirstName + " " + authLastName}!</h1>
            <button className="edit-button" onClick={editUserForm}>
              Edit Name
            </button>
          </div>
        )}
      </div>

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
