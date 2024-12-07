import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from "axios";  // Import should be here, not inside JSX
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Home from './Pages/Home/Home'
import Subcategories from './components/SubCategories/SubCategories'
import Products from './Pages/Products/Products'
import Login from './Pages/User/Auth/Login/Login'
import Signup from './Pages/User/Auth/Signup/Signup'
import LoginCompany from './Pages/Company/Auth/Login/Login'
import SignupCompany from './Pages/Company/Auth/Singup/Signup'
import AddCategory from './Pages/Admin/Category/AddCategory'
import AddSubCategory from './Pages/Admin/SubCategory/AddSubCategory'
import AddProduct from './Pages/Admin/Product/AddProduct'
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './Pages/Admin/Dashboard/AdminDashboard';
import CompanyLayout from './components/layout/CompanyLayout';
import CompanyDashboard from './Pages/Company/Dashboard/CompanyDashboard';
import AddItem from './Pages/Company/Add Item/AddItem';
import UserLayout from './components/layout/UserLayout';
import Dashboard from './Pages/User/Dashboard/Dashboard';
import ProductDetail from './Pages/ProductDetail/ProductDetails';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<ScrollToTop><App/></ScrollToTop>}>

      <Route index element={<Home />} />
      <Route path="subcategory/:categoryId" element={<Subcategories />} />
      <Route path="products/:subcategoryId" element={<Products />} />
      <Route path="/product/:productId" element={<ProductDetail />} />

      {/* user Route */}
      <Route path='/auth/login' element={<Login />} />
      <Route path='/auth/signup' element={<Signup />} />


      {/* User Rotue */}
      <Route path='/user' element={<UserLayout />} >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add-item" element={<AddItem />} />
      </Route>



      {/* Company Auth Route */}
      <Route path='/auth/company/login' element={<LoginCompany />} />
      <Route path='/auth/company/signup' element={<SignupCompany />} />
      {/* Company Route */}
      <Route path='/company' element={<CompanyLayout />} >
        <Route path="dashboard" element={<CompanyDashboard />} />
        <Route path="add-item" element={<AddItem />} />
      </Route>



      {/* Admin Route */}
      <Route path='/admin' element={<AdminLayout />} >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="add-category" element={<AddCategory />} />
        <Route path="add-subcategories" element={<AddSubCategory />} />
        <Route path="add-products" element={<AddProduct />} />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
