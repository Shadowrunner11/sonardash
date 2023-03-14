export const getHourMinSec = (date = new Date()) =>
  date.toLocaleDateString(navigator.language, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  })

export const getShortDate = (date = new Date()) =>
  date.toLocaleDateString(navigator.language, {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })

export const getTimeAndDate = (date = new Date()) => ({
  time: getHourMinSec(date),
  date: getShortDate(date),
})
