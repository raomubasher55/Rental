import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Home from './Pages/Home/Home'
import Subcategories from './components/SubCategories/SubCategories'
import Products from './Pages/Products/Products'
import Login from './Pages/User/Auth/Login/Login'
import Signup from './Pages/User/Auth/Signup/Signup'
import LoginCompany from './Pages/Company/Auth/Login/Login'
import SignupCompany from './Pages/Company/Auth/Singup/Signup'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path="subcategory/:categoryId" element={<Subcategories />} />
      <Route path="products/:subcategoryId" element={<Products />} />

      {/* user Route */}
      <Route path='/auth/login' element={<Login/>}/>
      <Route path='/auth/signup' element={<Signup/>}/>



      {/* Company Route */}
      <Route path='/auth/company/login' element={<LoginCompany/>}/>
      <Route path='/auth/company/signup' element={<SignupCompany/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
