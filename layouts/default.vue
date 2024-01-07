<script setup>
import { signInAnonymously } from "firebase/auth";
import { useBasketStore } from "@/stores/basketStore";

const auth = useFirebaseAuth();
const basketStore = useBasketStore();

onMounted(() => {
  signInAnonymously(auth).then(() => basketStore.getBasket()).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
  });
});
</script>

<template>
  <div class="layout">
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
    <Snackbar />
  </div>
</template>
