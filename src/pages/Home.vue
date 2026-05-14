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
    subtitle:
      'Discover luxury perfumes crafted for elegance, confidence, and unforgettable moments.',
    image:
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1600',
  },
  {
    title: 'DON’T JUST WEAR A SCENT',
    subtitle:
      'Make a statement with premium fragrance collections from Veloura.',
    image:
      'https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1600',
  },
  {
    title: 'LUXURY PERFUMES FOR EVERY STYLE',
    subtitle:
      'Explore men, women, and unisex fragrances with a modern premium feel.',
    image:
      'https://images.unsplash.com/photo-1619994403073-2cec844b8e63?q=80&w=1600',
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

    <!-- PREMIUM HERO SECTION -->
    <section class="relative h-[85vh] overflow-hidden">
      <!-- Background Image -->
      <img
        :src="heroSlides[currentSlide].image"
        alt="Veloura perfume hero"
        class="absolute inset-0 h-full w-full object-cover transition duration-700"
      />

      <!-- Dark Overlay -->
      <div
        class="absolute inset-0 bg-linear-to-r from-black/75 via-black/40 to-pink-500/20"
      ></div>

      <!-- Center Content -->
      <div
        class="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
      >
        <!-- Small Title -->
        <p
          class="mb-6 font-serif text-[24px] font-semibold tracking-[0.35em] text-pink-100 drop-shadow-[0_2px_10px_rgba(255,192,203,0.6)]"
        >
          VELOURA PERFUME STORE
        </p>

        <!-- Main Heading -->
        <h1
          class="max-w-6xl text-5xl font-extrabold uppercase leading-tight text-white drop-shadow-[0_6px_20px_rgba(0,0,0,0.8)] md:text-8xl"
        >
          {{ heroSlides[currentSlide].title }}
        </h1>

        <!-- Subtitle -->
        <p
          class="mt-8 max-w-3xl text-xl text-pink-50 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] md:text-2xl"
        >
          {{ heroSlides[currentSlide].subtitle }}
        </p>

        <!-- Premium Button -->
        <a
          href="#perfumes"
          class="mt-8 rounded-full bg-linear-to-r from-pink-500 via-fuchsia-500 to-purple-600 px-7 py-2.5 text-sm font-semibold text-white shadow-[0_0_18px_rgba(236,72,153,0.7)] transition duration-300 hover:scale-105 hover:shadow-[0_0_28px_rgba(217,70,239,1)]"
        >
          Shop Collection
        </a>
      </div>

      <!-- Slider Dots -->
      <div
        class="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3 rounded-full bg-white/90 px-5 py-3 shadow-xl"
      >
        <button
          v-for="(_, index) in heroSlides"
          :key="index"
          type="button"
          class="h-3 w-3 rounded-full transition duration-300"
          :class="
            index === currentSlide
              ? 'scale-125 bg-cyan-500'
              : 'bg-gray-500'
          "
          @click="goToSlide(index)"
        ></button>
      </div>
    </section>

    <!-- MAIN -->
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
        <RouterLink
          to="/women"
          class="rounded-3xl bg-linear-to-br from-pink-400 to-rose-500 p-8 text-white shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(244,114,182,0.8)]"
        >
          <h2 class="font-serif text-3xl font-bold">Women</h2>
          <p class="mt-2 text-pink-100">
            Elegant floral and sweet luxury scents.
          </p>
        </RouterLink>

        <div
          class="rounded-3xl bg-linear-to-br from-slate-900 to-purple-900 p-8 text-white shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(168,85,247,0.8)]"
        >
          <h2 class="font-serif text-3xl font-bold">Men</h2>
          <p class="mt-2 text-gray-300">
            Bold, fresh, and confident fragrances.
          </p>
        </div>

        <div
          class="rounded-3xl bg-linear-to-br from-cyan-500 to-pink-500 p-8 text-white shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(6,182,212,0.8)]"
        >
          <h2 class="font-serif text-3xl font-bold">Unisex</h2>
          <p class="mt-2 text-white/90">
            Modern perfumes for every personality.
          </p>
        </div>
      </section>

      <!-- Products -->
      <section id="perfumes" class="mt-16">
        <h2
          class="mb-8 text-center font-serif text-4xl font-bold text-pink-600"
        >
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