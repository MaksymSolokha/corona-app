import React, { FC, useMemo } from 'react'

import { Backdrop, Box, CircularProgress } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import dayjs from 'dayjs'

import { formatDate } from '../../../utils/utils.ts'
import useRegions from '../../../hooks/useRegions'
import useReports from '../../../hooks/useReports'
import { DatePicker } from '@mui/x-date-pickers'
import { Case } from '../../../types/types.ts'
import { Select } from '../../atoms'
import { Chart } from '../../organisms'

const START_DATE_KEY = 'startDay'
const END_DATE_KEY = 'endDay'
const CASE_KEY = 'case'
const COUNTRY_KEY = 'country'

const WORLD_ISO = 'world'
const DEFAULT_ISO = WORLD_ISO
const DEFAULT_CASE = 'confirmed'
const DEFAULT_START_DATE = '2020-03-01'
const DEFAULT_END_DATE = Date.now()

const cases = [
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Deaths', value: 'deaths' },
  { label: 'Recovered', value: 'recovered' },
]

const Home: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const startDay = dayjs(searchParams.get(START_DATE_KEY) || DEFAULT_START_DATE)
  const endDay = dayjs(searchParams.get(END_DATE_KEY) || DEFAULT_END_DATE)
  const appliedCase = (searchParams.get(CASE_KEY) || DEFAULT_CASE) as Case
  const countryIso = searchParams.get(COUNTRY_KEY) || DEFAULT_ISO
  const onChangeDay = (day: dayjs.Dayjs | null, key: string) => {
    setSearchParams((prev) => {
      prev.set(key, formatDate(day))
      return prev
    })
  }
  const handleChange = (newValue: string, key: string) => {
    setSearchParams((prev) => {
      prev.set(key, newValue)
      return prev
    })
  }

  const { data: regionsData = [] } = useRegions()

  const {
    isLoading: loading,
    reports,
    dates,
  } = useReports(
    startDay,
    endDay,
    countryIso === WORLD_ISO ? undefined : countryIso
  )
  const regions = useMemo(
    () => [
      { label: 'World', value: WORLD_ISO },
      ...regionsData.map(({ iso, name }) => ({
        label: name,
        value: iso,
      })),
    ],
    [regionsData]
  )

  return (
    <Box>
      <Box
        sx={{
          maxWidth: '100%',
          paddingBottom: 2,
          display: 'flex',
          gap: 2,
        }}
      >
        <DatePicker
          label="Start date"
          value={startDay}
          onChange={(val) => onChangeDay(val, START_DATE_KEY)}
          maxDate={endDay}
          minDate={dayjs('2020-01-01')}
        />
        <DatePicker
          label="End date"
          value={endDay}
          onChange={(val) => onChangeDay(val, END_DATE_KEY)}
          minDate={startDay}
          maxDate={dayjs(Date.now())}
        />
        {regions && (
          <Select
            name="country"
            label="Country"
            value={countryIso}
            handleChange={(newValue) => handleChange(newValue, COUNTRY_KEY)}
            options={regions}
          />
        )}
        <Select
          name="case"
          label="Case"
          value={appliedCase}
          handleChange={(newValue) => handleChange(newValue, CASE_KEY)}
          options={cases}
        />
        <Backdrop
          sx={{
            color: (theme) => theme.palette.common.white,
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
      <Chart appliedCase={appliedCase} dates={dates} reports={reports} />
    </Box>
  )
}

export default Home
