import axios from "axios"
let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL

let categoryApi = async () => {
    const res = await fetch(`${apiBaseUrl}home/category`, { cache: "no-store" })
    let json = await res.json()
    return json.data
}

let productApi = async (category) => {
    let res = await fetch(`${apiBaseUrl}home/product/${category}`, { cache: "no-store" })
    return await res.json()
}

let bannerApi = async () => {
    let res = await fetch(`${apiBaseUrl}home/slider`, { cache: "no-store" })
    return await res.json()
}

let bestSellingProduct = async () => {
    let res = await fetch(`${apiBaseUrl}home/best-selling-product`, {cache: "no-store"})
    return await res.json()
}

let homeCollectionApi = () => {
    let finalData = [
        {
            title: 'Design Creative',
            thumbnail: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/124ad5ba-005d-4b47-a707-a9a87033833a-1670180400.webp'
        },
        {
            title: 'Bestselling Products',
            thumbnail: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/0d588bec-d9a0-4645-8e7a-b49ef67b34be-1670180400.webp'
        },
        {
            title: 'Onsale Products',
            thumbnail: 'https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/124ad5ba-005d-4b47-a707-a9a87033833a-1670180400.webp'
        }
    ]

    return finalData
}

export { categoryApi, productApi, bannerApi, homeCollectionApi, bestSellingProduct }