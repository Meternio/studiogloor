<script setup>
const story = await useAsyncStoryblok('contact', { version: 'draft' });

useServerSeoMeta({
  title: () => story.value.content.Meta.title,
  description: () => story.value.content.Meta.description,
  ogTitle: () => story.value.content.Meta.ogTitle,
  ogDescription: () => story.value.content.Meta.ogDescription,
});
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>