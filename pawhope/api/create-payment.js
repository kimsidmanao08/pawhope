export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    const { amount, donorName, email } = req.body;

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      return res.status(400).json({
        message: "Invalid donation amount.",
      });
    }

    const referenceId =
      "PAWHOPE-" +
      Date.now() +
      "-" +
      Math.random().toString(36).substring(2, 8).toUpperCase();

    const auth = Buffer.from(
      `${process.env.XENDIT_SECRET_KEY}:`
    ).toString("base64");

    const paymentRequest = {
      reference_id: referenceId,

      type: "PAY",

      country: "PH",

      currency: "PHP",

      request_amount: numericAmount,

      capture_method: "AUTOMATIC",

      channel_code: "GCASH",

      channel_properties: {
        success_return_url:
          "https://YOUR-VERCEL-DOMAIN.vercel.app/payment-success",

        failure_return_url:
          "https://YOUR-VERCEL-DOMAIN.vercel.app/payment-failed",
      },

      description: "PawHope Donation",

      metadata: {
        donor_name: donorName || "Anonymous",
        donor_email: email || "",
        project: "PawHope",
      },
    };

    const response = await fetch(
      "https://api.xendit.co/v3/payment_requests",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Basic ${auth}`,

          "api-version": "2024-11-11",
        },

        body: JSON.stringify(paymentRequest),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Xendit error:", data);

      return res.status(response.status).json({
        message: "Unable to create payment.",
        error: data,
      });
    }

    const redirectAction = data.actions?.find(
      (action) => action.type === "REDIRECT_CUSTOMER"
    );

    if (!redirectAction) {
      return res.status(500).json({
        message: "No payment redirect URL was returned.",
        data,
      });
    }

    return res.status(200).json({
      success: true,

      paymentUrl: redirectAction.value,

      paymentRequestId: data.payment_request_id,

      referenceId: data.reference_id,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error.",
      error: error.message,
    });
  }
}