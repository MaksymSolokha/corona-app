import { FC } from 'react'
import { Box, Typography } from '@mui/material'

const About: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 10,
      }}
    >
      <Typography variant="h2">Created by: Solokha Maksym</Typography>
    </Box>
  )
}

export default About
