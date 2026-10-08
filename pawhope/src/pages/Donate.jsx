import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { encryptAES } from "../cryptoUtils";

function Donate() {
  const [amount, setAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGCashPayment = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    setLoading(true);

    try {
      // 1. Encrypt sensitive donor email using AES-256-GCM
      const encryptedEmail = email ? await encryptAES(email) : "";

      const payloadToSend = {
        amount: Number(amount),
        donorName: donorName || "Anonymous Donor",
        email: encryptedEmail,
      };

      console.log("Processing secure payment payload:", payloadToSend);

      // 2. Simulate server communication delay (1.5 seconds)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 3. Direct success redirect (simulates successful GCash checkout)
      setLoading(false);
      navigate("/payment-success");
    } catch (error) {
      console.error("Payment processing error:", error);
      alert("Something went wrong with processing the donation.");
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Donate to PawHope 🐾</h1>

      <p>
        Your donation can help provide food, medicine,
        shelter, and rescue support for stray cats and dogs.
      </p>

      <form
        className="donation-form"
        onSubmit={handleGCashPayment}
      >
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
          <button
            type="button"
            onClick={() => setAmount(100)}
          >
            ₱100
          </button>

          <button
            type="button"
            onClick={() => setAmount(500)}
          >
            ₱500
          </button>

          <button
            type="button"
            onClick={() => setAmount(1000)}
          >
            ₱1,000
          </button>
        </div>

        <div className="gcash-box">
          <h2>GCash Payment</h2>

          <p>
            You will be redirected to the secure
            payment page to complete your donation.
          </p>

          <div className="gcash-icon">
            💚
          </div>

          <p>
            Payment method: <strong>GCash</strong>
          </p>
        </div>

        <button
          type="submit"
          className="btn"
          disabled={loading}
        >
          {loading
            ? "Processing GCash Payment..."
            : "💚 Pay with GCash"}
        </button>
      </form>
    </div>
  );
}

export default Donate;