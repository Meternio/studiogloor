<script setup>
const products = ref(null);
const storyblokApi = useStoryblokApi();
const { data } = await storyblokApi.get("cdn/stories", {
  version: "draft",
  starts_with: "products",
  is_startpage: false,
});
products.value = data.stories;
const resolvedRichText = (richText) => renderRichText(richText);
</script>

<template>
  <div class="plp">
    <h1>Products</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="product in products" :key="product.id">
        <NuxtLink :to="product.full_slug">
          <NuxtImg
            :src="product.content.productImage.filename"
            :alt="product.content.productImage.alt"
            width="200"
            provider="storyblok"
            format="webp"
          />
          <h2>{{ product.content.name }}</h2>
          <div v-html="resolvedRichText(product.content.description)"></div>
          <p>
            {{ (Math.round(product.content.price * 100) / 100).toFixed(2) }} CHF
          </p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
