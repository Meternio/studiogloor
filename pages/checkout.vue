<script setup>
const loader = "auto";
const options = { mode: "shipping" };
const stripe = await useClientStripe();

async function initializeStripe() {
  // Make a request to your server to get the client secret
  const response = await fetch("/api/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  });
  const { clientSecret } = await response.json();
  const elements = stripe.value.elements({ clientSecret, loader });

  const linkAuthenticationElement = elements.create("linkAuthentication");
  /*linkAuthenticationElement.on("change", (event) => {
    console.log(event.value.email);
  });*/
  linkAuthenticationElement.mount("#linkAuthentication");

  const paymentElement = elements.create("payment");
  paymentElement.mount("#payment-element");

  const addressElement = elements.create("address", options);
  addressElement.mount("#address-element");
}

onMounted(async () => {
  await initializeStripe();
});
</script>

<template>
  <div id="linkAuthentication"></div>
  <div id="payment-element"></div>
  <div id="address-element"></div>
</template>
