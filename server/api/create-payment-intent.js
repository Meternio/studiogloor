import { useServerStripe } from "#stripe/server";
import { getAppCheck } from "firebase-admin/app-check";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

if (admin.apps.length === 0) {
  initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const calculateOrderAmount = async (user_token) => {
  const user = await getAuth().verifyIdToken(user_token);
  const snapShot = await getFirestore()
    .collection("basket")
    .doc(user.uid)
    .get();
  if (snapShot.exists) {
    const products = snapShot.data().products || {};

    // iteratoe over basket keys and calculate total
    let total = 0;
    for (const key in products) {
      total += parseFloat(products[key].price);
    }

    return  Math.round(total * 100);
  }

  return null;
};

export default defineEventHandler(async (event) => {
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
  const { user_token } = await readBody(event);

  // Create a PaymentIntent with the order amount and currency
  const total = await calculateOrderAmount(user_token);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "chf",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    total,
  };
});
