import { FC } from 'react'

import { Container } from './styles'
import { Typography } from '@mui/material'

const About: FC = ({ ...props }) => {
  return (
    <Container {...props}>
      <Typography variant="h1">About</Typography>
    </Container>
  )
}

export default About
