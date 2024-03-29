<script setup>
import { provide, ref, computed, watchEffect } from 'vue'
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'
import { RouterView } from 'vue-router'

const cart = ref([])
const isDrawerOpen = ref(false)
const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => Math.round(totalPrice.value * 0.05))

// Drawer
const openDrawer = () => {
  isDrawerOpen.value = true
}
const closeDrawer = () => {
  isDrawerOpen.value = false
}

// Cart
const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}
const removeFromCart = (item) => {
  cart.value = cart.value.filter((i) => i.id !== item.id)
  item.isAdded = false
}

watchEffect(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('cart', {
  cart,
  addToCart,
  removeFromCart,
  openDrawer,
  closeDrawer
})
</script>

<template>
  <Drawer v-if="isDrawerOpen" :total-price="totalPrice" :vat-price="vatPrice" />

  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />
    <div class="p-10">
      <RouterView />
    </div>
  </div>
</template>
