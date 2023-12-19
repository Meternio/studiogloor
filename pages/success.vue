<script setup>
import { useAppCheck } from "vuefire";
import { getToken } from "firebase/app-check";
import { useBasketStore } from "@/stores/basketStore";

const route = useRoute();
const appCheck = useAppCheck();
const basketStore = useBasketStore();
const paymentIntent = ref(null);
const succeeded = ref(false);

if (route.query.redirect_status === "succeeded") {
  succeeded.value = true;

  // Get the Firebase App Check token from the server
  const appCheckTokenResponse = await getToken(appCheck, false).catch(
    (error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    }
  );

  if (appCheckTokenResponse) {
    basketStore.removeAllFromBasket();
    const { data } = await useFetch("/api/retrieve-payment-intent", {
      body: {
        payment_intent: route.query.payment_intent,
      },
      headers: {
        "Content-Type": "application/json",
        "X-Firebase-AppCheck-Token": appCheckTokenResponse.token,
      },
    });
    paymentIntent.value = data.value.paymentIntent;
  }
} else {
  succeeded.value = false;
}
</script>

<template>
  <div>
    <div v-if="succeeded">
      <PageTitle :blok="{ headline: 'Payment succeeded', tag: 'h1' }" />
      <div class="my-24 font-bold text-center">
        <p>
          Thank you for your order! Your order number is {{ paymentIntent.id }}.<br />
          We recieved your payment of {{  (paymentIntent.amount_received / 100).toFixed(2)}} {{ paymentIntent.currency.toUpperCase() }}.  You will receive an email confirmation shortly.<br />
          Your order will be shipped to {{ paymentIntent.shipping.name }} at {{ paymentIntent.shipping.address.line1 }}, {{ paymentIntent.shipping.address.postal_code }} {{ paymentIntent.shipping.address.city }}.
        </p>
        <NuxtLink
          to="/products"
          class="bg-primary hover:bg-primaryDark font-bold py-2 px-4 rounded mx-auto block w-fit mt-8"
        >
          See other collections
        </NuxtLink>
      </div>
    </div>
    <div v-else>
      <PageTitle :blok="{ headline: 'Payment failed', tag: 'h1' }" />
      <div class="my-24 font-bold text-center">
        <p>
          Sorry, something went wrong with your payment.<br />Please Try again!
        </p>
        <NuxtLink
          to="/basket"
          class="bg-primary hover:bg-primaryDark font-bold py-2 px-4 rounded mx-auto block w-fit mt-8"
        >
          Back to the Basket
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
