<script setup lang="ts">
import { useProducts } from '../composables/useProducts'

const { products, loading } = useProducts()
</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">Veloura Perfumes</h1>

    <div v-if="loading">Loading...</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="product in products" :key="product.id" class="border p-4 rounded">
        <img :src="product.thumbnail" class="w-full h-40 object-cover mb-2" />
        <h2 class="font-semibold">{{ product.title }}</h2>
        <p class="text-sm text-gray-500">{{ product.brand }}</p>
        <p class="font-bold">$ {{ product.price }}</p>
      </div>
    </div>
  </div>
</template>