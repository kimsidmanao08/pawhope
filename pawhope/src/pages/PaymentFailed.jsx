import { Link } from "react-router-dom";

function PaymentFailed() {
  return (
    <div className="page payment-result">
      <div className="failed-icon">
        ✕
      </div>

      <h1>Payment Failed</h1>

      <p>
        Your GCash payment was not completed.
      </p>

      <p>
        You can try the donation again.
      </p>

      <Link to="/donate" className="btn">
        Try Again
      </Link>
    </div>
  );
}

export default PaymentFailed;