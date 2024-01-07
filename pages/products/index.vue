<script setup>
let products = [];
const storyblokApi = useStoryblokApi();
const result = ref([]);
const hoverTitle = ref(null);

const { data } = await storyblokApi.get("cdn/stories", {
  version: "draft",
  starts_with: "products",
  is_startpage: false,
  filter_query: {
    sold: {
      is: false
    }
  }
});

products = data.stories;

// Slide the products into groups of 3 and equalize the groups
function splitIntoThreeGroups(arr) {
  const groupSize = Math.ceil(arr.length / 3);
  const groups = [[], [], []];

  for (let i = 0; i < arr.length; i++) {
    const groupIndex = i % 3;
    groups[groupIndex].push(arr[i]);
  }

  return groups;
}

result.value = splitIntoThreeGroups(products);

function setTitle(title) {
  hoverTitle.value = title;
}

function unSetTitle() {
  hoverTitle.value = null;
}

useHead({
  title: "Studiogloor Art Gallery",
  meta: [
    { name: "description", content: "Welcome to Gloor's Art Gallery, where emotions come to life on canvas. Immerse yourself in a world of vibrant colors, diverse styles, and the powerful fusion of music and feelings. Each piece tells a unique story, reflecting a rich tapestry of emotions, thoughts, and experiences. Gloor's art invites you to explore the unspoken language of emotion through captivating textures and hues. Whether you're a seasoned art enthusiast or a casual observer, our gallery is a space where creativity and connection intertwine. Enjoy the journey through the emotional landscape of Gloor's artwork—it's a celebration of the beautiful dialogue between heart and canvas." },
  ]
});
</script>

<template>
  <div class="plp">
    <PageTitle :blok="{ headline: 'Art works', tag: 'h1' }" />
    <div class="grid grid-cols-1 lg:grid-cols-3 container mx-auto my-24 gap-4">
      <div
        v-for="(group, index) in result"
        :key="index"
        class="grid gap-4 h-fit"
      >
        <NuxtLink
          :to="product.full_slug"
          v-for="(product, innerIndex) in group"
          :key="innerIndex"
          @mouseover="setTitle(product.content.name)"
          @mouseleave="unSetTitle()"
          @touchstart="setTitle(product.content.name)"
          @touchend="unSetTitle()"
        >
          <NuxtImg
            :src="product.content.productImage.filename"
            :alt="product.content.productImage.alt"
            width="200"
            provider="storyblok"
            format="webp"
            class="w-full"
          />
        </NuxtLink>
      </div>
    </div>
    <Transition>
      <div
        v-if="hoverTitle"
        class="mix-blend-overlay font-bold fixed text-[16vw]/[16vw] md:text-[12vw]/[12vw] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none text-center"
      >
        {{ hoverTitle }}
      </div>
    </Transition>
  </div>
</template>
