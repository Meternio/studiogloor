<script setup>
const story = await useAsyncStoryblok('home', { version: 'draft' });

useHead({
  title: "Studiogloor",
  meta: [
    { name: "description", content: "Discover the captivating world of mixed media art at Studio Gloor. My collection features a range of paintings that are sure to leave you spellbound. Explore the creative process of me and find the perfect piece to add to your collection." },
  ]
});
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
