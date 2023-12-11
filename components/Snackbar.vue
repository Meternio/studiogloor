<script setup>
import { useSnackbarStore } from "@/stores/snackbarStore";

const snackbarStore = useSnackbarStore();
</script>

<template>
  <Transition name="slideUp">
    <div
      class="snackbar fixed bottom-0 left-1/2 -translate-x-1/2 -translate-y-3 flex gap-2 p-3 rounded-lg w-max"
      :class="{'bg-error text-white' : snackbarStore.isError, 'bg-primary text-black' : !snackbarStore.isError}"
      v-if="snackbarStore.isVisible"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
        class="snackbar__icon"
      >
        <path
          fill-rule="evenodd"
          d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm1.5-11.5a1 1 0 10-2 0v5a1 1 0 102 0v-5zm-1 7a1 1 0 100 2 1 1 0 000-2z"
          clip-rule="evenodd"
        />
      </svg>
      <div class="snackbar__text">
        {{ snackbarStore.text }}
      </div>
    </div>
  </Transition>
</template>
