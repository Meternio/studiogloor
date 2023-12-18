<template>
    <div v-html="resolvedRichText" class="basic-text">
    </div>
</template>
  
<script setup>
const props = defineProps({ blok: Object });
const resolvedRichText = computed(() => renderRichText(props.blok.text));
</script>
  