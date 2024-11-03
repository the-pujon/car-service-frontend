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
import RedirectHandler from "@/pages/Booking/RedirectHandler";
import ProtectedRoute from "./ProtectedRoute";
import Review from "@/pages/Review/Review";
import About from "@/pages/About/About";

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
                element: <ProtectedRoute role="user"><Booking /></ProtectedRoute>,
            },
            {
                path: 'serviceDetails/:id',
                element: <ServiceDetails />,
            },
            {
                path: 'booking-success',
                element: <ProtectedRoute role="user"><BookingSuccess /></ProtectedRoute>,
            },
            {
                path: 'booking-fail',
                element: <ProtectedRoute role="user"><BookingFail /></ProtectedRoute>,
            },
            //{
            //    path: "redirect",
            //    element: <RedirectPage />,
            //},
            {
                path: "*",
                element: <ProtectedRoute role="user"><RedirectHandler /></ProtectedRoute>,
            },
            {
                path: 'review',
                element: <Review />

            },
            {
                path: 'about',
                element: <About />
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
                element: <ProtectedRoute role="admin"><AdminOverview /></ProtectedRoute>
            },
            {
                path: 'services',
                element: <ProtectedRoute role="admin"><ServiceManagement /></ProtectedRoute>
            },
            {
                path: 'slots',
                element: <ProtectedRoute role="admin"><SlotManagement /></ProtectedRoute>
            },
            {
                path: 'users',
                element: <ProtectedRoute role="admin"><UserManagement /></ProtectedRoute>

            },
            {
                path: 'my-bookings',
                element: <ProtectedRoute role="user"><MyBookings /></ProtectedRoute>
            },
            {
                path: 'profile',
                element: <ProtectedRoute role="user"><Profile /></ProtectedRoute>
            }
        ]
    }
])

export default router;