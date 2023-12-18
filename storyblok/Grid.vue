<template>
  <div
    v-editable="blok"
    class="gloor-grid container mx-auto flex flex-wrap md:flex-nowrap gap-12 my-24 place-items-center"
  >
    <StoryblokComponent
      v-for="blok in blok.columns"
      :key="blok._uid"
      :blok="blok"
    />
  </div>
</template>

<script setup>
defineProps({ blok: Object })
</script>

<style lang="less">
.gloor-grid {
    .featured-product {
      margin: 0;
    }
}
</style>
