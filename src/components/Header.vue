<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  totalPrice: Number
})
const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header class="flex justify-between py-8 px-4 border-b border-slate-200 flex-wrap gap-6 sm:px-10">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img class="w-12" src="/logo.png" alt="Logo" />
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-500">Магазин кросовок</p>
        </div>
      </div>
    </router-link>

    <ul class="flex items-center gap-10 text-gray-500">
      <li
        class="flex items-center gap-2 hover:text-black cursor-pointer"
        @click="emit('openDrawer')"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>{{ totalPrice }} ₽</b>
      </li>

      <router-link to="/favorites">
        <li class="flex items-center gap-2 hover:text-black cursor-pointer">
          <img src="/heart.svg" alt="Favorite" />
          <span>Закладки</span>
        </li>
      </router-link>
    </ul>
  </header>
</template>
