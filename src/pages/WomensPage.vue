<script setup lang="ts">
import { computed } from 'vue'
import AppHeader from '../components/Layout/AppHeader.vue'
import ProductList from '../components/product/ProductList.vue'
import { useProducts } from '../composables/useProducts'

const { products, loading, errorMessage } = useProducts()

const womensProducts = computed(() =>
  products.value.filter((product) =>
    product.title.toLowerCase().includes('dior') ||
    product.title.toLowerCase().includes('chanel') ||
    product.title.toLowerCase().includes('dolce') ||
    product.title.toLowerCase().includes('gucci') ||
    product.title.toLowerCase().includes('perfume'),
  ),
)
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-pink-50 via-white to-purple-100">
    <AppHeader />

      <section
        class="relative overflow-hidden bg-linear-to-r from-pink-500! via-fuchsia-500! to-purple-600! px-6 py-20 text-white!"
      >
        <div class="mx-auto flex max-w-6xl flex-col items-center justify-center text-center">
          <h1 class="font-serif text-6xl font-extrabold text-white!">
            Women’s Collection
          </h1>

          <p
            class="mt-5 max-w-3xl text-center text-lg leading-8 text-pink-100!"
          >
            Elegant, floral, sweet, and luxurious fragrances designed for confident women.
          </p>
        </div>
      </section>

    <main class="mx-auto max-w-7xl px-6 py-14">
      <h2 class="mb-10 text-center font-serif text-4xl font-bold text-pink-600!">
        Women’s Perfumes
      </h2>

      <p v-if="loading" class="text-center text-lg text-gray-600">
        Loading women’s perfumes...
      </p>

      <p v-else-if="errorMessage" class="text-center text-red-500">
        {{ errorMessage }}
      </p>

      <p
        v-else-if="womensProducts.length === 0"
        class="text-center text-lg text-gray-600"
      >
        No women’s perfumes found.
      </p>

      <ProductList v-else :products="womensProducts" />
    </main>
  </div>
</template>