<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '../../types/product'

interface Props {
  products: Product[]
}

const props = defineProps<Props>()

// 👉 Add 3 custom products
const extraProducts: Product[] = [
  {
    id: 1001,
    title: 'Veloura Midnight Bloom',
    description: '',
    price: 79,
    brand: 'Veloura',
    category: 'fragrance',
    thumbnail: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=400',
    images: [],
  },
  {
    id: 1002,
    title: 'Rose Velvet Essence',
    description: '',
    price: 89,
    brand: 'Veloura',
    category: 'fragrance',
    thumbnail: 'https://images.unsplash.com/photo-1585386959984-a41552231658?q=80&w=400',
    images: [],
  },
  {
    id: 1003,
    title: 'Golden Aura Perfume',
    description: '',
    price: 99,
    brand: 'Veloura',
    category: 'fragrance',
    thumbnail: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=400',
    images: [],
  },
]

// 👉 Combine API + custom
const allProducts = computed(() => [...props.products, ...extraProducts])
</script>

<template>
  <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
    <article
      v-for="product in allProducts"
      :key="product.id"
      class="group rounded-2xl p-0.5 bg-linear-to-r from-pink-400 via-purple-400 to-yellow-300 transition duration-300 hover:scale-105"
    >
      <!-- Inner Card -->
      <div
        class="h-full rounded-2xl bg-white/80 backdrop-blur-lg p-5 text-center shadow-lg transition duration-300 group-hover:shadow-[0_0_25px_rgba(236,72,153,0.7)]"
      >
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="mx-auto h-44 w-full object-contain transition duration-300 group-hover:scale-110"
        />

        <h3 class="mt-4 text-lg font-bold text-gray-800">
          {{ product.title }}
        </h3>

        <p class="mt-1 text-sm text-gray-500">
          {{ product.brand }}
        </p>

        <p class="mt-3 text-xl font-bold text-pink-600">
          $ {{ product.price }}
        </p>

        <button
          class="mt-4 rounded-full bg-linear-to-r from-pink-500 to-purple-500 px-5 py-2 font-semibold text-white shadow-md transition duration-300 hover:from-purple-500 hover:to-pink-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.8)]"
        >
          View Details
        </button>
      </div>
    </article>
  </div>
</template>