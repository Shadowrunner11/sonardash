import { setupCache as setUpCacheDev } from 'axios-cache-interceptor/dev'
import { setupCache } from 'axios-cache-interceptor'

export const setupAxiosCache = import.meta.env.DEV ? setUpCacheDev : setupCache
