<script setup>
const { slug } = useRoute().params;
const story = await useAsyncStoryblok("art-gallery/" + slug.join("/"), {
  version: "draft",
});

let description = '';

//loop over the description and split by ,
for (let i = 0; i < story.value.content.description.content.length; i++) {
  //loop over the content of the description and split by ,
  for(let x = 0; x < story.value.content.description.content[i].content.length; x++) {
    //if the text is not empty, add it to the description
    if(story.value.content.description.content[i].content[x].text) {
      description += story.value.content.description.content[i].content[x].text;
    }
  }

  description += ". ";
}

useServerSeoMeta({
  title: () => story.value.content.name,
  description: () => description
});
</script>

<template>
  <PDP v-if="story" :blok="story.content" :page-uid="story.uuid" class="container mx-auto"/>
</template>
