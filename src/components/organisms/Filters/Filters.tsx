import React, { FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { formatDate } from '../../../utils/utils.ts'
import {
  Backdrop,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import useRegions from '../../../hooks/useRegions'
import Chart from '../Chart'
import {
  CASE,
  COUNTRY,
  END_DATE,
  START_DATE,
} from '../../../constants/constants.ts'
import useReports from '../../../hooks/useReports'

const Filters: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const startDay = dayjs(searchParams.get(START_DATE) || '2023-06-01')
  const endDay = dayjs(searchParams.get(END_DATE) || Date.now())
  const appliedCase = searchParams.get(CASE) || 'confirmed'
  const country = searchParams.get(COUNTRY) || 'UKR'
  const onChangeDay = (day: dayjs.Dayjs | null, key: string) => {
    setSearchParams((prev) => {
      prev.set(key, formatDate(day))
      return prev
    })
  }
  const handleChange = (event: SelectChangeEvent, key: string) => {
    setSearchParams((prev) => {
      prev.set(key, event.target.value as string)
      return prev
    })
  }

  const { data: regions } = useRegions()

  const { isLoading: loading } = useReports(
    formatDate(startDay),
    formatDate(endDay),
    country
  )

  return (
    <Box>
      <Box
        sx={{
          maxWidth: '100%',
          paddingTop: 5,
          paddingBottom: 5,
          display: 'flex',
          gap: 10,
        }}
      >
        <DatePicker
          label="Start date"
          value={startDay}
          onChange={(val) => onChangeDay(val, START_DATE)}
          maxDate={endDay}
        />
        <DatePicker
          label="End date"
          value={endDay}
          onChange={(val) => onChangeDay(val, END_DATE)}
          minDate={startDay}
          maxDate={dayjs(Date.now())}
        />
        {regions && (
          <FormControl>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
              sx={{
                width: '150px',
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={country}
              label="Age"
              onChange={(e) => handleChange(e, COUNTRY)}
            >
              {regions.map(({ iso, name }) => (
                <MenuItem key={name} value={iso}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <FormControl>
          <InputLabel id="demo-simple-select-label">Case</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={appliedCase}
            label="Case"
            onChange={(e) => handleChange(e, CASE)}
          >
            <MenuItem value="confirmed">Confirmed</MenuItem>
            <MenuItem value="deaths">Deaths</MenuItem>
            <MenuItem value="recovered">Recovered</MenuItem>
          </Select>
        </FormControl>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
      <Chart />
    </Box>
  )
}

export default Filters
