<script setup lang="ts">
import type { Product } from '../../types/product'

interface Props {
  products: Product[]
}

defineProps<Props>()
</script>

<template>
  <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
    <article
      v-for="product in products"
      :key="product.id"
      class="group rounded-2xl bg-linear-to-r from-pink-400 via-purple-400 to-yellow-300 p-0.5 transition duration-300 hover:scale-105"
    >
      <div
        class="h-full rounded-2xl bg-white/80 p-5 text-center shadow-lg backdrop-blur-lg transition duration-300 group-hover:shadow-[0_0_25px_rgba(236,72,153,0.7)]"
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