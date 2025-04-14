<script setup>
import { useBasketStore } from "@/stores/basketStore";

const menuOpen = ref(false);
const basketStore = useBasketStore();

function closeMenu() {
  menuOpen.value = false;

  document.body.style.overflow = "";
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value;

  if (menuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}
</script>

<template>
  <header
    class="header flex flex-row justify-between p-4 items-center mb-8 relative"
    :class="{ 'menu-open': menuOpen }"
  >
    <NuxtLink
      to="/basket"
      class="header__basket relative -ml-3 z-30"
      @click="closeMenu"
    >
      <Icon
        name="material-symbols-light:shopping-bag-outline"
        view-box="0 0 60 60"
        width="60"
        height="60"
        color="black"
      />
      <span
        class="absolute left-1/2 top-[calc(50%+7px)] -translate-x-1/2 -translate-y-1/2"
        >{{ basketStore.countProductsInBasket }}</span
      >
    </NuxtLink>
    <NuxtLink to="/" class="header__logo z-30" @click="closeMenu">
      <NuxtImg
        src="https://a.storyblok.com/f/264451/269x115/8935572524/studiogloor_logo-removedbg.png"
        alt="Studiogloor Logo"
        provider="storyblok"
        format="webp"
        preload
      />
    </NuxtLink>
    <Icon
      name="streamline:interface-setting-menu-2-button-parallel-horizontal-lines-menu-navigation-staggered-three-hamburger"
      view-box="0 0 40 40"
      width="40"
      height="40"
      color="black"
      class="header__burger z-30 cursor-pointer transition-all"
      @click="toggleMenu"
    />
    <Transition>
      <nav
        v-if="menuOpen"
        class="header__nav z-20 fixed top-0 left-0 bottom-0 right-0 flex flex-col justify-center items-center text-black text-2xl font-bold text-center"
      >
        <ul class="header__nav__menu" @click="closeMenu">
          <li class="header__nav__menu__item">
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li class="header__nav__menu__item">
            <NuxtLink to="/art-gallery">Art Gallery</NuxtLink>
          </li>
          <li class="header__nav__menu__item">
            <NuxtLink to="/about">About</NuxtLink>
          </li>
          <li class="header__nav__menu__item">
            <NuxtLink to="/contact">Contact</NuxtLink>
          </li>
        </ul>
      </nav>
    </Transition>
    <div
      class="header__background z-10 top-0 right-0 bg-primary h-28 w-24 rounded-bl-[100%] transition-all duration-500"
      :class="{ fixed: menuOpen, absolute: !menuOpen }"
    ></div>
  </header>
</template>

<style scoped lang="less">
.menu-open {
  .header {
    &__burger {
      transform: rotate(-90deg);
    }

    &__background {
      width: 100%;
      height: 100vh;
      height: 100svh;
      border-radius: 0;
    }
  }
}
</style>
