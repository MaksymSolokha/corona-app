import dayjs from 'dayjs'
import { Fetcher } from 'swr'
import { ResponseData, TypeResponse } from '../types/types.ts'

export const fetcher: Fetcher<TypeResponse<ResponseData>, string> = (url) =>
  fetch(url).then((res) => res.json())

export const formatDate = (day: dayjs.Dayjs | null | undefined) =>
  day?.format('YYYY-MM-DD').toString() || ''
