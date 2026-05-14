<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '../components/Layout/AppHeader.vue'
import { useCart } from '../composables/useCart'
import type { Product } from '../types/product'

const route = useRoute()

const { addToCart } = useCart()

const product = ref<Product | null>(null)
const loading = ref<boolean>(false)
const errorMessage = ref<string>('')

const quantity = ref<number>(1)

const productId = computed(() => Number(route.params.id))

const fetchProduct = async (): Promise<void> => {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await fetch(
      `https://dummyjson.com/products/${productId.value}`,
    )

    if (!response.ok) {
      throw new Error('Product not found')
    }

    product.value = (await response.json()) as Product
  } catch (error) {
    errorMessage.value =
      error instanceof Error ? error.message : 'Something went wrong'
  } finally {
    loading.value = false
  }
}

const increaseQuantity = (): void => {
  quantity.value += 1
}

const decreaseQuantity = (): void => {
  if (quantity.value > 1) {
    quantity.value -= 1
  }
}

const addSelectedToCart = (): void => {
  if (!product.value) return

  for (let index = 0; index < quantity.value; index += 1) {
    addToCart(product.value)
  }
}

onMounted(fetchProduct)
</script>

<template>
  <div
    class="min-h-screen bg-linear-to-br from-pink-50 via-white to-purple-100"
  >
    <AppHeader />

    <main class="mx-auto max-w-7xl px-5 py-8">
      <p
        v-if="loading"
        class="text-center text-xl font-semibold text-pink-600"
      >
        Loading product...
      </p>

      <p
        v-else-if="errorMessage"
        class="text-center text-xl font-semibold text-red-500"
      >
        {{ errorMessage }}
      </p>

      <section
        v-else-if="product"
        class="grid gap-6 rounded-[28px] bg-white p-6 shadow-[0_10px_35px_rgba(236,72,153,0.15)] lg:grid-cols-[320px_1fr_240px]"
      >
        <!-- LEFT IMAGE -->
        <div class="rounded-3xl bg-pink-50 p-5 shadow-inner">
          <img
            :src="product.thumbnail"
            :alt="product.title"
            class="mx-auto h-80 w-full object-contain"
          />

          <div class="mt-4 flex gap-2 overflow-x-auto">
            <img
              v-for="image in product.images"
              :key="image"
              :src="image"
              :alt="product.title"
              class="h-14 w-14 rounded-lg border border-pink-200 bg-white object-contain p-1"
            />
          </div>
        </div>

        <!-- CENTER DETAILS -->
        <div class="flex flex-col justify-center text-center">
          <h1 class="font-serif text-xl font-bold leading-snug text-black!">
            {{ product.title }}
          </h1>

          <p class="mt-3 text-sm text-gray-700">
            Brand:
            <span class="font-bold text-pink-600">
              {{ product.brand }}
            </span>
          </p>

          <p class="mt-4 text-3xl font-extrabold text-pink-600">
            $ {{ product.price }}
          </p>

          <p class="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-700">
            {{ product.description }}
          </p>

          <!-- Quantity -->
          <div class="mt-6 flex justify-center">
            <div
              class="flex items-center overflow-hidden rounded-full border border-pink-200 bg-white shadow-sm"
            >
              <button
                class="px-5 py-2 text-xl font-bold text-pink-500 hover:bg-pink-50"
                @click="decreaseQuantity"
              >
                −
              </button>

              <span class="px-7 py-2 font-semibold text-gray-800">
                {{ quantity }}
              </span>

              <button
                class="px-5 py-2 text-xl font-bold text-pink-500 hover:bg-pink-50"
                @click="increaseQuantity"
              >
                +
              </button>
            </div>
          </div>

          <!-- Buttons under details -->
          <div class="mt-7 flex justify-center gap-4">
            <button
              class="w-36 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-cyan-600"
            >
              Buy Now
            </button>

            <button
              class="w-36 rounded-xl bg-pink-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-pink-600"
              @click="addSelectedToCart"
            >
              Add to Cart
            </button>
          </div>
        </div>

        <!-- RIGHT DETAILS -->
        <aside class="flex flex-col justify-center py-4">
          <h2 class="font-serif text-xl font-bold text-pink-600!">
            Delivery Options
          </h2>

          <div class="mt-4 space-y-2 text-sm leading-6 text-gray-700!">
            <p>Western Province, Sri Lanka</p>
            <p>Standard Delivery Available</p>
            <p>Cash on Delivery Available</p>
          </div>

          <div class="my-5 border-t border-pink-200"></div>

          <h2 class="font-serif text-xl font-bold text-pink-600!">
            Return & Warranty
          </h2>

          <div class="mt-4 space-y-2 text-sm leading-6 text-gray-700">
            <p>14 days easy return</p>
            <p>6 months seller warranty</p>
            <p>Authentic fragrance guarantee</p>
          </div>
        </aside>
      </section>
    </main>
  </div>
</template>