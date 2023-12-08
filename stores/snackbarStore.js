export const useSnackbarStore = defineStore("snackbar", () => {
  const snackbarQueue = [];
  const isVisible = ref(false);
  const isError = ref(false);
  const text = ref('');
  let isProcessing = false;

  function showSnackbar(data) {
    snackbarQueue.push(data);
    if (!isProcessing) {
      runQueue();
    }
  }

  function runQueue() {
    isProcessing = true;
    const data = snackbarQueue.shift();
    if (!data) {
      isProcessing = false;
      return;
    }

    text.value = data.text || 'Ups, da ist etwas schief gelaufen!';
    isVisible.value = true;
    isError.value = data.isError || false;
    setTimeout(() => {
      isVisible.value = false;
      setTimeout(() => {
        runQueue();
      }, 500);
    }, 3000);
  }

  return {
    showSnackbar,
    isVisible,
    isError,
    text,
  };
});
