import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-responsive-pagination/themes/classic-light-dark.css';
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './componentes/common/Layout.jsx'
import Dashboard from './componentes/pages/Dashboard.jsx'
import User from './componentes/pages/User.jsx'
import Login from './componentes/pages/Login.jsx'
import Enquiry from './componentes/pages/Enquiry.jsx'
import Newsletter from './componentes/pages/Newsletter.jsx'
import ColorView from './componentes/pages/ColorView.jsx'
import ColorAdd from './componentes/pages/ColorAdd.jsx'
import MaterialAdd from './componentes/pages/MaterialAdd.jsx'
import MaterialView from './componentes/pages/MaterialView.jsx'
import CategoryAdd from './componentes/pages/CategoryAdd.jsx'
import CategoryView from './componentes/pages/CategoryView.jsx'
import SubCategoryAdd from './componentes/pages/SubCategoryAdd.jsx'
import SubCategoryView from './componentes/pages/SubCategoryView.jsx'
import SubSubCategoryAdd from './componentes/pages/SubSubCategoryAdd.jsx'
import SubSubCategoryView from './componentes/pages/SubSubCategoryView.jsx'
import CountryAdd from './componentes/pages/CountryAdd.jsx'
import CountryView from './componentes/pages/CountryView.jsx'
import FaqAdd from './componentes/pages/FaqAdd.jsx'
import FaqView from './componentes/pages/faqView.jsx'
import WhyChooseUsAdd from './componentes/pages/WhyChooseUsAdd.jsx'
import WhyChooseUsView from './componentes/pages/WhyChooseUsView.jsx'
import Orders from './componentes/pages/Orders.jsx'
import SliderAdd from './componentes/pages/SliderAdd.jsx';
import SliderView from './componentes/pages/SliderView.jsx';
import TestimonialAdd from './componentes/pages/TestimonialAdd.jsx';
import TestimonialView from './componentes/pages/TestimonialView.jsx';
import ProductAdd from './componentes/pages/ProductAdd.jsx';
import ProductView from './componentes/pages/ProductView.jsx';
import MainContext from './context/MainContext.jsx';
import Profile from './componentes/pages/Profile.jsx';

createRoot(document.getElementById('root')).render(
    <MainContext>
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/user' element={<User />} />
                    <Route path='/enquiry' element={<Enquiry />} />
                    <Route path='/newsletter' element={<Newsletter />} />
                    <Route path='/color/view' element={<ColorView />} />
                    <Route path='/color/add' element={<ColorAdd />} />
                    <Route path='/color/edit/:id' element={<ColorAdd />} />
                    <Route path='/material/add' element={<MaterialAdd />} />
                    <Route path='/material/edit/:id' element={<MaterialAdd />} />
                    <Route path='/material/view' element={<MaterialView />} />


                    <Route path='/product/add' element={<ProductAdd />} />
                    <Route path='/product/view' element={<ProductView />} />


                    <Route path='/category/add' element={<CategoryAdd />} />
                    <Route path='/category/view' element={<CategoryView />} />
                    <Route path='/category/edit/:id' element={<CategoryAdd />} />


                    <Route path='/category/sub-category/add' element={<SubCategoryAdd />} />
                    <Route path='/category/sub-category/view' element={<SubCategoryView />} />
                    <Route path='/category/sub-category/edit/:id' element={<SubCategoryAdd />} />


                    <Route path='/category/sub-sub-category/add' element={<SubSubCategoryAdd />} />
                    <Route path='/category/sub-sub-category/view' element={<SubSubCategoryView />} />
                    <Route path='/category/sub-sub-category/edit/:id' element={<SubSubCategoryAdd />} />

                    <Route path='/country/add' element={<CountryAdd />} />
                    <Route path='/country/edit/:id' element={<CountryAdd />} />
                    <Route path='/country/view' element={<CountryView />} />
                    <Route path='/faq/add' element={<FaqAdd />} />
                    <Route path='/faq/edit/:id' element={<FaqAdd />} />
                    <Route path='/faq/view' element={<FaqView />} />
                    <Route path='/why-choose-us/add' element={<WhyChooseUsAdd />} />
                    <Route path='/why-choose-us/view' element={<WhyChooseUsView />} />
                    <Route path='/orders/orders' element={<Orders />} />
                    <Route path='/slider/add' element={<SliderAdd />} />
                    <Route path='/slider/view' element={<SliderView />} />
                    <Route path='/testimonial/add' element={<TestimonialAdd />} />
                    <Route path='/testimonial/view' element={<TestimonialView />} />
                    <Route path='/profile' element={<Profile />} />
                </Route>
                <Route path='/' element={<Login />} />
            </Routes>
        </BrowserRouter>
    </MainContext>
)
