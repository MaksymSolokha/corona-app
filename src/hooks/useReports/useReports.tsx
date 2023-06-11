import dayjs from 'dayjs'
import { useMemo } from 'react'
import { REPORTS_URL } from '../../constants/constants.ts'
import { formatDate } from '../../utils/utils.ts'
import useMultipleData from '../useMultipleData'
import { Report, TypeResponse } from '../../types/types.ts'

const DATES_NUMBER = 20
function getDatesInRange(startDate: dayjs.Dayjs, endDate: dayjs.Dayjs) {
  const dates: dayjs.Dayjs[] = []

  let currentDate = startDate

  while (
    currentDate.isBefore(endDate, 'day') ||
    currentDate.isSame(endDate, 'day')
  ) {
    dates.push(currentDate)
    currentDate = currentDate.add(1, 'day')
  }

  if (dates.length <= DATES_NUMBER) return dates

  const indexStep = dates.length / DATES_NUMBER

  const filteredDates: dayjs.Dayjs[] = []

  Array.from(Array(DATES_NUMBER)).forEach((_, index) =>
    filteredDates.push(dates[Math.round(indexStep * index)])
  )
  filteredDates.push(dates[dates.length - 1]) // add end date
  return filteredDates
}

export const useReports = (
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs,
  iso?: string
) => {
  const startDateKey = startDate.toString()
  const endDateKey = endDate.toString()
  const dates = useMemo(
    () => getDatesInRange(startDate, endDate),
    [startDateKey, endDateKey]
  )
  const urls = useMemo(
    () => dates.map((date) => REPORTS_URL(formatDate(date), iso)),
    [dates, iso]
  )
  const { data, ...rest } = useMultipleData<TypeResponse<Report>>(urls)
  const reports = useMemo(() => data.map(({ data }) => data), [data])
  return { dates, reports, ...rest }
}
