<script setup lang="ts">
import { computed, ref } from 'vue'
import AppHeader from '../components/Layout/AppHeader.vue'
import ProductList from '../components/product/ProductList.vue'
import { useProducts } from '../composables/useProducts'

const { products, loading, errorMessage } = useProducts()

const searchQuery = ref<string>('')

const filteredProducts = computed(() =>
  products.value.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ),
)
</script>

<template>
  <div
    id="home"
    class="min-h-screen bg-linear-to-br from-pink-50 via-white to-purple-100"
  >
    <AppHeader />

    <main class="mx-auto max-w-7xl px-6 py-12">
      <!-- Hero Section -->
      <section class="grid grid-cols-1 items-center gap-8 lg:grid-cols-[180px_1fr_180px]">
        <div class="relative hidden h-80 overflow-hidden rounded-2xl shadow-xl lg:block">
          <img
            src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=500"
            alt="Perfume side"
            class="h-full w-full object-cover opacity-50"
          />

          <button
            class="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl shadow"
          >
            ←
          </button>
        </div>

        <div class="h-80 overflow-hidden rounded-[36px] shadow-[0_18px_35px_rgba(0,0,0,0.35)]">
          <img
            src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1200"
            alt="Veloura perfume hero"
            class="h-full w-full object-cover"
          />
        </div>

        <div class="relative hidden h-80 overflow-hidden rounded-2xl shadow-xl lg:block">
          <img
            src="https://images.unsplash.com/photo-1619994403073-2cec844b8e63?q=80&w=500"
            alt="Perfume side"
            class="h-full w-full object-cover opacity-50"
          />

          <button
            class="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl shadow"
          >
            →
          </button>
        </div>
      </section>

      <!-- Search -->
      <div class="mt-12 flex justify-center">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search perfumes..."
          class="w-full max-w-md rounded-full border border-pink-200 bg-white px-6 py-3 text-center font-serif text-lg shadow outline-none focus:border-pink-400"
        />
      </div>

      <!-- Products -->
      <section id="perfumes" class="mt-14">
        <h2 class="mb-8 text-center font-serif text-4xl font-bold text-pink-600">
          Explore Our Perfumes
        </h2>

        <p v-if="loading" class="text-center text-lg text-gray-600">
          Loading perfumes...
        </p>

        <p v-else-if="errorMessage" class="text-center text-red-500">
          {{ errorMessage }}
        </p>

        <p
          v-else-if="filteredProducts.length === 0"
          class="text-center text-lg text-gray-600"
        >
          No perfumes found.
        </p>

        <ProductList v-else :products="filteredProducts" />
      </section>
    </main>
  </div>
</template>