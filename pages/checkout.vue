<script setup>
import { useSnackbarStore } from "@/stores/snackbarStore";
import { getToken } from "firebase/app-check";
import { useAppCheck, getCurrentUser } from "vuefire";
import { useBasketStore } from "@/stores/basketStore";

const basketStore = useBasketStore();
const appCheck = useAppCheck();
const snackbarStore = useSnackbarStore();
const disabledSubmit = ref(true);
const loadingStripe = ref(true);
const totalOfBasket = ref(0);
const loader = "auto";
const options = { mode: "shipping" };
const appearance = {
  theme: "stripe",
  labels: "floating",
  variables: { colorPrimary: "#F1EFE7" },
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

  const user = await getCurrentUser();

  // Make a request to your server to get the client secret
  const response = await fetch("/api/create-payment-intent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Firebase-AppCheck-Token": appCheckTokenResponse.token,
    },
    body: JSON.stringify({ user_token: await user.getIdToken() }),
  });
  const { clientSecret, total } = await response.json();
  totalOfBasket.value = total / 100;
  elements = stripe.value.elements({ clientSecret, loader, appearance });

  const linkAuthenticationElement = elements.create("linkAuthentication");
  linkAuthenticationElement.mount("#linkAuthentication");

  const paymentElement = elements.create("payment");
  paymentElement.mount("#payment-element");

  const addressElement = elements.create("address", options);
  addressElement.mount("#address-element");

  disabledSubmit.value = false;
  loadingStripe.value = false;
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
    snackbarStore.showSnackbar({ text: error.message, isError: true });
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
  <PageTitle :blok="{ headline: 'Checkout', tag: 'h1' }" />
  <form
    @submit="handleStripePayment"
    class="container mx-auto my-24"
    v-show="!loadingStripe"
  >
    <h2 class="text-xl font-bold mb-2">Zahlungsdetails</h2>
    <div id="linkAuthentication" class="mb-2"></div>
    <div id="payment-element" class="mb-3"></div>
    <div id="address-element"></div>
    <h2 class="text-xl font-bold mb-2 mt-8">Bestellungsdetails</h2>
    <div>
      <div class="flex flex-col gap-2 mb-4">
        <div
          v-for="(product, key) in basketStore.products"
          :key="key"
          class="flex justify-between pb-2 border-primary border-b-2 last:pb-0 last:border-b-0"
        >
          <span> 1x {{ product.name }} </span>
          <span
            >{{ (Math.round(totalOfBasket * 100) / 100).toFixed(2) }} CHF</span
          >
        </div>
      </div>
      <span class="font-bold block text-right border-t-2 border-double pt-4">Total:
      {{ (Math.round(totalOfBasket * 100) / 100).toFixed(2) }} CHF<br>nicht MwSt. pflichtig</span>
    </div>
    <div class="flex flex-row flex-nowrap justify-between mt-24">
      <NuxtLink to="/basket" class="font-bold py-2 px-4 rounded underline">
        Zurück zum Warenkorb
      </NuxtLink>
      <button
        type="submit"
        :disabled="disabledSubmit"
        class="bg-primary hover:bg-primaryDark font-bold py-2 px-4 rounded"
      >
        Zahlungspflichtig bestellen
      </button>
    </div>
  </form>
  <div
    v-show="loadingStripe"
    class="container mx-auto my-24 font-bold text-center"
  >
    <p>Loading...</p>
  </div>
</template>
