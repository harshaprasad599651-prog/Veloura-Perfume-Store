import { computed, ref, watch } from 'vue'
import type { Product } from '../types/product'

export interface CartItem {
  product: Product
  quantity: number
}

const storedCart = localStorage.getItem('veloura-cart')

const cartItems = ref<CartItem[]>(
  storedCart ? (JSON.parse(storedCart) as CartItem[]) : [],
)

watch(
  cartItems,
  () => {
    localStorage.setItem('veloura-cart', JSON.stringify(cartItems.value))
  },
  { deep: true },
)

export function useCart() {
  const addToCart = (product: Product): void => {
    const existingItem = cartItems.value.find(
      (item) => item.product.id === product.id,
    )

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cartItems.value.push({
        product,
        quantity: 1,
      })
    }
  }

  const increaseQuantity = (id: number): void => {
    const item = cartItems.value.find((cartItem) => cartItem.product.id === id)
    if (item) item.quantity += 1
  }

  const decreaseQuantity = (id: number): void => {
    const item = cartItems.value.find((cartItem) => cartItem.product.id === id)

    if (!item) return

    if (item.quantity > 1) {
      item.quantity -= 1
    } else {
      cartItems.value = cartItems.value.filter(
        (cartItem) => cartItem.product.id !== id,
      )
    }
  }

  const removeFromCart = (id: number): void => {
    cartItems.value = cartItems.value.filter(
      (item) => item.product.id !== id,
    )
  }

  const subtotal = computed(() =>
    cartItems.value.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    ),
  )

  const shippingCost = computed(() => (cartItems.value.length > 0 ? 24 : 0))
  const tax = computed(() => subtotal.value * 0.1)
  const total = computed(() => subtotal.value + shippingCost.value + tax.value)

  return {
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    subtotal,
    shippingCost,
    tax,
    total,
  }
}