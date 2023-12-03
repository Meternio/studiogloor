<script setup>
import { useSnackbarStore } from "@/stores/snackbarStore";
import { getToken } from "firebase/app-check";
import { useAppCheck } from "vuefire";

const appCheck = useAppCheck();
const snackbarStore = useSnackbarStore();
const disabledSubmit = ref(true);
const loader = "auto";
const options = { mode: "shipping" };
const appearance = {
  theme: "stripe",
  labels: "floating",
  variables: { colorPrimaryText: "#262626" },
};
const stripe = await useClientStripe();
let elements;

async function initializeStripe() {
  // Get the Firebase App Check token from the server
  const appCheckTokenResponse = await getToken(appCheck, false).catch(
    (error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    }
  );

  if (!appCheckTokenResponse) {
    return;
  }

  // Make a request to your server to get the client secret
  const response = await fetch("/api/create-payment-intent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Firebase-AppCheck-Token": appCheckTokenResponse.token,
    },
    body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  });
  const { clientSecret } = await response.json();
  elements = stripe.value.elements({ clientSecret, loader, appearance });

  const linkAuthenticationElement = elements.create("linkAuthentication");
  linkAuthenticationElement.mount("#linkAuthentication");

  const paymentElement = elements.create("payment");
  paymentElement.mount("#payment-element");

  const addressElement = elements.create("address", options);
  addressElement.mount("#address-element");

  disabledSubmit.value = false;
}

async function handleStripePayment(event) {
  event.preventDefault();
  const { error } = await stripe.value.confirmPayment({
    elements,
    confirmParams: {
      return_url: "https://example.com/order/123/complete",
    },
  });

  if (error) {
    // Show error to your customer (for example, payment details incomplete)
    snackbarStore.showSnackbar({ text: error.message });
  } else {
    // Your customer will be redirected to your `return_url`. For some payment
    // methods like iDEAL, your customer will be redirected to an intermediate
    // site first to authorize the payment, then redirected to the `return_url`.
  }
}

onMounted(() => {
  initializeStripe();
});
</script>

<template>
  <form @submit="handleStripePayment">
    <div id="linkAuthentication"></div>
    <div id="payment-element"></div>
    <div id="address-element"></div>
    <button
      type="submit"
      :disabled="disabledSubmit"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Zahlungspflichtig bestellen
    </button>
  </form>
</template>
