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
        class="mix-blend-overlay font-bold fixed text-8xl top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none text-center"
      >
        {{ hoverTitle }}
      </div>
    </Transition>
  </div>
</template>
