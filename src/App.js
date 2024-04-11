import React, { useState } from "react";
import { AuthProvider } from './pages/authentication/auth'; // Import AuthProvider
import Payment from "./pages/addfunds/Payment";
import Checkusers from "./pages/checkusers/checkusers";
import Login from "./pages/authentication/login";
import Signup from "./pages/authentication/signup";
import "./App.css";

const App = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showFundsModal, setShowFundsModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const togglePaymentModal = () => {
    setShowPaymentModal(!showPaymentModal);
  };

  const toggleFundsModal = () => {
    setShowFundsModal(!showFundsModal);
  };

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const toggleSignupModal = () => {
    setShowSignupModal(!showSignupModal);
  };

  const checkUsers = () => {
    toggleFundsModal(); // Toggle funds modal visibility
  };

  return (
    <AuthProvider> {/* Wrap the entire App component with AuthProvider */}
      <div className="app-container">
        <h1>Welcome to My App</h1>
        <button className="check-users-button" onClick={checkUsers}>
          Check Users
        </button>
        <button className="open-modal-button" onClick={togglePaymentModal}>
          Open Payment Modal
        </button>
        <button className="login-button" onClick={toggleLoginModal}>
          Login
        </button>
        <button className="signup-button" onClick={toggleSignupModal}>
          Signup
        </button>
        {/* Render Payment modal */}
        {showPaymentModal && <Payment toggleModal={togglePaymentModal} />}
        {/* Render Checkfunds modal */}
        {showFundsModal && <Checkusers isOpen={showFundsModal} closeModal={toggleFundsModal} />}
        {/* Render Login modal */}
        {showLoginModal && <Login closeModal={toggleLoginModal} />}
        {/* Render Signup modal */}
        {showSignupModal && <Signup closeModal={toggleSignupModal} />}
      </div>
    </AuthProvider>
  );
};

export default App;
