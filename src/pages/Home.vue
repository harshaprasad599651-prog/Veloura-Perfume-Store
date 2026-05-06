<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import AppHeader from '../components/Layout/AppHeader.vue'
import ProductList from '../components/product/ProductList.vue'
import { useProducts } from '../composables/useProducts'

const { products, loading, errorMessage } = useProducts()

const searchQuery = ref<string>('')
const currentSlide = ref<number>(0)

let sliderTimer: number | undefined

const heroSlides = [
  {
    title: 'SHOP A WIDE RANGE OF FRAGRANCES',
    subtitle: 'Discover luxury perfumes crafted for elegance, confidence, and unforgettable moments.',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1600',
  },
  {
    title: 'DON’T JUST WEAR A SCENT',
    subtitle: 'Make a statement with premium fragrance collections from Veloura.',
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1600',
  },
  {
    title: 'LUXURY PERFUMES FOR EVERY STYLE',
    subtitle: 'Explore men, women, and unisex fragrances with a modern premium feel.',
    image: 'https://images.unsplash.com/photo-1619994403073-2cec844b8e63?q=80&w=1600',
  },
]

const nextSlide = (): void => {
  currentSlide.value = (currentSlide.value + 1) % heroSlides.length
}

const goToSlide = (index: number): void => {
  currentSlide.value = index
}

onMounted(() => {
  sliderTimer = window.setInterval(nextSlide, 4000)
})

onUnmounted(() => {
  if (sliderTimer !== undefined) {
    window.clearInterval(sliderTimer)
  }
})

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

    <!-- Hero Slider -->
    <section class="relative h-155 overflow-hidden">
      <img
        :src="heroSlides[currentSlide].image"
        alt="Veloura perfume hero"
        class="absolute inset-0 h-full w-full object-cover transition duration-700"
      />

      <div class="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-pink-500/20"></div>

      <div class="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
        <div class="max-w-3xl">
          <p class="mb-4 font-serif text-xl font-semibold tracking-[0.3em] text-pink-200">
            VELOURA PERFUME STORE
          </p>

          <h1 class="font-serif text-6xl font-extrabold uppercase leading-tight text-white drop-shadow-lg md:text-7xl">
            {{ heroSlides[currentSlide].title }}
          </h1>

          <p class="mt-6 max-w-2xl text-lg text-pink-100">
            {{ heroSlides[currentSlide].subtitle }}
          </p>

          <a
            href="#perfumes"
            class="mt-8 inline-block rounded-full bg-pink-500 px-8 py-3 font-semibold text-white shadow-[0_0_25px_rgba(236,72,153,0.7)] transition hover:scale-105 hover:bg-pink-600"
          >
            Shop Collection
          </a>
        </div>
      </div>

      <!-- Slider Dots -->
      <div class="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3 rounded-full bg-white/90 px-5 py-3 shadow">
        <button
          v-for="(_, index) in heroSlides"
          :key="index"
          type="button"
          class="h-3 w-3 rounded-full transition"
          :class="index === currentSlide ? 'bg-cyan-500 scale-125' : 'bg-gray-500'"
          @click="goToSlide(index)"
        ></button>
      </div>
    </section>

    <main class="mx-auto max-w-7xl px-6 py-14">
      <!-- Search -->
      <div class="flex justify-center">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search perfumes..."
          class="w-full max-w-md rounded-full border border-pink-200 bg-white px-6 py-3 text-center font-serif text-lg shadow outline-none focus:border-pink-400"
        />
      </div>

      <!-- Categories -->
      <section class="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div class="rounded-3xl bg-linear-to-br from-pink-400 to-rose-500 p-8 text-white shadow-xl transition hover:-translate-y-2">
          <h2 class="font-serif text-3xl font-bold">Women</h2>
          <p class="mt-2 text-pink-100">Elegant floral and sweet luxury scents.</p>
        </div>

        <div class="rounded-3xl bg-linear-to-br from-slate-900 to-purple-900 p-8 text-white shadow-xl transition hover:-translate-y-2">
          <h2 class="font-serif text-3xl font-bold">Men</h2>
          <p class="mt-2 text-gray-300">Bold, fresh, and confident fragrances.</p>
        </div>

        <div class="rounded-3xl bg-linear-to-br from-cyan-500 to-pink-500 p-8 text-white shadow-xl transition hover:-translate-y-2">
          <h2 class="font-serif text-3xl font-bold">Unisex</h2>
          <p class="mt-2 text-white/90">Modern perfumes for every personality.</p>
        </div>
      </section>

      <!-- Products -->
      <section id="perfumes" class="mt-16">
        <h2 class="mb-8 text-center font-serif text-4xl font-bold text-pink-600">
          Featured Perfumes
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