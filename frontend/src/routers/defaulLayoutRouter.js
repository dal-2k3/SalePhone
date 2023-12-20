import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Cart from "../components/Cart";
import CheckOrder from "../components/CheckOrder";
import Contact from "../components/Contact";
import ListProducts from "../components/ListProducts";
import NewsLayout from "../components/New";
import NotFound from "../components/NotFound";
import OrderDetail from "../components/OrderDetail";
import OrdersList from "../components/OrdersList";
import ProductDetail from "../components/ProductDetail";
import { Example } from "../components/address";


const { default: Home } = require("../page/Home");

const publicRoutes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/listproducts/:id?",
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
        path: "/test",
        component: Example
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "*",
        component: NotFound
    },
    {
        path: "/news",
        component: NewsLayout
    },
    {
        path: "/contact",
        component: Contact
    },
    {
        path: "/checkOrder",
        component: CheckOrder
    },
    {
        path: "/orders/:phone",
        component: OrdersList
    },
    {
        path: "/order/details/:id",
        component: OrderDetail
    },
]
export default publicRoutes;