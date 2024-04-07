import React, { useState } from "react";
import PaymentProcessing from "./PaymentProcessing";
import "./payment.css";

const Payment = ({ toggleModal }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [showProcessing, setShowProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(true); // Initially show payment modal
  const [transactionStatus] = useState(""); // Transaction status message

  // Define the API key here
  const apiKey = 'FBbLzy7uc41';

  const pay = () => {
    // Close the payment modal
    setShowPaymentModal(false);
    // Show the PaymentProcessing modal
    setShowProcessing(true);
    
    // Construct the request body for Tinypesa API
    const requestBody = new URLSearchParams({
      amount: amount,
      msisdn: phoneNumber,
      account_no: "200",
    });

    // Make the payment request to Tinypesa API
    fetch("https://tinypesa.com/api/v1/express/initialize", {
      method: "POST",
      headers: {
        Apikey: apiKey,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: requestBody.toString(),
    })
    .then(response => {
      if (!response.ok) {
        console.error("Payment processing failed");
      }
      // Show PaymentProcessing modal immediately after initializing payment
      setShowProcessing(true);
      return response.json();
    })
    .catch(error => {
      console.error("Error during payment processing:", error);
    });
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <>
      {showPaymentModal && ( // Conditionally render payment modal
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <h2>Payment Details</h2>
              <form>
                <div className="input-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    type="text"
                    placeholder="254"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="amount">Amount</label>
                  <input
                    id="amount"
                    type="text"
                    placeholder="Amount"
                    value={amount}
                    onChange={handleAmountChange}
                  />
                </div>
                <button type="button" className="pay-button" onClick={pay}>
                  Donate
                </button>
              </form>
              <button className="close-modal" onClick={toggleModal}>
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
      {showProcessing && <PaymentProcessing toggleModal={toggleModal} />}
      {transactionStatus && <div className="transaction-status">{transactionStatus}</div>}
    </>
  );
};

export default Payment;
