import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../organisms/Sidebar'

const Dashboard: FC = ({ ...props }) => {
  return (
    <>
      <Sidebar>
        <Outlet />
      </Sidebar>
    </>
  )
}

export default Dashboard
