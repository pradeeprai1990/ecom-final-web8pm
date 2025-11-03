import { productApi, singleProductApi } from '@/api-services/ProductServices';
import Breadcrumb from '@/app/common/Breadcrumb';
import React from 'react'
import ProductDetailView from './ProductDetailView';

export default async function ProductDetails(data) {
  let { pid } = await data.params; //Slug

  console.log(pid);
  

  let singleProduct = await singleProductApi(pid)
  // let productApis = await productApi()

  console.log(singleProduct);
  

  return (
    singleProduct && <>
      {/* <Breadcrumb pageName={singleProduct.title} /> */}
      {/* <ProductDetailView singleProduct={singleProduct} productApis={productApis}/> */}
    </>
  )
}
