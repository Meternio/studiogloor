import { useServerStripe } from "#stripe/server";
import { getAppCheck } from "firebase-admin/app-check";
import {
  getApp,
  initializeApp,
  cert,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

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
    let slugs = '';
    let keys = Object.keys(products);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      total += parseFloat(products[key].price);
      slugs += 'https://studiogloor.ch' + products[key].slug;
      if (i !== keys.length - 1) {
        slugs += ", ";
      }
    }

    return { total: Math.round(total * 100), slugs };
  }

  return null;
};

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
    return { error: err };
  }

  const stripe = await useServerStripe(event);
  const { user_token } = await readBody(event);

  // Create a PaymentIntent with the order amount and currency
  const { total, slugs } = await calculateOrderAmount(user_token);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "chf",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      slugs
    }
  });

  return {
    clientSecret: paymentIntent.client_secret,
    total,
  };
});
