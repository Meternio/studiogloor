<script setup>
const story = await useAsyncStoryblok('imprint', { version: 'draft' });
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>