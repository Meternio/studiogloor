import { useServerStripe } from '#stripe/server';
import { getAppCheck } from "firebase-admin/app-check";
import { initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";

const serviceAccount = JSON.parse(
  process.env.GOOGLE_APPLICATION_CREDENTIALS
);

if (admin.apps.length === 0) {
  initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1000;
};

export default defineEventHandler(async (event) => {
  const appCheckToken = event.headers.get('x-firebase-appcheck-token');

  if (!appCheckToken) {
    return { error: "not authorized" };
  }

  try {
    await getAppCheck().verifyToken(appCheckToken);
  } catch (err) {
    return { error: "token invalid" };
  }

  const stripe = await useServerStripe(event);
  const { items } = await readBody(event);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "chf",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
  };
})