<script setup lang="ts"></script>

<template>
  <header class="sticky top-0 z-50 bg-[#dedede] shadow-[0_8px_18px_rgba(236,72,153,0.35)]">
    <div class="mx-auto flex h-18 max-w-7xl items-center justify-between px-4">
      
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <h1 class="font-serif text-[34px] tracking-[0.22em] text-black">
          Veloura
        </h1>
        <span class="text-[30px] drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]">
          🌸
        </span>
      </div>

      <!-- Search -->
      <div class="hidden h-10 w-67.5 items-center rounded-full bg-white px-5 shadow-sm md:flex">
        <input
          type="text"
          placeholder="search"
          class="w-full bg-transparent text-center font-serif text-[25px] text-gray-500 outline-none placeholder:text-gray-500"
        />
        <button class="flex h-6 w-6 items-center justify-center rounded-full bg-[#07aeca] text-white">
          🔍
        </button>
      </div>

      <!-- Nav (FIXED spacing) -->
      <nav class="hidden items-center gap-2 font-serif text-[18px] text-black md:flex">
        <a href="#home" class="hover:text-pink-500">Home</a>
        <a href="#perfumes" class="hover:text-pink-500">Perfumes</a>
        <a href="#contact" class="hover:text-pink-500">Contact</a>
        <a href="#about" class="hover:text-pink-500">About</a>
      </nav>

      <!-- Right Buttons -->
      <div class="flex items-center gap-2">
        <button class="flex h-11.5 w-11.5 items-center justify-center rounded-lg bg-[#050b34] text-[26px] shadow-[0_0_12px_rgba(37,99,235,0.9)]">
          🛒
        </button>

        <button class="flex h-11.5 w-11.5 items-center justify-center rounded-lg bg-[#080022] text-[28px] shadow-[0_0_12px_rgba(168,85,247,0.9)]">
          🌙
        </button>

        <button class="h-10.5 rounded-full bg-white px-5 font-semibold text-[18px] text-pink-600 shadow-md hover:bg-pink-50">
          LOGIN
        </button>
      </div>
    </div>
  </header>
</template>