<template>
  <div v-editable="blok">
    <PageTitle :blok="{ headline: blok.name, tag: 'h1' }" />
    <div class="flex flex-col md:flex-row my-24 gap-4">
      <div class="w-full md:w-1/2">
        <NuxtImg
          :src="blok.productImage.filename"
          :alt="blok.productImage.alt"
          width="745"
          class="w-full"
          provider="storyblok"
          format="webp"
        />
      </div>
      <div class="w-full md:w-1/2 flex flex-col gap-4">
        <div v-html="resolvedRichText"></div>
        <div v-if="!blok.sold" class="flex flex-col gap-2">
          <p>
            <span>{{ blok.width }} cm </span>
            <span>x {{ blok.height }} cm </span>
            <span v-if="blok.depth">x {{ blok.depth }} cm</span>
          </p>
          <p class="text-xl font-bold">
            {{ (Math.round(blok.price * 100) / 100).toFixed(2) }} CHF
          </p>
          <button
            class="w-fit bg-primary hover:bg-primaryDark font-bold py-2 px-4 rounded"
            @click="
              basketStore.addToBasket({
                name: blok.name,
                price: blok.price,
                description: blok.description,
                image: blok.productImage,
                uid: props.pageUid,
                slug: route.path,
              })
            "
          >
            Add to cart
          </button>
        </div>

        <p
          v-if="blok.sold"
          class="bg-primary font-bold py-2 px-4 rounded text-center"
        >
          Sold
        </p>
      </div>
    </div>
    <StoryblokComponent
      v-for="blok in blok.body"
      :key="blok._uid"
      :blok="blok"
    />
  </div>
</template>

<script setup>
import { useBasketStore } from "@/stores/basketStore";

const props = defineProps({ blok: Object, pageUid: String });
const resolvedRichText = computed(() => renderRichText(props.blok.description));
const basketStore = useBasketStore();
const route = useRoute();
</script>
