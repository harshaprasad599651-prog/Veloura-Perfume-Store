import { ref } from 'vue'

const savedTheme = localStorage.getItem('veloura-theme')
const isDark = ref<boolean>(savedTheme === 'dark')

export function useTheme() {
  const toggleTheme = (): void => {
    isDark.value = !isDark.value
    localStorage.setItem('veloura-theme', isDark.value ? 'dark' : 'light')
  }

  return {
    isDark,
    toggleTheme,
  }
}