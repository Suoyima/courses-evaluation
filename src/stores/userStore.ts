import { defineStore } from 'pinia'
import { getUserInfo } from '../api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null as {
      id: number
      name: string
      avatar: string
      reviews_count: number
    } | null,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchUserInfo() {
      this.loading = true
      try {
        const data = await getUserInfo()
        this.currentUser = data
      } catch (err) {
        this.error = err instanceof Error ? err.message : '获取用户信息失败'
      } finally {
        this.loading = false
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.currentUser,
  },
})
