export const START_DATE = 'startDay'
export const END_DATE = 'endDay'
export const CASE = 'case'
export const COUNTRY = 'country'

export const BASE_API_URL = 'https://covid-api.com/api'
export const REGIONS_URL = `${BASE_API_URL}/regions?order=iso`
export const REPORTS_URL = (date: string, countryIso: string) =>
  `${BASE_API_URL}/reports/total?date=${date}&iso=${countryIso}`
