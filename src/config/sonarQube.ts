export const TOKEN: string = import.meta.env.VITE_SONAR_TOKEN
console.log(TOKEN)
export const API_URL =
  import.meta.env.VITE_API_URL_SONAR ||
  'https://sonarqube.innovacionpacifico.com/api'
