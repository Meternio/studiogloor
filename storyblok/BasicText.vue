<template>
    <div v-html="resolvedRichText" class="basic-text w-full">
    </div>
</template>
  
<script setup>
const props = defineProps({ blok: Object });
const resolvedRichText = computed(() => renderRichText(props.blok.text));
</script>


<style lang="less">
.basic-text {
    h2 {
        font-weight: bold;
        font-size: 1.5rem;
        
        &:not(:first-of-type) {
            margin: 2rem 0 0.75rem 0;
        }

        &:first-of-type {
            margin: 0 0 0.75rem 0;
        }
    }
}
</style>