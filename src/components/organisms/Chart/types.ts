import type { BoxProps } from '@mui/material'
import dayjs from 'dayjs'
import { Case, Report } from '../../../types/types.ts'

export interface IProps extends BoxProps {
  dates: dayjs.Dayjs[]
  reports: Report[]
  appliedCase: Case
}
