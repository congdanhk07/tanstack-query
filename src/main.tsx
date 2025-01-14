import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from './App'
import './index.css'
import ProfilePage from './pages/profile'
import TnxDetailsComponent from './pages/tnx-details'
import { Posts } from './pages/posts'
// import TnxDetailsComponent from './pages/tnx-details'

// create once with default options
const queryClient = new QueryClient()
const container = document.getElementById('root')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript

// Define your routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'posts',
        element: <Posts />,
      },
      {
        path: 'tnx-details',
        element: <TnxDetailsComponent />,
      },
    ],
  },
])

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
