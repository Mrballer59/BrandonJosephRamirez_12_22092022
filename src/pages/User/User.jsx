import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const User = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  console.log(currentUser);
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.user}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.body.token}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
    </div>
  );
};

export default User;

// <div className="user-page">
//     //   <main className="main bg-dark">
//     //     <div className="header">
//     //       <h1>
//     //         Welcome back
//     //         <br />
//     //         Brandon Joseph
//     //       </h1>
//     //       <button className="edit-button">Edit Name</button>
//     //     </div>
//     //     <h2 className="sr-only">Accounts</h2>
//     //     <section className="account">
//     //       <div className="account-content-wrapper">
//     //         <h3 className="account-title">Argent Bank Checking (x8349)</h3>
//     //         <p className="account-amount">$2,082.79</p>
//     //         <p className="account-amount-description">Available Balance</p>
//     //       </div>
//     //       <div className="account-content-wrapper cta">
//     //         <button className="transaction-button">View transactions</button>
//     //       </div>
//     //     </section>
//     //     <section className="account">
//     //       <div className="account-content-wrapper">
//     //         <h3 className="account-title">Argent Bank Savings (x6712)</h3>
//     //         <p className="account-amount">$10,928.42</p>
//     //         <p className="account-amount-description">Available Balance</p>
//     //       </div>
//     //       <div className="account-content-wrapper cta">
//     //         <button className="transaction-button">View transactions</button>
//     //       </div>
//     //     </section>
//     //     <section className="account">
//     //       <div className="account-content-wrapper">
//     //         <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
//     //         <p className="account-amount">$184.30</p>
//     //         <p className="account-amount-description">Current Balance</p>
//     //       </div>
//     //       <div className="account-content-wrapper cta">
//     //         <button className="transaction-button">View transactions</button>
//     //       </div>
//     //     </section>
//     //   </main>
//     // </div>
