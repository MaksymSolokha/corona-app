import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom'
import { About, Home } from './components/pages'
import Dashboard from './components/templates/Dashboard'
import { SWRConfig } from 'swr'
import { fetcher } from './utils/utils.ts'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function Root() {
  return (
    <Routes>
      <Route path={'/'} element={<Dashboard />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  )
}

const router = createBrowserRouter([{ path: '*', Component: Root }])

// 4️⃣ RouterProvider added
export default function App() {
  return (
    <SWRConfig
      value={{
        fetcher,
        shouldRetryOnError: false,
        provider: () => new Map(),
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </SWRConfig>
  )
}
