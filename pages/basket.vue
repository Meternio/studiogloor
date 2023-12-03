<script setup>
import { useBasketStore } from "@/stores/basketStore";

const basketStore = useBasketStore();
</script>

<template>
  <ul>
    <li v-for="(product, key) in basketStore.products" :key="key">
      <span>{{ product }}</span>
    </li>
  </ul>
  <NuxtLink to="/checkout"
    class="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    Checkout
  </NuxtLink>
</template>