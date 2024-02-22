import { defineStore } from 'pinia'

export const useStore = defineStore( 'store', {
  state: () => (
    {
      isMobile: null,
      initialized: null
    }
  ),
  getters: {
    getIsMobile: ( state ) => state.isMobile
  },
  actions: {
    initialize() {
      this.initialized = true
      this.updateMobileBreakpoint()
    },
    updateMobileBreakpoint() {
      this.isMobile = innerWidth <= 767
    }
  }
} )