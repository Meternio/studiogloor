<template>
  <NuxtLink
    :to="`/products/${product.slug}`"
    v-editable="blok"
    class="featured-product flex items-center justify-center flex-col my-24 container mx-auto"
  >
    <NuxtImg
      :src="product.content.productImage.filename"
      :alt="product.content.productImage.alt"
      height="600"
      class="featured-product__image"
      provider="storyblok"
      format="webp"
    />
    <h4
      class="featured-product__description text-center mt-3 font-bold"
    >{{ product.name }}</h4>
  </NuxtLink>
</template>

<script setup>
const product = ref(null);
const props = defineProps({ blok: Object });
const storyblokApi = useStoryblokApi();
const { data } = await storyblokApi.get("cdn/stories/", {
  version: "draft",
  by_uuids: props.blok.product
});
product.value = data.stories[0];
</script>
