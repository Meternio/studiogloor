<script setup>
const { slug } = useRoute().params;
const story = await useAsyncStoryblok("art-gallery/" + slug.join("/"), {
  version: "draft",
});
</script>

<template>
  <PDP v-if="story" :blok="story.content" :page-uid="story.uuid" class="container mx-auto"/>
</template>
