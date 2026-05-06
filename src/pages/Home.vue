<script setup lang="ts">
import { computed, ref } from 'vue'
import AppHeader from '../components/Layout/AppHeader.vue'
import ProductList from '../components/product/ProductList.vue'
import { useProducts } from '../composables/useProducts'

const { products, loading, errorMessage } = useProducts()

const searchQuery = ref<string>('')
const currentIndex = ref<number>(0)
const slideDirection = ref<'next' | 'prev'>('next')

const sliderImages = computed<string[]>(() =>
  products.value.slice(0, 5).map((product) => product.thumbnail),
)

const nextSlide = (): void => {
  if (sliderImages.value.length === 0) return
  slideDirection.value = 'next'
  currentIndex.value = (currentIndex.value + 1) % sliderImages.value.length
}

const prevSlide = (): void => {
  if (sliderImages.value.length === 0) return
  slideDirection.value = 'prev'
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
            :key="`left-${leftImage}`"
            class="hidden h-72 w-56 overflow-hidden rounded-3xl opacity-35 shadow-xl lg:block"
            :class="slideDirection === 'next' ? 'left-next' : 'left-prev'"
          >
            <img
              :src="leftImage"
              alt="Previous perfume"
              class="h-full w-full object-contain"
            />
          </div>

          <!-- Center Image -->
          <div
            :key="`center-${centerImage}`"
            class="relative z-20 flex h-96 w-full max-w-3xl items-center justify-center overflow-hidden rounded-[40px] bg-white shadow-2xl"
            :class="slideDirection === 'next' ? 'center-from-right' : 'center-from-left'"
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
            :key="`right-${rightImage}`"
            class="hidden h-72 w-56 overflow-hidden rounded-3xl opacity-35 shadow-xl lg:block"
            :class="slideDirection === 'next' ? 'right-next' : 'right-prev'"
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
.center-from-right {
  animation: centerFromRight 0.7s ease both;
}

.center-from-left {
  animation: centerFromLeft 0.7s ease both;
}

.left-next {
  animation: leftNext 0.7s ease both;
}

.right-next {
  animation: rightNext 0.7s ease both;
}

.left-prev {
  animation: leftPrev 0.7s ease both;
}

.right-prev {
  animation: rightPrev 0.7s ease both;
}

/* Right button: right image comes to middle */
@keyframes centerFromRight {
  from {
    transform: translateX(220px) scale(0.85);
    opacity: 0.35;
  }

  to {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
}

/* Left button: left image comes to middle */
@keyframes centerFromLeft {
  from {
    transform: translateX(-220px) scale(0.85);
    opacity: 0.35;
  }

  to {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
}

/* Right button: carousel moves left */
@keyframes leftNext {
  from {
    transform: translateX(220px) scale(1);
    opacity: 1;
  }

  to {
    transform: translateX(0) scale(0.9);
    opacity: 0.35;
  }
}

@keyframes rightNext {
  from {
    transform: translateX(220px) scale(0.9);
    opacity: 0.15;
  }

  to {
    transform: translateX(0) scale(0.9);
    opacity: 0.35;
  }
}

/* Left button: carousel moves right */
@keyframes leftPrev {
  from {
    transform: translateX(-220px) scale(0.9);
    opacity: 0.15;
  }

  to {
    transform: translateX(0) scale(0.9);
    opacity: 0.35;
  }
}

@keyframes rightPrev {
  from {
    transform: translateX(-220px) scale(1);
    opacity: 1;
  }

  to {
    transform: translateX(0) scale(0.9);
    opacity: 0.35;
  }
}
</style>