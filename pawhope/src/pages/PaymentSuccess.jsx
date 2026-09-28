import { Link } from "react-router-dom";

function PaymentSuccess() {
  return (
    <div className="page payment-result">
      <div className="success-icon">
        ✓
      </div>

      <h1>Thank You! 🐾</h1>

      <p>
        Your PawHope donation payment was completed.
      </p>

      <p>
        Thank you for helping stray cats and dogs.
      </p>

      <Link to="/" className="btn">
        Back to Home
      </Link>
    </div>
  );
}

export default PaymentSuccess;