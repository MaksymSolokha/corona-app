import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom'
import { About, Home } from './components/pages'
import Dashboard from './components/templates/Dashboard'

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
  return <RouterProvider router={router} />
}
