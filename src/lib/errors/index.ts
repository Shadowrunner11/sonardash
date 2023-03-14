export class NotImplementeError extends Error {
  constructor(extraMessage?: string) {
    super(`Method not impemented ${extraMessage ?? ''}`)
  }
}
