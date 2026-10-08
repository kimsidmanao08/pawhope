import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { encryptAES } from "../cryptoUtils";

function Donate() {
  const [amount, setAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const navigate = useNavigate();

  // Step 1: Encrypt and open the QR Modal (DO NOT REDIRECT YET)
  const handleInitiatePayment = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    setLoading(true);

    try {
      // 1. Encrypt email address
      const encryptedEmail = email ? await encryptAES(email) : "";
      console.log("Encrypted Donor Email Payload:", encryptedEmail);

      // 2. Open the QR Modal
      setLoading(false);
      setShowQRModal(true);
    } catch (error) {
      console.error("Encryption Error:", error);
      alert("An error occurred while securing your details.");
      setLoading(false);
    }
  };

  // Step 2: Handle button inside the Modal to finalize transaction
  const handleConfirmPayment = () => {
    setLoading(true);

    // 2-second simulation delay before redirecting
    setTimeout(() => {
      setLoading(false);
      setShowQRModal(false);
      navigate("/payment-success");
    }, 2000);
  };

  return (
    <div className="page">
      <h1>Donate to PawHope 🐾</h1>

      <p>
        Your donation can help provide food, medicine, shelter, and rescue
        support for stray cats and dogs.
      </p>

      <form className="donation-form" onSubmit={handleInitiatePayment}>
        <label>Donor Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Donation Amount</label>
        <input
          type="number"
          min="1"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <div className="amount-buttons">
          <button type="button" onClick={() => setAmount(100)}>
            ₱100
          </button>
          <button type="button" onClick={() => setAmount(500)}>
            ₱500
          </button>
          <button type="button" onClick={() => setAmount(1000)}>
            ₱1,000
          </button>
        </div>

        <div className="gcash-box">
          <h2>GCash Payment</h2>
          <p>
            You will be presented with a GCash QR Code to complete your donation.
          </p>
          <div className="gcash-icon">💚</div>
          <p>
            Payment method: <strong>GCash</strong>
          </p>
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Generating Payment QR..." : "💚 Pay with GCash"}
        </button>
      </form>

      {/* --- GCash Modal Prompt --- */}
      {showQRModal && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <div style={headerStyle}>
              <h2 style={{ margin: 0, fontSize: "18px", color: "#fff" }}>
                GCash Payment Portal
              </h2>
            </div>

            <div style={{ padding: "20px", color: "#333" }}>
              <p style={{ margin: "5px 0" }}>Amount to Pay:</p>
              <h1 style={{ color: "#005ce6", margin: "5px 0" }}>₱{amount}.00</h1>
              <p style={{ fontSize: "14px", color: "#666" }}>
                Donor: <strong>{donorName || "Anonymous"}</strong>
              </p>

              <div style={{ margin: "15px 0" }}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://pawhope.vercel.app/pay?amount=${amount}`}
                  alt="GCash Payment QR Code"
                  style={{ border: "2px solid #005ce6", borderRadius: "8px", padding: "5px" }}
                />
              </div>

              <p style={{ fontSize: "12px", color: "#666", marginBottom: "15px" }}>
                Scan with GCash or click below to simulate payment.
              </p>

              <button
                onClick={handleConfirmPayment}
                disabled={loading}
                style={primaryBtnStyle}
              >
                {loading ? "Verifying Transaction..." : "Simulate Paid Transaction"}
              </button>

              <button
                onClick={() => setShowQRModal(false)}
                disabled={loading}
                style={cancelBtnStyle}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Modal Styles
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.75)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modalStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  width: "90%",
  maxWidth: "380px",
  textAlign: "center",
  overflow: "hidden",
  boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
};

const headerStyle = {
  backgroundColor: "#005ce6",
  padding: "15px",
};

const primaryBtnStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#005ce6",
  color: "#ffffff",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  fontSize: "15px",
  cursor: "pointer",
  marginBottom: "8px",
};

const cancelBtnStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#e0e0e0",
  color: "#333333",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  fontSize: "14px",
  cursor: "pointer",
};

export default Donate;