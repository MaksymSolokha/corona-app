export type TypeResponse<T> = {
  data: T
}

export type Region = {
  iso: string
  name: string
}

export type Report = {
  active: number
  active_diff: number
  confirmed: number
  confirmed_diff: number
  date: string
  deaths: number
  deaths_diff: number
  fatality_rate: number
  last_update: string
  recovered: number
  recovered_diff: number
}

export type Case = 'confirmed' | 'deaths' | 'recovered'
