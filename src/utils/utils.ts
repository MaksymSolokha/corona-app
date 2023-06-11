import dayjs from 'dayjs'
import { Fetcher } from 'swr'

export const fetcher: Fetcher<unknown, string> = (url) =>
  fetch(url).then((res) => res.json())

export const formatDate = (day: dayjs.Dayjs | null | undefined) =>
  day?.format('YYYY-MM-DD').toString() || ''
