<script setup>
const story = await useAsyncStoryblok('about', { version: 'draft' });

useHead({
  title: "About Studiogloor",
  meta: [
    { name: "description", content: "Discover Gloor's abstract art, inspired by the emotional dance of music and feelings. With a diverse range of styles and colors, each piece reflects a unique blend of emotions and experiences. Gloor's art invites you to connect with the unspoken language of emotion through vibrant colors and textures. Dive into a world where creativity meets the floor, forming a profound connection with every canvas." },
  ]
});
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
