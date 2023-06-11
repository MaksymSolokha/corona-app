import dayjs from 'dayjs'
import { useMemo } from 'react'
import { REPORTS_URL } from '../../constants/constants.ts'
import { formatDate } from '../../utils/utils.ts'
import useMultipleData from '../useMultipleData'

const DATES_NUMBER = 15
function getDatesInRange(startDate: string, endDate: string) {
  const date = new Date(new Date(startDate).getTime())

  const dates: Date[] = []

  while (date <= new Date(endDate)) {
    dates.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  if (dates.length <= DATES_NUMBER) return dates

  const indexStep = dates.length / DATES_NUMBER

  const filteredDates: Date[] = []

  Array.from(Array(DATES_NUMBER)).forEach((_, index) =>
    filteredDates.push(dates[Math.round(indexStep * index)])
  )
  filteredDates.push(dates[dates.length - 1]) // add end date
  return filteredDates
}

export const useReports = (startDate: string, endDate: string, iso: string) => {
  const urls = useMemo(
    () =>
      getDatesInRange(startDate, endDate).map((date) =>
        REPORTS_URL(formatDate(dayjs(date)), iso)
      ),
    [startDate, endDate, iso]
  )
  return useMultipleData(urls)
}
