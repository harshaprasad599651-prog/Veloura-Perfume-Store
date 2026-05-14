<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '../components/Layout/AppHeader.vue'

const username = ref<string>('')
const password = ref<string>('')

const handleLogin = (): void => {
  alert(`Welcome ${username.value}`)
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <AppHeader />

    <main class="flex min-h-112.5 items-center justify-center px-6 py-16">
<form
  class="w-full max-w-md rounded-xl bg-pink-50 px-8 py-8 shadow-sm"
  @submit.prevent="handleLogin"
>
  <!-- Title -->
    <h1
      class="mb-8 text-center font-serif text-5xl font-bold tracking-wide text-pink-1000 drop-shadow-[0_2px_8px_rgba(236,72,153,0.35)]"
    >
      Login
    </h1>

  <!-- Username -->
  <input
    v-model="username"
    type="text"
    placeholder="Username"
    class="mb-5 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 outline-none focus:border-pink-400"
  />

  <!-- Password -->
  <input
    v-model="password"
    type="password"
    placeholder="Password"
    class="mb-6 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 outline-none focus:border-pink-400"
  />

  <!-- Button -->
  <button
    type="submit"
    class="w-full rounded-md bg-pink-400 py-2 text-sm font-semibold text-white transition hover:bg-pink-500"
  >
    Login
  </button>
</form>
    </main>

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