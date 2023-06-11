import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import dayjs from 'dayjs'
import { formatDate } from '../../../utils/utils.ts'
import { IProps } from './types.ts'
import { FC, useMemo } from 'react'
import { Case } from '../../../types/types.ts'
import theme from '../../../styles/theme.ts'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const options: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Chart.js ',
    },
  },
}

const getDataVariant = (appliedCase: Case) => {
  switch (appliedCase) {
    case 'recovered':
      return {
        label: 'Recovered',
        borderColor: theme.palette.success.light,
        backgroundColor: theme.palette.success.dark,
      }
    case 'confirmed':
      return {
        label: 'Confirmed',
        borderColor: theme.palette.info.light,
        backgroundColor: theme.palette.info.dark,
      }
    case 'deaths':
      return {
        label: 'Deaths',
        borderColor: theme.palette.error.light,
        backgroundColor: theme.palette.error.dark,
      }
    default:
      return {
        label: 'Recovered',
        borderColor: theme.palette.success.light,
        backgroundColor: theme.palette.success.dark,
      }
  }
}

const Chart: FC<IProps> = ({ dates, reports, appliedCase }) => {
  const data: ChartData<'line'> = useMemo(
    () => ({
      labels: dates.map((date) => formatDate(dayjs(date))),
      datasets: [
        {
          data: reports.map((report) => report[appliedCase] || 0),
          ...getDataVariant(appliedCase),
        },
      ],
    }),
    [appliedCase, dates, reports]
  )

  return <Line options={options} data={data} />
}

export default Chart
