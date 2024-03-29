<script setup>
defineProps({
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function
})
</script>

<template>
  <div
    class="flex flex-col justify-between h-full relative bg-white border border-slate-100 rounded-3xl p-6 cursor-pointer shadow-md transition hover:-translate-y-2 hover:shadow-xl"
  >
    <div>
      <img
        v-if="onClickFavorite"
        @click="onClickFavorite"
        class="absolute top-4 left-4 shadow-2xl"
        :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
        alt="Like"
      />
      <img class="w-full h-64 object-contain" :src="imageUrl" alt="Sneaker" />
      <p class="mt-2">{{ title }}</p>
    </div>

    <div class="flex justify-between mt-4">
      <div class="flex flex-col">
        <span class="text-slate-400">Цена:</span>
        <b>{{ price }} ₽</b>
      </div>

      <img
        class="ease-out shadow-2xl"
        v-if="onClickAdd"
        @click="onClickAdd"
        :src="!isAdded ? '/plus.svg' : '/checked.svg'"
        alt="plus"
      />
    </div>
  </div>
</template>
