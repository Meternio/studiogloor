export const useBasketStore = defineStore("basket", () => {
  const items = ref([]);

  function addToBasket(item) {
    items.value.push(item);
  }

  return {
    addToBasket,
    items,
  };
});
