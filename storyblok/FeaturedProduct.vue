<template>
  <NuxtLink
    :to="`/products/${product.slug}`"
    v-editable="blok"
    class="featured-product flex items-center justify-center flex-col my-24 container mx-auto"
    v-if="product"
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
let response;
if(!props.blok.random){
  response = await storyblokApi.get("cdn/stories/", {
    version: "draft",
    by_uuids: props.blok.product
  });

  product.value = response.data.stories[0];
} else {
  // get random product with a random number
  response = await storyblokApi.get("cdn/stories/", {
    version: "draft",
    starts_with: "products",
    is_startpage: false,
  });

  const random = Math.floor(Math.random() * response.data.stories.length);
  product.value = response.data.stories[random];
}
</script>
