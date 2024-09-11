import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import SignUp from "@/pages/Authentication/SignUp";
import SignIn from "@/pages/Authentication/SignIn";
import Booking from "@/pages/Booking/Booking";
import Services from "@/pages/Services/Services";
import ServiceDetails from "@/pages/ServiceDetails/ServiceDetails";
import Error from "@/pages/Error/Error";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: 'services',
                element: <Services />
            },
            {
                path: 'booking',
                element: <Booking />,
            },
            {
                path: 'serviceDetails',
                element: <ServiceDetails />,
            }
        ]
    },
    {
        path: "/auth",
        children: [
            {
                path: "signup",
                element: <SignUp />,
            },
            {
                path: "signin",
                element: <SignIn />,
            }
        ]
    }
])

export default router;