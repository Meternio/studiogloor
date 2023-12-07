<script setup>
import { useBasketStore } from "@/stores/basketStore";

const basketStore = useBasketStore();
const resolvedRichText = (richText) => renderRichText(richText);
</script>

<template>
  <PageTitle :blok="{ headline: 'Basket', tag: 'h1' }" />
  <div v-show="basketStore.fetchingProducts" class="container mx-auto my-24 font-bold text-center">
    <p>Loading...</p>
  </div>

  <Transition>
    <div v-show="basketStore.fetchingProducts === false">
      <div
        v-if="Object.keys(basketStore.products).length > 0"
        class="container mx-auto my-24"
      >
        <ul class="flex flex-col gap-12">
          <li
            v-for="(product, key) in basketStore.products"
            :key="key"
            class="flex justify-between gap-4 flex-wrap md:flex-nowrap pb-12 border-primary border-b-2 last:pb-0 last:border-b-0"
          >
            <div class="flex flex-row gap-4 items-center flex-wrap md:flex-nowrap justify-center">
              <NuxtImg
                :src="product.image.filename"
                alt="Studiogloor Logo"
                provider="storyblok"
                format="webp"
                width="300"
              />
              <div>
                <span class="font-bold">{{ product.name }}</span>
                <div v-html="resolvedRichText(product.description)"></div>
              </div>
            </div>
            <div class="flex flex-row gap-4 items-center">
              <span class="whitespace-nowrap font-bold"
                >{{
                  (Math.round(product.price * 100) / 100).toFixed(2)
                }}
                CHF</span
              >
              <button @click="basketStore.removeFromBasket(key)">
                <Icon
                  name="material-symbols:close"
                  view-box="0 0 20 20"
                  width="20"
                  height="20"
                  color="black"
                />
              </button>
            </div>
          </li>
        </ul>

        <NuxtLink
          to="/checkout"
          class="bg-primary hover:bg-primaryDark font-bold py-2 px-4 rounded mt-24 block w-fit ml-auto"
        >
          Checkout
        </NuxtLink>
      </div>
      <div v-else class="container mx-auto my-24 font-bold text-center">
        <p>Your basket is empty.</p>
      </div>
    </div>
  </Transition>
</template>
