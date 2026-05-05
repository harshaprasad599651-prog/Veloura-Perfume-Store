<script setup lang="ts">
import AppHeader from '../components/Layout/AppHeader.vue'
import { useProducts } from '../composables/useProducts'

const { products, loading, errorMessage } = useProducts()
</script>

<template>
  <div
    id="home"
    class="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-100"
  >
    <AppHeader />

    <main class="mx-auto max-w-7xl px-6 py-12">
      <!-- Hero Section -->
      <section class="grid grid-cols-1 items-center gap-8 lg:grid-cols-[180px_1fr_180px]">
        <div class="relative hidden h-[320px] overflow-hidden rounded-2xl shadow-xl lg:block">
          <img
            src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=500"
            alt="Perfume side"
            class="h-full w-full object-cover opacity-50"
          />
          <button class="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl shadow">
            ←
          </button>
        </div>

        <div class="h-[320px] overflow-hidden rounded-[36px] shadow-[0_18px_35px_rgba(0,0,0,0.35)]">
          <img
            src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1200"
            alt="Veloura perfume hero"
            class="h-full w-full object-cover"
          />
        </div>

        <div class="relative hidden h-[320px] overflow-hidden rounded-2xl shadow-xl lg:block">
          <img
            src="https://images.unsplash.com/photo-1619994403073-2cec844b8e63?q=80&w=500"
            alt="Perfume side"
            class="h-full w-full object-cover opacity-50"
          />
          <button class="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl shadow">
            →
          </button>
        </div>
      </section>

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

        <div
          v-else
          class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          <article
            v-for="product in products"
            :key="product.id"
            class="rounded-2xl bg-pink-400/70 p-5 text-center shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <img
              :src="product.thumbnail"
              :alt="product.title"
              class="mx-auto h-44 w-full object-contain"
            />

            <h3 class="mt-4 text-xl font-bold text-white">
              {{ product.title }}
            </h3>

            <p class="mt-1 text-sm text-pink-100">
              {{ product.brand }}
            </p>

            <p class="mt-3 text-2xl font-bold text-white">
              $ {{ product.price }}
            </p>

            <button
              class="mt-4 rounded-full bg-white px-5 py-2 font-semibold text-pink-600 shadow hover:bg-pink-50"
            >
              View Details
            </button>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>