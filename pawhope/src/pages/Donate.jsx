import { useState } from "react";
import { encryptAES } from "../cryptoUtils";

function Donate() {
  const [amount, setAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGCashPayment = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    setLoading(true);

    try {
      // Encrypt email input before payload transmission
      const encryptedEmail = email ? await encryptAES(email) : "";

      const response = await fetch("/api/create-payment", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          amount: Number(amount),
          donorName,
          email: encryptedEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);

        alert(
          data.message ||
            "Unable to create the payment."
        );

        setLoading(false);
        return;
      }

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        alert("Payment URL was not received.");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong. Please try again."
      );

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
          onChange={(e) =>
            setDonorName(e.target.value)
          }
        />

        <label>Email</label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <label>Donation Amount</label>

        <input
          type="number"
          min="1"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
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
            ? "Creating Payment..."
            : "💚 Pay with GCash"}
        </button>
      </form>
    </div>
  );
}

export default Donate;