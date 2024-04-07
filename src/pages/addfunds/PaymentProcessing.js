import React from "react";
import "./PaymentProcessing.css"; // Corrected file name

const PaymentProcessing = ({ toggleModal, success, error }) => {
  return (
    <div className="payment-processing-modal-overlay">
      <div className="payment-processing-modal-container">
        <div className="payment-processing-modal-content">
          <h2>Processing Payment</h2>
          {success ? (
            <p>Your payment was successful!</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <p>Processing your payment...</p>
          )}
          <button className="close-modal" onClick={toggleModal}>
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;