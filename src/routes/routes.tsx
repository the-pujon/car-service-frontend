import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import SignUp from "@/pages/Authentication/SignUp";
import SignIn from "@/pages/Authentication/SignIn";
import Booking from "@/pages/Booking/Booking";
import Services from "@/pages/Services/Services";
import ServiceDetails from "@/pages/ServiceDetails/ServiceDetails";
import Error from "@/pages/Error/Error";
import DashboardLayout from "@/pages/Dashboard/DashboardLayout";
import AdminOverview from "@/pages/Dashboard/Admin/AdminOverview/AdminOverview";
import ServiceManagement from "@/pages/Dashboard/Admin/ServiceManagement/ServiceManagement";
import SlotManagement from "@/pages/Dashboard/Admin/SlotManagement/SlotManagement";
import UserManagement from "@/pages/Dashboard/Admin/UserManagement/UserManagement";
import MyBookings from "@/pages/Dashboard/User/MyBookings/MyBookings";
import Profile from "@/pages/Dashboard/User/Profile/Profile";
import BookingSuccess from "@/pages/Booking/BookingSuccess";
import BookingFail from "@/pages/Booking/BookingFail";
import RedirectPage from "@/pages/Booking/RedirectHandler";
import RedirectHandler from "@/pages/Booking/RedirectHandler";

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
                path: 'booking/:serviceId/:slotId',
                element: <Booking />,
            },
            {
                path: 'serviceDetails/:id',
                element: <ServiceDetails />,
            },
            {
                path: 'booking-success',
                element: <BookingSuccess />,
            },
            {
                path: 'booking-fail',
                element: <BookingFail />,
            },
            //{
            //    path: "redirect",
            //    element: <RedirectPage />,
            //},
            {
                path: "*",
                element: <RedirectHandler />,
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
    },{
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                path: "",
                element: <AdminOverview />
            },
            {
                path: 'services',
                element: <ServiceManagement />
            },
            {
                path: 'slots',
                element: <SlotManagement />
            },
            {
                path: 'users',
                element: <UserManagement />

            },
            {
                path: 'my-bookings',
                element: <MyBookings />
            },
            {
                path: 'profile',
                element: <Profile />
            }
        ]
    }
])

export default router;