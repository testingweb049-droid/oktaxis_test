"use server";

import { Client, Environment } from "square";
import { randomUUID } from "crypto";

// Initialize Square client only when access token is available (lazy initialization)
function getSquareClient() {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN || "EAAAl0j-ptaxRP-CjeWgOkd091xw8Fh2hPMnKvwsXuBAF6ygarJT5tEE9k-xHPWn";
  
  if (!accessToken) {
    throw new Error("Square access token is not configured");
  }

  return new Client({
    accessToken,
    environment: process.env.SQUARE_ENVIRONMENT === "production" ? Environment.Production : Environment.Sandbox,
  });
}

// Function to process Square payments
export async function processSquarePayment({
  sourceId,
  amount,
}: {
  sourceId: string;
  amount: number;
}) {
  try {
    // Check if Square is configured
    const accessToken = process.env.SQUARE_ACCESS_TOKEN || "EAAAl0j-ptaxRP-CjeWgOkd091xw8Fh2hPMnKvwsXuBAF6ygarJT5tEE9k-xHPWn";
    if (!accessToken) {
      return { success: false, error: "Payment service is not configured" };
    }

    const squareClient = getSquareClient();
    const paymentsApi = squareClient.paymentsApi;
    
    const response = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId,
      amountMoney: {
        amount: amount * 100, // Convert to cents
        currency: "GBP",
      },
    });

    return { success: true, paymentId: response.result.payment?.id };
  } catch (error) {
    console.error("Square Payment Error:", error);
    return { success: false, error: "Payment failed" };
  }
}
