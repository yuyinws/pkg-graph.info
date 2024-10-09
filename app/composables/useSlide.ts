export const useSlide = defineStore('slide', () => {
  const isOpen = ref(false)

  return {
    isOpen,
  }
})
