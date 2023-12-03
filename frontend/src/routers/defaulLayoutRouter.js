import Cart from "../components/Cart";
import ListProducts from "../components/ListProducts";
import ProductDetail from "../components/ProductDetail";
import Contact from "../page/Contact";
import News from "../page/News";
import NotFound from "../page/NotFound";


const { default: Home } = require("../page/Home");

const publicRoutes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/contact",
        component: Contact
    },
    {
        path: "/news",
        component: News
    },
    {
        path: "/listproducts/:id",
        component: ListProducts
    },
    {
        path: "/product_detail/:id",
        component: ProductDetail
    },
    {
        path: "/cart",
        component: Cart
    },
    {
        path: "/404",
        component: NotFound
    },



]
export default publicRoutes;