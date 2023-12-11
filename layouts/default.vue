<script setup>
import { signInAnonymously } from "firebase/auth";

const auth = useFirebaseAuth();
signInAnonymously(auth).catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  console.error(errorCode, errorMessage);
});
</script>

<template>
  <div class="layout">
    <Header />
    <slot />
    <Footer />
    <Snackbar />
  </div>
</template>
