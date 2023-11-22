import ListProducts from "../page/ListProducts";
import ProductDetail from "../page/ProductDetail";
import Slide from "../page/Slide";

const { default: Home } = require("../page/Home");

const publicRoutes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/listproducts",
        component: ListProducts
    },
    {
        path: "/product_detail",
        component: ProductDetail
    },
    {
        path: "slide",
        component: Slide
    },

    
]
export default publicRoutes;