import { setupAxiosCache } from '@config/axiosCache'
import type { AxiosInstance } from 'axios'
import { AxiosStorage } from 'axios-cache-interceptor'

export class AxiosCache {
  private axiosInstance: AxiosInstance
  constructor(axiosInstance: AxiosInstance, storage: AxiosStorage) {
    this.axiosInstance = axiosInstance

    if (this.isAvailableCache)
      this.axiosInstance = setupAxiosCache(this.axiosInstance, {
        interpretHeader: false,
        methods: [ 'get' ],
        storage,
        // eslint-disable-next-line no-console
        debug: console.log,
      })
  }

  get isAvailableCache() {
    try {
      return import.meta.env.VITE_IS_AVAILABLE_CACHE
    } catch (error) {
      return process.env.VITE_IS_AVAILABALE_CACHE
    }
  }

  get instance() {
    return this.axiosInstance
  }
}
