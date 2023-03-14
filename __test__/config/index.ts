import 'dotenv/config'

export const IS_LOGGER_ENABLED = Number(process.env.IS_LOGGER_ENABLED) === 1 || process.env.IS_LOGGER_ENABLED === 'true'
