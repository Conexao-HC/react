import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Error from './routes/Error/index.tsx'
import Faq from './routes/Faq/index.tsx'
import AgendamentoPage from './routes/Agendamento/index.tsx'
import Home from './routes/Home/index.tsx'
import Cadastro from './routes/Cadastro/index.tsx'
import Login from './routes/Login/index.tsx'
import Integrantes from './routes/Integrantes/index.tsx'
import Reagendamento from './routes/Reagendamento/Reagendamento.tsx'
import Contatos from './routes/Contatos/index.tsx'
import EsqueciSenha from './routes/EsqueciSenha/index.tsx'
import Lembretes from './routes/Lembretes/index.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
    {path:"/Cadastro", element:<Cadastro/>},
    {path:"/Home", element:<Home/>},
    {path:"/Faq", element:<Faq/>},
    {path:"/Agendamento", element:<AgendamentoPage/>},
    {path:"/", element:<Login/>},
    {path:"Integrantes", element:<Integrantes/>},
    {path:"/Reagendamento", element:<Reagendamento/>},
    {path:"/Contatos", element:<Contatos/>},
    {path:"/EsqueciSenha", element:<EsqueciSenha/>},
    {path:"/Lembretes", element:<Lembretes/>}
    
    ]
  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
