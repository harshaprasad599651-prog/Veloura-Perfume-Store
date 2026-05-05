<script setup lang="ts">
import { computed, ref } from 'vue'
import AppHeader from '../components/Layout/AppHeader.vue'
import ProductList from '../components/product/ProductList.vue'
import { useProducts } from '../composables/useProducts'

const { products, loading, errorMessage } = useProducts()

const searchQuery = ref<string>('')
const currentIndex = ref<number>(0)
const slideDirection = ref<'left' | 'right'>('right')

const sliderImages = computed<string[]>(() =>
  products.value.slice(0, 5).map((product) => product.thumbnail),
)

const nextSlide = (): void => {
  if (sliderImages.value.length === 0) return
  slideDirection.value = 'right'
  currentIndex.value = (currentIndex.value + 1) % sliderImages.value.length
}

const prevSlide = (): void => {
  if (sliderImages.value.length === 0) return
  slideDirection.value = 'left'
  currentIndex.value =
    (currentIndex.value - 1 + sliderImages.value.length) % sliderImages.value.length
}

const leftImage = computed(() => {
  const images = sliderImages.value
  if (images.length === 0) return ''
  return images[(currentIndex.value - 1 + images.length) % images.length]
})

const centerImage = computed(() => {
  const images = sliderImages.value
  if (images.length === 0) return ''
  return images[currentIndex.value]
})

const rightImage = computed(() => {
  const images = sliderImages.value
  if (images.length === 0) return ''
  return images[(currentIndex.value + 1) % images.length]
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

    <main class="mx-auto max-w-7xl px-6 py-12">
      <!-- Hero Carousel -->
      <section class="relative mt-8 overflow-hidden rounded-[40px] px-6 py-10">
        <div
          class="absolute inset-0 bg-linear-to-r from-pink-200/40 via-white to-purple-200/40 blur-3xl"
        ></div>

        <p
          v-if="loading"
          class="relative z-10 text-center font-serif text-2xl text-pink-500"
        >
          Loading slider...
        </p>

        <div
          v-else
          class="relative z-10 flex items-center justify-center gap-10"
        >
          <!-- Left Button -->
          <button
            type="button"
            class="absolute left-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-3xl text-gray-500 shadow-xl transition duration-300 hover:scale-110 hover:text-pink-500 hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]"
            @click="prevSlide"
          >
            ←
          </button>

          <!-- Left Image -->
          <div
            :key="leftImage"
            class="hidden h-72 w-56 overflow-hidden rounded-3xl opacity-35 shadow-xl transition duration-700 lg:block"
            :class="slideDirection === 'right' ? 'slide-side-left' : 'slide-side-right'"
          >
            <img
              :src="leftImage"
              alt="Previous perfume"
              class="h-full w-full object-contain"
            />
          </div>

          <!-- Center Image -->
          <div
            :key="centerImage"
            class="relative z-20 flex h-96 w-full max-w-3xl items-center justify-center overflow-hidden rounded-[40px] bg-white shadow-2xl transition duration-700"
            :class="slideDirection === 'right' ? 'slide-center-right' : 'slide-center-left'"
          >
            <div
              class="absolute inset-0 rounded-[40px] bg-linear-to-br from-pink-300/30 via-white to-purple-300/30"
            ></div>

            <img
              :src="centerImage"
              alt="Highlighted perfume"
              class="relative z-10 h-full w-full object-contain p-8"
            />

            <div
              class="pointer-events-none absolute inset-0 rounded-[40px] shadow-[0_0_70px_rgba(236,72,153,0.9)]"
            ></div>
          </div>

          <!-- Right Image -->
          <div
            :key="rightImage"
            class="hidden h-72 w-56 overflow-hidden rounded-3xl opacity-35 shadow-xl transition duration-700 lg:block"
            :class="slideDirection === 'right' ? 'slide-side-right' : 'slide-side-left'"
          >
            <img
              :src="rightImage"
              alt="Next perfume"
              class="h-full w-full object-contain"
            />
          </div>

          <!-- Right Button -->
          <button
            type="button"
            class="absolute right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-3xl text-gray-500 shadow-xl transition duration-300 hover:scale-110 hover:text-pink-500 hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]"
            @click="nextSlide"
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

<style scoped>
.slide-center-right {
  animation: centerFromRight 0.7s ease both;
}

.slide-center-left {
  animation: centerFromLeft 0.7s ease both;
}

.slide-side-left {
  animation: sideFromLeft 0.7s ease both;
}

.slide-side-right {
  animation: sideFromRight 0.7s ease both;
}

@keyframes centerFromRight {
  from {
    transform: translateX(120px) scale(0.9);
    opacity: 0.5;
  }

  to {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
}

@keyframes centerFromLeft {
  from {
    transform: translateX(-120px) scale(0.9);
    opacity: 0.5;
  }

  to {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
}

@keyframes sideFromLeft {
  from {
    transform: translateX(-80px) scale(1);
    opacity: 0.7;
  }

  to {
    transform: translateX(0) scale(0.9);
    opacity: 0.35;
  }
}

@keyframes sideFromRight {
  from {
    transform: translateX(80px) scale(1);
    opacity: 0.7;
  }

  to {
    transform: translateX(0) scale(0.9);
    opacity: 0.35;
  }
}
</style>