import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { encryptAES } from "../cryptoUtils";

function Donate() {
  const [amount, setAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [encryptedData, setEncryptedData] = useState("");
  const navigate = useNavigate();

  // Step 1: Handle form submit and generate encryption
  const handleInitiatePayment = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    setLoading(true);

    try {
      // Encrypt donor's sensitive email using AES-256-GCM
      const encryptedEmail = email ? await encryptAES(email) : "";
      setEncryptedData(encryptedEmail);

      // Open the GCash QR Modal prompt
      setLoading(false);
      setShowQRModal(true);
    } catch (error) {
      console.error("Encryption Error:", error);
      alert("An error occurred while securing your details.");
      setLoading(false);
    }
  };

  // Step 2: Confirm simulated payment inside Modal
  const handleConfirmPayment = () => {
    setLoading(true);

    // Simulate GCash transaction verification delay (2 seconds)
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
        Your donation can help provide food, medicine,
        shelter, and rescue support for stray cats and dogs.
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

      {/* --- GCash QR Code Overlay / Modal --- */}
      {showQRModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <div style={{ background: "#005ce6", padding: "15px", color: "#fff", borderRadius: "8px 8px 0 0" }}>
              <h2 style={{ margin: 0, fontSize: "20px" }}>GCash Payment Portal</h2>
            </div>

            <div style={{ padding: "20px", color: "#333" }}>
              <p style={{ margin: "5px 0" }}>Amount to Pay:</p>
              <h1 style={{ color: "#005ce6", margin: "5px 0" }}>₱{amount}.00</h1>
              <p style={{ fontSize: "14px", color: "#666" }}>
                Donor: <strong>{donorName || "Anonymous"}</strong>
              </p>

              {/* Dynamic QR Code Generator */}
              <div style={{ margin: "20px 0" }}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://pawhope.vercel.app/pay?amount=${amount}`}
                  alt="GCash Payment QR Code"
                  style={{ border: "2px solid #005ce6", borderRadius: "8px", padding: "5px" }}
                />
              </div>

              <p style={{ fontSize: "12px", color: "#888" }}>
                Scan with your GCash App to pay or click simulate payment below.
              </p>

              <button
                onClick={handleConfirmPayment}
                disabled={loading}
                style={modalButtonStyle}
              >
                {loading ? "Verifying Transaction..." : "Simulate Paid Transaction"}
              </button>

              <button
                onClick={() => setShowQRModal(false)}
                disabled={loading}
                style={{ ...modalButtonStyle, background: "#ccc", color: "#333", marginTop: "8px" }}
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

// Simple inline styles for modal overlay
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.75)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: "#fff",
  borderRadius: "10px",
  width: "90%",
  maxWidth: "400px",
  textAlign: "center",
  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
};

const modalButtonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#005ce6",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
};

export default Donate;