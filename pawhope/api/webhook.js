export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    const callbackToken =
      req.headers["x-callback-token"];

    if (
      process.env.XENDIT_WEBHOOK_TOKEN &&
      callbackToken !==
        process.env.XENDIT_WEBHOOK_TOKEN
    ) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const event = req.body;

    console.log(
      "Xendit webhook received:",
      JSON.stringify(event, null, 2)
    );

    if (event.event === "payment.capture") {
      const payment = event.data;

      console.log(
        "PAYMENT SUCCESSFUL:",
        payment.reference_id
      );

      /*
        Later we will update the database here.

        Example:

        donation.status = "PAID";
      */
    }

    if (event.event === "payment.failure") {
      const payment = event.data;

      console.log(
        "PAYMENT FAILED:",
        payment.reference_id
      );

      /*
        Later:

        donation.status = "FAILED";
      */
    }

    return res.status(200).json({
      received: true,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Webhook error",
    });
  }
}