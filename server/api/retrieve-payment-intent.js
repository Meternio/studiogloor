import { useServerStripe } from "#stripe/server";
import { getAppCheck } from "firebase-admin/app-check";
import { getApp, initializeApp, cert } from "firebase-admin/app";

export default defineEventHandler(async (event) => {
  const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

  try {
    getApp();
  } catch (err) {
    initializeApp({
      credential: cert(serviceAccount),
    });
  }

  const appCheckToken = event.headers.get("x-firebase-appcheck-token");

  if (!appCheckToken) {
    return { error: "not authorized" };
  }

  try {
    await getAppCheck().verifyToken(appCheckToken);
  } catch (err) {
    return { error: "token invalid" };
  }

  const stripe = await useServerStripe(event);
  const { payment_intent } = event.req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

  return {
    paymentIntent,
  };
});
