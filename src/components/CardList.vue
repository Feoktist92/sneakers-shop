<script setup>
import Card from './Card.vue'

defineProps({
  items: Array,
  isFavorites: Boolean
})
const emit = defineEmits(['toggleFavorite', 'toggleCart'])
</script>

<template>
  <div v-auto-animate class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :image-url="item.imageUrl"
      :price="item.price"
      :isAdded="item.isAdded"
      :isFavorite="item.isFavorite"
      :onClickAdd="isFavorites ? null : () => emit('toggleCart', item)"
      :onClickFavorite="isFavorites ? null : () => emit('toggleFavorite', item)"
    />
  </div>
</template>
