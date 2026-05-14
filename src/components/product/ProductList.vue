<script setup lang="ts">

import type { Product } from '../../types/product'
import { useCart } from '../../composables/useCart'

interface Props {
  products: Product[]
}

defineProps<Props>()


const { addToCart } = useCart()

const handleAddToCart = (product: Product): void => {
  addToCart(product)
}
</script>

<template>
  <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
    <article
      v-for="product in products"
      :key="product.id"
        class="group rounded-2xl border border-pink-100 bg-white transition duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(236,72,153,0.18)]"    >
      <div
        class="h-full rounded-2xl bg-[#fff8fc] p-5 text-center transition duration-300"      >
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

      <div class="mt-4 flex justify-center gap-3">
        <RouterLink
          :to="`/product/${product.id}`"
          class="rounded-full bg-white px-5 py-2 font-semibold text-pink-600 shadow-md transition hover:bg-pink-50"
        >
          View Details
        </RouterLink>


      </div>
      </div>
    </article>
  </div>
</template>