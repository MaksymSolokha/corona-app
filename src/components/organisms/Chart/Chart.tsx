import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useSearchParams } from 'react-router-dom'
import dayjs from 'dayjs'
import {
  CASE,
  COUNTRY,
  END_DATE,
  START_DATE,
} from '../../../constants/constants.ts'
import useReports from '../../../hooks/useReports'
import { formatDate } from '../../../utils/utils.ts'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
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

export default function Chart() {
  const [searchParams] = useSearchParams()
  const startDay = dayjs(searchParams.get(START_DATE) || '2023-06-01')
  const endDay = dayjs(searchParams.get(END_DATE) || Date.now())
  const appliedCase = searchParams.get(CASE) || 'confirmed'
  const country = searchParams.get(COUNTRY) || 'UKR'

  const { data: reports } = useReports(
    formatDate(startDay),
    formatDate(endDay),
    country
  )

  const date: string[] | 0 = reports.map((item) => item.data.date)
  const confirmed: number[] | 0 = reports.map((item) => item.data.confirmed)
  const recovered: number[] | 0 = reports.map((item) => item.data.recovered)
  const death: number[] | 0 = reports.map((item) => item.data.deaths)

  const deathChart = {
    labels: date,
    datasets: [
      {
        label: 'Deaths',
        data: death,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }
  const confirmedChart = {
    labels: date,
    datasets: [
      {
        label: 'Confirmed',
        data: confirmed,
        borderColor: 'rgb(79,160,255)',
        backgroundColor: 'rgba(99,172,255,0.5)',
      },
    ],
  }
  const recoveredChart = {
    labels: date,
    datasets: [
      {
        label: 'Recovered',
        data: recovered,
        borderColor: 'rgb(143,255,99)',
        backgroundColor: 'rgba(152,255,148,0.5)',
      },
    ],
  }

  const setChart = (options: string): ChartData<'line'> => {
    if (options === 'confirmed') {
      return confirmedChart
    }
    if (options === 'deaths') {
      return deathChart
    }
    if (options === 'recovered') {
      return recoveredChart
    }
    return confirmedChart
  }

  return (
    <Line
      width={'100px'}
      height={'50px'}
      options={{ maintainAspectRatio: true }}
      data={setChart(appliedCase)}
    />
  )
}
