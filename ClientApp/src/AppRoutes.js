import { Counter } from "./components/Counter";
import { Home } from "./components/Home";
import { Product } from "./components/Product";
import { SalesPerson } from "./components/SalesPerson";
import { Sales } from "./components/Sales";
import { Customer } from "./components/Customer";
import { Discount } from "./components/Discount";


const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/Product',
        element: <Product />
    }
    ,
    {
        path: '/SalesPerson',
        element: <SalesPerson />
    }
    ,
    {
        path: '/Sales',
        element: <Sales />
    }
    ,
    {
        path: '/Customer',
        element: <Customer />
    }
    ,
    {
        path: '/Discount',
        element: <Discount />
    }

];

export default AppRoutes;
