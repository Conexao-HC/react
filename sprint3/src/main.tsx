import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Contato from './routes/Contato/index.tsx'
import Error from './routes/Error/index.tsx'
import Faq from './routes/Faq/index.tsx'
import Integrantes from './routes/Integrantes/index.tsx'
import Sobre from './routes/Sobre/index.tsx'
import Cadastro from './routes/Cadastro/index.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {path:"/Contato", element: <Contato/>},
    {path:"/Faq", element:<Faq/>},
    {path:"/Integrantes", element:<Integrantes/>},
    {path:"/Sobre", element:<Sobre/>},
    {path:"/Cadastro", element:<Cadastro/>},

    ]
  }
])





createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
