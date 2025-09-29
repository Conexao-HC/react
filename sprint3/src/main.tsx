import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Error from './routes/Error/index.tsx'
import Faq from './routes/Faq/index.tsx'
import AgendamentoPage from './routes/Agendamento/index.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
    {path:"/Faq", element:<Faq/>},
    {path:"/Agendamento", element:<AgendamentoPage/>}

    ]
  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
