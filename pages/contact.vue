<script setup>
const story = await useAsyncStoryblok('contact', { version: 'draft' });
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>