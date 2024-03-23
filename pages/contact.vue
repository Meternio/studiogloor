<script setup>
const story = await useAsyncStoryblok('contact', { version: 'draft' });

useHead({
  title: "Contact Studiogloor",
  meta: [
    { name: "description", content: "Hello! I'm Gloor, the artist behind the abstract creations. Whether you have questions about my artwork, are interested in commissioning a piece, or simply want to share your thoughts, I'd love to hear from you. Your feedback is valuable, and I'm committed to responding promptly.  Let's start a conversation about the emotional journey of art. Thank you for your interest—I'm excited to connect with you!" },
  ]
});
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>