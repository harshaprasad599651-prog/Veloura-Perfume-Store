import { ref, onMounted } from 'vue'
import type { Product, ProductResponse } from '../types/product'

export function useProducts() {
  const products = ref<Product[]>([])
  const loading = ref<boolean>(false)

  const fetchProducts = async () => {
    loading.value = true
    try {
      const res = await fetch('https://dummyjson.com/products/category/fragrances')
      const data: ProductResponse = await res.json()
      products.value = data.products
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchProducts)

  return {
    products,
    loading
  }
}