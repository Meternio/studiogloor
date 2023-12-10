<script setup>
const story = await useAsyncStoryblok('data-policy', { version: 'draft' });
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>