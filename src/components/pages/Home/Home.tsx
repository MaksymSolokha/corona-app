import { FC, useEffect, useState } from 'react'

import { Container } from './styles'
import type { BoxProps } from '@mui/material'
import Chart from '../../organisms/Chart'
import Filters from '../../organisms/Filters'
import { DropDown } from '../../atoms'
import useSWR from 'swr'

const Home: FC<BoxProps> = ({ ...props }) => {
  const [country, setCountry] = useState<any>([])
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data } = useSWR(
    'https://covid-api.com/api/regions?order=iso&sort=desc',
    fetcher
  )
  useEffect(() => {
    setCountry(data?.data.map((item) => item.name))
  }, [data])

  const categoryMenu = ['Confirmed', 'Death', 'Recovered']

  return (
    <Container {...props}>
      <Filters
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
        }}
      >
        <DropDown placeholder={'Category'} dropDownMenu={categoryMenu} />
        <DropDown placeholder={'Country'} dropDownMenu={country} />
      </Filters>
      <Chart />
    </Container>
  )
}

export default Home
