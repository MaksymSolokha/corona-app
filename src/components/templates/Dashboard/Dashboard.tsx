import { FC } from 'react'

import { Container } from './styles'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../organisms/Sidebar'

const Dashboard: FC = ({ ...props }) => {
  return (
    <Container {...props}>
      <Sidebar>
        <Outlet />
      </Sidebar>
    </Container>
  )
}

export default Dashboard
