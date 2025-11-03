import axios from "axios";
let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL

let singleProductApi = (slug) => {
    return axios.get(`${apiBaseUrl}product/product-details/${slug}`)
        .then((apiRes) => apiRes.data)
        .then((finalData) => finalData) //Product Data
}

export { productApi, singleProductApi }