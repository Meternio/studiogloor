<template>
  <div
    v-editable="blok"
    class="page-title py-24 text-6xl text-black font-bold text-center bg-primary container mx-auto"
  >
    <h1 v-if="blok.tag == 'h1'">
      {{ blok.headline }}
    </h1>
    <h2 v-if="blok.tag == 'h2'">
      {{ blok.headline }}
    </h2>
    <h3 v-if="blok.tag == 'h3'">
      {{ blok.headline }}
    </h3>
    <h4 v-if="blok.tag == 'h4'">
      {{ blok.headline }}
    </h4>
    <h5 v-if="blok.tag == 'h5'">
      {{ blok.headline }}
    </h5>
    <h6 v-if="blok.tag == 'h6'">
      {{ blok.headline }}
    </h6>
  </div>
</template>

<script setup>
defineProps({ blok: Object });
</script>
