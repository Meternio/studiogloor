<template>
  <div v-editable="blok" class="px-4">
    <div class="flex flex-col md:flex-row">
      <div class="w-full md:w-1/2">
        <img :src="blok.productImage.filename" :alt="blok.productImage.alt" class="w-full" />
      </div>
      <div class="w-full md:w-1/2">
        <h1 class="text-5xl font-bold">{{ blok.name }}</h1>
        <p class="text-xl font-bold">{{ (Math.round(blok.price * 100) / 100).toFixed(2) }} CHF</p>
        <p class="text-xl">{{ blok.description.text }}</p>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add to cart
        </button>
      </div>
    </div>
    <StoryblokComponent v-for="blok in blok.body" :key="blok._uid" :blok="blok" />
  </div>
</template>

<script setup>
defineProps({ blok: Object })
</script>
