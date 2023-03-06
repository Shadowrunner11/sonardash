export function cleanPojo(pojo: Record<string, unknown>) {
  return Object.keys(pojo).reduce((newPojo: Record<string, unknown>, key) => {
    const value = pojo[key]
    // eqqeq se omite aproposito para tambien comparar undefined
    const isNotNill = value != null

    if (isNotNill) newPojo[key] = value

    return newPojo
  }, {})
}
