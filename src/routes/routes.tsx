/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import SignUp from "@/pages/Authentication/SignUp";
import SignIn from "@/pages/Authentication/SignIn";
import Booking from "@/pages/Booking/Booking";
import ServiceDetails from "@/pages/ServiceDetails/ServiceDetails";
import Error from "@/pages/Error/Error";
import DashboardLayout from "@/pages/Dashboard/DashboardLayout";
import AdminOverview from "@/pages/Dashboard/Admin/AdminOverview/AdminOverview";
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
import ServiceOverview from "@/pages/Dashboard/Admin/ServiceOverview/ServiceOverview";
import EditProfile from "@/pages/Dashboard/User/EditProfile/EditProfile";
import ChangePassword from "@/pages/Authentication/ChangePassword";
import AddService from "@/pages/Dashboard/Admin/AddService/AddService";
import MyTransaction from "@/pages/Dashboard/User/MyTransaction/MyTransaction";
import TransactionOverview from "@/pages/Dashboard/Admin/TransactionOverview/TransactionOverview";
import Loading from '@/components/ui/Loading'
import RescheduleBooking from '@/pages/Dashboard/User/RescheduleBooking/RescheduleBooking';

// Lazy load page components
const Home = lazy(() => import('@/pages/Home/Home'))
const Services = lazy(() => import('@/pages/Services/Services'))
const ServiceManagement = lazy(() => import('@/pages/Dashboard/Admin/ServiceManagement/ServiceManagement'))

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
                path: 'add-service',
                element: <ProtectedRoute role="admin"><AddService /></ProtectedRoute>
            },
            {
                path: 'service-overview',
                element: <ProtectedRoute role="admin"><ServiceOverview /></ProtectedRoute>
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
                path: 'edit-profile',
                element: <ProtectedRoute role=""><EditProfile /></ProtectedRoute>
            },
            {
                path: 'profile',
                element: <ProtectedRoute role=""><Profile /></ProtectedRoute>
            },
            {
                path: 'change-password',
                element: <ProtectedRoute role=""><ChangePassword /></ProtectedRoute>
            },
            {
                path: 'my-transactions',
                element: <ProtectedRoute role="user"><MyTransaction /></ProtectedRoute>
            },
            {
                path: 'transaction-overview',
                element: <ProtectedRoute role="admin"><TransactionOverview /></ProtectedRoute>
            },
            {
                path: 'reschedule-booking',
                element: <ProtectedRoute role="user"><RescheduleBooking /></ProtectedRoute>
            }
        ]
    }
])

export function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

// Add back the default export
export default router;
