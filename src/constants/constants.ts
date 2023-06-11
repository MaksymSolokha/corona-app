export const BASE_API_URL = 'https://covid-api.com/api'
export const REGIONS_URL = `${BASE_API_URL}/regions?order=iso`
export const REPORTS_URL = (date: string, countryIso?: string) =>
  `${BASE_API_URL}/reports/total?date=${date}${
    countryIso ? `&iso=${countryIso}` : ''
  }`
