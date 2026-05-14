<script setup lang="ts">
import AppHeader from '../components/Layout/AppHeader.vue'
import { useCart } from '../composables/useCart'

const {
  cartItems,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  subtotal,
  shippingCost,
  tax,
  total,
} = useCart()

const formatPrice = (price: number): string => price.toFixed(2)
</script>

<template>
  <div class="min-h-screen bg-white">
    <AppHeader />

    <main class="mx-auto grid max-w-7xl gap-8 px-8 py-16 lg:grid-cols-[1fr_340px]">
      <!-- Cart Items -->
      <section>
        <h1 class="mb-10 font-serif text-4xl font-bold text-pink-600!">
          Shopping Cart
        </h1>

        <p
          v-if="cartItems.length === 0"
          class="rounded-2xl bg-pink-50 p-10 text-center text-xl text-gray-600"
        >
          Your cart is empty.
        </p>

        <div v-else class="space-y-6">
          <article
            v-for="item in cartItems"
            :key="item.product.id"
            class="flex items-center gap-8 rounded-lg bg-[#fcd8ed] px-8 py-5 shadow-sm"
          >
            <img
              :src="item.product.thumbnail"
              :alt="item.product.title"
              class="h-28 w-28 rounded bg-white object-contain p-2"
            />

            <div class="flex-1">
              <h2 class="text-3xl font-bold text-black!">
              {{ item.product.title }}
              </h2>

              <div
                class="mt-5 inline-flex items-center rounded-full border border-pink-200 bg-white px-4 py-1"
              >
                <button
                  class="px-2 text-lg font-bold text-pink-500"
                  @click="decreaseQuantity(item.product.id)"
                >
                  −
                </button>

                <span class="px-4 text-sm">
                  {{ item.quantity }}
                </span>

                <button
                  class="px-2 text-lg font-bold text-pink-500"
                  @click="increaseQuantity(item.product.id)"
                >
                  +
                </button>
              </div>
            </div>

            <div class="text-right">
              <p class="text-2xl font-bold text-black">
                {{ formatPrice(item.product.price * item.quantity) }} USD
              </p>

              <button
                class="mt-16 text-sm text-gray-600 hover:text-pink-600"
                @click="removeFromCart(item.product.id)"
              >
                🗑 Remove
              </button>
            </div>
          </article>
        </div>
      </section>

      <!-- Summary -->
      <aside
        class="h-fit -translate-y-10 rounded-2xl bg-pink-200/80 px-8 py-7 shadow-[0_6px_18px_rgba(0,0,0,0.35)]"
      >
        <h2
          class="mb-6 text-center font-serif text-lg uppercase tracking-wide text-fuchsia-800!"
        >
          Summary
        </h2>

        <div class="space-y-3 font-serif text-lg text-black">
          <div class="flex justify-between">
            <span>Sub Total</span>
            <span>{{ formatPrice(subtotal) }}</span>
          </div>

          <div class="flex justify-between">
            <span>Shipping Cost</span>
            <span>{{ formatPrice(shippingCost) }}</span>
          </div>

          <div class="flex justify-between">
            <span>Tax</span>
            <span>{{ formatPrice(tax) }}</span>
          </div>
        </div>

        <div class="my-6 border-t border-black"></div>

        <div class="flex justify-between font-serif text-2xl text-black">
          <span>TOTAL</span>
          <span>USD {{ formatPrice(total) }}</span>
        </div>

        <!-- Buttons -->
        <div class="mt-8 space-y-4">
          <button
            class="w-full rounded-xl bg-fuchsia-700 px-4 py-3 text-center font-serif text-[15px] font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-fuchsia-800"
          >
            PROCEED TO CHECKOUT
          </button>

          <RouterLink
            to="/"
            class="block w-full rounded-xl bg-white px-4 py-3 text-center font-serif text-[15px] font-semibold text-pink-500 shadow-lg transition hover:scale-105"
          >
            CONTINUE TO SHOPPING
          </RouterLink>
        </div>
      </aside>
    </main>

    <!-- Footer -->
    <footer class="bg-[#bd84bf] px-12 py-10 text-white">
      <div class="mx-auto flex max-w-7xl items-start justify-between">
        <div>
          <h2 class="font-serif text-3xl uppercase tracking-wider">
            VELOURA
          </h2>

          <p class="mt-3 font-serif text-xl italic">
            Explore Fragrances
          </p>
        </div>

        <div>
          <h3 class="mb-3 font-serif text-lg">
            Quick Links
          </h3>

          <ul class="space-y-1 font-serif text-sm leading-4">
            <li>Categories</li>
            <li>Feedbacks</li>
            <li>Policies</li>
            <li>Deliveries</li>
            <li>Branches</li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>