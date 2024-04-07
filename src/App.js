import React, { useState } from "react";
import Payment from "./pages/addfunds/Payment"; // Import the Payment component
import "./App.css"; // Import your CSS file if needed

const App = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false); // Initially hide payment modal

  const toggleModal = () => {
    setShowPaymentModal(!showPaymentModal); // Toggle modal visibility
  };

  return (
    <div className="app-container">
      <h1>Welcome to My App</h1>
      <button className="open-modal-button" onClick={toggleModal}>
        Open Payment Modal
      </button>
      {showPaymentModal && <Payment toggleModal={toggleModal} />} {/* Render Payment modal if showPaymentModal is true */}
    </div>
  );
};

export default App;
