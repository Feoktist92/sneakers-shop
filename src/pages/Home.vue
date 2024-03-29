<script setup>
import { inject, onMounted, reactive, ref, watchEffect } from 'vue'
import debounce from 'lodash.debounce'
import CardList from '../components/CardList.vue'
import axios from 'axios'

const { addToCart, cart, removeFromCart } = inject('cart')

const items = ref([])
const filters = reactive({
  search: '',
  sortBy: 'title'
})

// Favorites
const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://f89c9aab106aa899.mokky.dev/favorites`)
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.item_id === item.id)

      if (!favorite) {
        return item
      } else {
        return { ...item, isFavorite: true, favoriteId: favorite.id }
      }
    })
  } catch (error) {
    console.log(error)
  }
}
// Items
const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.search) {
      params.title = `*${filters.search}*`
    }

    const { data } = await axios.get(`https://f89c9aab106aa899.mokky.dev/items`, { params })
    items.value = data.map((item) => ({
      ...item,
      isFavorite: false,
      isAdded: false,
      favoriteId: null
    }))
  } catch (error) {
    console.log(error)
  }
}

// Select
const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

// Input
const onChangeSearch = debounce((event) => {
  filters.search = event.target.value
}, 300)

// Favorites
const toggleFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id
      }
      item.isFavorite = true
      const { data } = await axios.post(`https://f89c9aab106aa899.mokky.dev/favorites`, obj)
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://f89c9aab106aa899.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (error) {
    console.log(error)
  }
}
// Cart
const toggleCart = (item) => {
  if (item.isAdded) {
    removeFromCart(item)
  } else {
    addToCart(item)
  }
}

onMounted(async () => {
  cart.value = JSON.parse(localStorage.getItem('cart') || '[]')
  await fetchItems()
  await fetchFavorites()
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watchEffect(fetchItems, filters)

watchEffect(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})
</script>

<template>
  <div class="flex justify-between items-center mb-8 flex-wrap gap-4">
    <h2 class="text-3xl font-500">Все кроссовки</h2>
    <div class="flex gap-4 flex-wrap">
      <select @change="onChangeSelect" class="px-4 border rounded-md py-2">
        <option value="title">По названию</option>
        <option value="price">Дешевые</option>
        <option value="-price">Дорогие</option>
      </select>
      <div class="relative">
        <img src="/search.svg" alt="Search" class="absolute top-3 left-3" />
        <input
          @input="onChangeSearch"
          type="text"
          placeholder="Поиск..."
          class="border rounded-md py-2 pl-10 pr-4 outline-none border-slate-200 p-2 focus:border-gray-400"
        />
      </div>
    </div>
  </div>

  <CardList :items="items" @toggle-favorite="toggleFavorite" @toggle-cart="toggleCart" />
</template>
