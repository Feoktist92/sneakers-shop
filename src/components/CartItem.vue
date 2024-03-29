<script setup>
defineProps({ id: Number, title: String, imageUrl: String, price: String })

const emit = defineEmits(['OnClickRemove'])
</script>

<template>
  <div class="flex items-center border border-slate-100 p-4 rounded-xl gap-4">
    <img class="w-16 h-16" :src="imageUrl" alt="Sneaker" />
    <div class="flex-1 flex-col">
      <p>{{ title }}</p>

      <div class="flex items-center justify-between mt-1">
        <b>{{ price }} ₽</b>
        <img
          @click="emit('OnClickRemove')"
          class="opacity-40 hover:opacity-100 cursor-pointer transition"
          src="/close.svg"
          alt="Close"
        />
      </div>
    </div>
  </div>
</template>
