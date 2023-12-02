<template>
  <NuxtLink
    :to="`/products/`"
    v-editable="blok"
    class="featured-product flex items-center justify-center flex-col my-24"
  >
    <NuxtImg
      :src="product.productImage.filename"
      :alt="product.productImage.alt"
      width="400"
      class="featured-product__image"
      provider="storyblok"
      format="webp"
    />
    <div
      v-html="resolvedRichText"
      class="featured-product__description text-center mt-3"
    ></div>
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
product.value = data.stories[0].content;
const resolvedRichText = computed(() => renderRichText(product.value.description));
</script>
