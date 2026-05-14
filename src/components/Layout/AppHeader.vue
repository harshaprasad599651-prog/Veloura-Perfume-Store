<script setup lang="ts">
import { computed } from 'vue'
import { useCart } from '../../composables/useCart'
import { useTheme } from '../../composables/useTheme'

const { cartItems } = useCart()
const { isDark, toggleTheme } = useTheme()

const cartCount = computed(() =>
  cartItems.value.reduce((total, item) => total + item.quantity, 0),
)
</script>

<template>
  <header
    :class="[
      'sticky top-0 z-50 transition duration-500',
      isDark
        ? 'bg-[#0b0613] shadow-[0_6px_14px_rgba(236,72,153,0.15)]'
        : 'bg-[#dedede] shadow-[0_6px_14px_rgba(236,72,153,0.25)]',
    ]"
  >
    <div class="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <h1
          :class="[
            'bg-linear-to-r bg-clip-text font-serif text-[26px] font-bold tracking-[0.2em] text-transparent drop-shadow-[0_2px_6px_rgba(236,72,153,0.35)]',
            isDark
              ? 'from-pink-200 via-pink-400 to-fuchsia-500'
              : 'from-[#111827] via-[#db2777] to-[#7e22ce]',
          ]"
        >
          Veloura
        </h1>

        <span class="text-[22px] drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]">
          🌸
        </span>
      </div>

      <!-- Search -->
      <div
        :class="[
          'hidden h-8 w-56 items-center rounded-full px-3 shadow-sm md:flex',
          isDark ? 'bg-[#1c1027]' : 'bg-white',
        ]"
      >
        <input
          type="text"
          placeholder="search"
          :class="[
            'w-full bg-transparent text-center font-serif text-[14px] outline-none',
            isDark
              ? 'text-pink-100 placeholder:text-pink-200'
              : 'text-gray-500 placeholder:text-gray-500',
          ]"
        />

        <button class="flex h-5 w-5 items-center justify-center rounded-full bg-[#07aeca] text-[12px] text-white">
          🔍
        </button>
      </div>

      <!-- Nav -->
      <nav
        :class="[
          'hidden items-center gap-3 font-serif text-[15px] md:flex',
          isDark ? 'text-pink-100' : 'text-black',
        ]"
      >
        <a href="#home" class="hover:text-pink-500">
          Home
        </a>

        <a href="#perfumes" class="hover:text-pink-500">
          Perfumes
        </a>

        <a href="#contact" class="hover:text-pink-500">
          Contact
        </a>

        <a href="#about" class="hover:text-pink-500">
          About
        </a>
      </nav>

      <!-- Right Buttons -->
      <div class="flex items-center gap-2">
        <RouterLink
          to="/cart"
          class="relative flex h-9 w-9 items-center justify-center rounded-md bg-[#050b34] text-[18px] shadow-[0_0_8px_rgba(37,99,235,0.8)]"
        >
          🛒

          <span
            v-if="cartCount > 0"
            class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs font-bold text-white"
          >
            {{ cartCount }}
          </span>
        </RouterLink>

        <button
          class="flex h-9 w-9 items-center justify-center rounded-md bg-[#080022] text-[18px] shadow-[0_0_8px_rgba(168,85,247,0.8)]"
          @click="toggleTheme"
        >
          {{ isDark ? '☀️' : '🌙' }}
        </button>

        <RouterLink
          to="/login"
          :class="[
            'h-8 rounded-full px-4 py-1.5 text-[14px] font-semibold shadow transition duration-300',
            isDark
              ? 'bg-[#1c1027] text-pink-300 hover:bg-[#2b183d]'
              : 'bg-white text-pink-600 hover:bg-pink-50',
          ]"
        >
          LOGIN
        </RouterLink>
      </div>
    </div>
  </header>
</template>