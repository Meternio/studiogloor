<template>
    <div v-editable="blok" class="relative max-w-full container mx-auto">
      <!-- If only one image, display it without carousel -->
      <div v-if="images.length === 1">
        <NuxtImg
          :src="images[0].filename"
          :alt="images[0].alt || 'Product image'"
          height="600"
          class="w-full object-contain"
          provider="storyblok"
          format="webp"
        />
      </div>
  
      <!-- If multiple images, display as carousel -->
      <div v-else>
        <!-- Main carousel -->
        <div class="overflow-hidden relative" ref="emblaRef">
          <div class="flex items-center">
            <div
              v-for="(image, index) in images"
              :key="index"
              class="flex-none w-full min-w-0"
            >
              <NuxtImg
                :src="image.filename"
                :alt="image.alt || 'Product image'"
                height="600"
                class="w-full object-contain"
                provider="storyblok"
                format="webp"
              />
            </div>
          </div>
  
          <!-- Navigation buttons -->
          <button 
            class="absolute top-1/2 left-2.5 -translate-y-1/2 bg-black/50 text-white border-none w-10 h-10 rounded-full flex items-center justify-center cursor-pointer z-10"
            @click="onPrevButtonClick" 
            aria-label="Previous slide"
          >
            &#10094;
          </button>
          <button 
            class="absolute top-1/2 right-2.5 -translate-y-1/2 bg-black/50 text-white border-none w-10 h-10 rounded-full flex items-center justify-center cursor-pointer z-10"
            @click="onNextButtonClick" 
            aria-label="Next slide"
          >
            &#10095;
          </button>
        </div>
  
        <!-- Thumbnails row -->
        <div class="flex flex-wrap justify-center gap-2 mt-4">
            <div
                v-for="(image, index) in images"
                :key="index"
                :class="[
                'w-16 h-16 cursor-pointer overflow-hidden rounded',
                index === selectedIndex ? 'outline-2 outline outline-black' : 'outline-0'
                ]"
                @click="onDotButtonClick(index)"
            >
                <NuxtImg
                :src="image.filename"
                :alt="image.alt || 'Thumbnail'"
                width="64"
                height="64"
                class="w-full h-full object-cover"
                provider="storyblok"
                format="webp"
                />
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, onMounted } from 'vue';
  import EmblaCarousel from 'embla-carousel';
  
  const props = defineProps({ 
    blok: Object 
  });
  
  // Extract images from the blok
  const images = computed(() => {
    return Array.isArray(props.blok.images) ? props.blok.images : [props.blok.images];
  });
  
  // Initialize refs
  const emblaRef = ref(null);
  const emblaApi = ref(null);
  const selectedIndex = ref(0);
  
  // Control functions
  const onPrevButtonClick = () => {
    if (emblaApi.value) emblaApi.value.scrollPrev();
  };
  
  const onNextButtonClick = () => {
    if (emblaApi.value) emblaApi.value.scrollNext();
  };
  
  const onDotButtonClick = (index) => {
    if (emblaApi.value) emblaApi.value.scrollTo(index);
  };
  
  // Only setup carousel on client-side
  onMounted(() => {
    if (process.client && images.value.length > 1 && emblaRef.value) {
      const options = { loop: true };
      
      // Use a setTimeout to ensure DOM is fully rendered
      setTimeout(() => {
        emblaApi.value = EmblaCarousel(emblaRef.value, options);
        
        if (emblaApi.value) {
          // Set up event handlers
          emblaApi.value.on('select', () => {
            selectedIndex.value = emblaApi.value.selectedScrollSnap();
          });
        }
      }, 0);
    }
  });
  
  // Reinitialize when images change
  watch(() => images.value.length, (newLength) => {
    if (process.client && newLength > 1 && emblaRef.value) {
      const options = { loop: true };
      // Destroy and reinitialize
      if (emblaApi.value) {
        emblaApi.value.destroy();
      }
      emblaApi.value = EmblaCarousel(emblaRef.value, options);
      
      if (emblaApi.value) {
        emblaApi.value.on('select', () => {
          selectedIndex.value = emblaApi.value.selectedScrollSnap();
        });
      }
    }
  });
  </script>