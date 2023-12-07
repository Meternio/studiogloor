import { useFirestore, getCurrentUser } from "vuefire";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const useBasketStore = defineStore("basket", () => {
  const db = useFirestore();
  const products = ref({});
  const countProductsInBasket = ref("...");
  const fetchingProducts = ref(true);

  getBasket();

  async function addToBasket(item) {
    if(products.value.hasOwnProperty(item.uid)) {
      return;
    }
    const user = await getCurrentUser();
    products.value[item.uid] = {
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image,
    };

    await setDoc(doc(db, "basket", user.uid), {products: products.value, timestamp: Date.now()});
    countProductsInBasket.value += 1;
  }

  async function removeFromBasket(uid) {
    if(!products.value.hasOwnProperty(uid)) {
      return;
    }
    const user = await getCurrentUser();
    delete products.value[uid];

    if(products.value.length === 0) {
      await deleteDoc(doc(db, "basket", user.uid));
    } else {
      await setDoc(doc(db, "basket", user.uid), {products: products.value, timestamp: Date.now()});
    }

    countProductsInBasket.value -= 1;
  }

  async function getBasket() {
    fetchingProducts.value = true;
    const user = await getCurrentUser();
    const docSnap = await getDoc(doc(db, "basket", user.uid));
    if (docSnap.exists()) {
      products.value = docSnap.data().products || {};
      countProductsInBasket.value = Object.keys(products.value).length;
    } else {
      countProductsInBasket.value = 0;
    }
    fetchingProducts.value = false;
  }

  return {
    addToBasket,
    removeFromBasket,
    products,
    countProductsInBasket,
    fetchingProducts,
  };
});
