/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from '@/components/ui/card';
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from '@/components/ui/table';
import { useGetBookingsQuery } from '@/redux/features/bookings/bookingApi';
import { useGetServicesQuery } from '@/redux/features/service/serviceApi';
import { useGetUsersQuery } from '@/redux/features/users/usersApi';
import { useGetAllReviewsQuery } from '@/redux/features/review/reviewApi';
import Loading from '@/components/ui/Loading';
import { BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,PieChart,Pie,Cell,ResponsiveContainer,LineChart,Line,Area } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { CalendarDays,DollarSign,ShoppingCart,Star,Users,Clock,Car,TrendingUp,LayoutGrid,Activity,BarChart3,Wrench,Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Types
interface Review {
    _id: string;
    name: string;
    rating: number;
    message: string;
}

interface Service {
    _id: string;
    name: string;
    description: string;
    price: number;
}

interface Customer {
    _id: string;
    name: string;
    email: string;
}

interface Slot {
    date: string;
    startTime: string;
    endTime: string;
}

interface Booking {
    _id: string;
    customer: Customer;
    service: Service;
    slot: Slot;
    status: 'pending' | 'completed' | 'cancelled' | 'processing';
    vehicleType: string;
    vehicleBrand: string;
    vehicleModel: string;
    registrationPlate: string;
}

const AdminOverview: React.FC = () => {
    const { data: bookings,isLoading: bookingsLoading } = useGetBookingsQuery(undefined);
    const { data: services,isLoading: servicesLoading } = useGetServicesQuery(undefined);
    const { data: users,isLoading: usersLoading } = useGetUsersQuery(undefined);
    const { data: reviews,isLoading: reviewsLoading } = useGetAllReviewsQuery(undefined);
    const navigate = useNavigate();

    const recentBookings = (bookings?.data as Booking[] || []).slice().reverse().slice(0,15);
    const isLoading = bookingsLoading || servicesLoading || usersLoading || reviewsLoading;

    // Calculate statistics
    const totalBookings = bookings?.data?.length || 0;
    const totalServices = services?.data?.length || 0;
    const totalUsers = users?.data?.length || 0;
    const totalReviews = reviews?.data?.length || 0;

    // Calculate revenue
    const totalRevenue = (bookings?.data as Booking[] || []).reduce(
        (sum,booking) => sum + (booking.service.price || 0),
        0
    );

    // Calculate booking statistics
    const bookingStatusData = (bookings?.data as Booking[] || []).reduce((acc: Record<string,number>,booking) => {
        const status = booking.status || 'unknown';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    },{});

    const pieChartData = Object.entries(bookingStatusData).map(([name,value]) => ({
        name,
        value
    }));

    // Calculate service popularity
    const serviceBookings = (bookings?.data as Booking[] || []).reduce((acc: Record<string,number>,booking) => {
        const serviceName = booking.service.name;
        acc[serviceName] = (acc[serviceName] || 0) + 1;
        return acc;
    },{});

    const barChartData = Object.entries(serviceBookings).map(([name,count]) => ({
        name,
        bookings: count
    }));

    // Calculate average rating
    const averageRating = (reviews?.data as Review[] || []).reduce(
        (acc,review) => acc + review.rating,
        0
    ) / (reviews?.data?.length || 1);

    const COLORS = ['hsl(221.2 83.2% 53.3%)','hsl(142.1 76.2% 36.3%)','hsl(346.8 77.2% 49.8%)','hsl(24.6 95% 53.1%)'];

    const getStatusClassName = (status: string | undefined): string => {
        if (!status) return 'bg-secondary text-secondary-foreground';

        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-500 text-white';
            case 'completed':
                return 'bg-green-500 text-white';
            case 'cancelled':
                return 'bg-destructive text-destructive-foreground';
            case 'processing':
                return 'bg-primary text-primary-foreground';
            default:
                return 'bg-secondary text-secondary-foreground';
        }
    };

    const CustomTooltip = ({ active,payload,label }: TooltipProps<number,string>) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-background p-2 border border-border rounded-lg shadow-lg">
                    <p className="text-foreground">{`${label}: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    // New calculations for trends
    const last30DaysBookings = (bookings?.data as Booking[] || [])
        .filter(booking => {
            const bookingDate = new Date(booking.slot.date);
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            return bookingDate >= thirtyDaysAgo;
        });

    // Daily bookings data for line chart
    const dailyBookingsData = last30DaysBookings.reduce((acc: Record<string,number>,booking) => {
        const date = new Date(booking.slot.date).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    },{});

    const lineChartData = Object.entries(dailyBookingsData).map(([date,count]) => ({
        date,
        bookings: count
    }));

    // Most popular vehicle types
    const vehicleTypes = (bookings?.data as Booking[] || []).reduce((acc: Record<string,number>,booking) => {
        acc[booking.vehicleType] = (acc[booking.vehicleType] || 0) + 1;
        return acc;
    },{});

    // Add this new component for better stats visualization
    const StatCard = ({ title,value,icon: Icon,trend,color }: any) => (
        <Card className={`bg-${color}/10 hover:bg-${color}/20 transition-all duration-300 hover:shadow-lg`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className={`p-2 rounded-full bg-${color}/20`}>
                    <Icon className={`h-4 w-4 text-${color}`} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {trend && (
                    <div className="flex items-center mt-2 text-sm">
                        <span className={`text-${color}`}>{trend}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );

    return (
        <div className="min-h-screen bg-background p-6 space-y-8">
            {isLoading && (
                <div className="flex items-center justify-center h-screen">
                    <Loading />
                </div>
            )}

            {/* Statistics Cards with enhanced styling */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Bookings"
                    value={totalBookings}
                    icon={ShoppingCart}
                    trend={`+${last30DaysBookings.length} this month`}
                    color="primary"
                />
                <StatCard
                    title="Total Revenue"
                    value={`$${totalRevenue.toFixed(2)}`}
                    icon={DollarSign}
                    trend={`$${last30DaysBookings.reduce((sum,booking) => sum + booking.service.price,0).toFixed(2)} this month`}
                    color="green-500"
                />
                <StatCard
                    title="Total Users"
                    value={totalUsers}
                    icon={Users}
                    trend={`Active users: ${totalUsers}`}
                    color="blue-500"
                />
                <StatCard
                    title="Average Rating"
                    value={`${averageRating.toFixed(1)} ⭐`}
                    icon={Star}
                    trend={`From ${totalReviews} reviews`}
                    color="yellow-500"
                />
            </div>

            {/* Enhanced Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Booking Trends Chart */}
                <Card className="col-span-1 lg:col-span-2">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Booking Trends</CardTitle>
                                <CardDescription>Daily bookings over the last 30 days</CardDescription>
                            </div>
                            <Badge variant="outline">
                                {last30DaysBookings.length} bookings
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <div className="h-[400px] w-full">
                            <ResponsiveContainer>
                                <LineChart data={lineChartData}>
                                    <defs>
                                        <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="bookings"
                                        stroke="hsl(var(--primary))"
                                        strokeWidth={2}
                                        dot={{ r: 4 }}
                                        activeDot={{ r: 6 }}
                                        fillOpacity={1}
                                        fill="url(#colorBookings)"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Service Stats with Enhanced Styling */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 col-span-2">
                    {/* Services Section with Modern Design */}
                    <Card className="col-span-2">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-2xl flex items-center gap-2">
                                        <Clock className="h-6 w-6 text-primary" />
                                        Services Overview
                                    </CardTitle>
                                    <CardDescription className="text-base mt-1">
                                        Performance metrics for all active services
                                    </CardDescription>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant="secondary" className="text-base px-4 py-1.5">
                                        {services?.data?.length || 0} Services
                                    </Badge>
                                    <Button
                                        variant="default"
                                        className="flex items-center gap-2"
                                        onClick={() => navigate('/dashboard/admin/services')}
                                    >
                                        <LayoutGrid className="h-4 w-4" />
                                        View All Services
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[...(services?.data || [])]
                                    .slice(0,6)
                                    .map((service: any) => {
                                        const serviceBookings = (bookings?.data || [])
                                            .filter((booking: any) => booking.service._id === service._id);
                                        const totalRevenue = serviceBookings
                                            .reduce((sum: number,booking: any) => sum + booking.service.price,0);
                                        const utilization = (serviceBookings.length / (bookings?.data?.length || 1)) * 100;

                                        return (
                                            <Card
                                                key={service._id}
                                                className="bg-card hover:bg-accent transition-colors"
                                            >
                                                <CardHeader className="pb-3">
                                                    <div className="flex justify-between items-start space-x-4">
                                                        <div className="space-y-1">
                                                            <CardTitle>{service.name}</CardTitle>
                                                            <CardDescription>{service.category}</CardDescription>
                                                        </div>
                                                        <Badge
                                                            variant={utilization > 50 ? "default" : "secondary"}
                                                        >
                                                            {utilization.toFixed(0)}%
                                                        </Badge>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="space-y-3">
                                                    <div className="flex justify-between items-center bg-background rounded-md p-3">
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm text-muted-foreground">Duration</span>
                                                        </div>
                                                        <span className="font-medium">{service.duration} mins</span>
                                                    </div>

                                                    <div className="flex justify-between items-center bg-background rounded-md p-3">
                                                        <div className="flex items-center gap-2">
                                                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm text-muted-foreground">Price</span>
                                                        </div>
                                                        <span className="font-medium">${service.price}</span>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-3 pt-2">
                                                        <div className="bg-background rounded-md p-3">
                                                            <div className="text-sm text-muted-foreground mb-1">Bookings</div>
                                                            <div className="font-semibold text-lg">
                                                                {serviceBookings.length}
                                                            </div>
                                                        </div>
                                                        <div className="bg-background rounded-md p-3">
                                                            <div className="text-sm text-muted-foreground mb-1">Revenue</div>
                                                            <div className="font-semibold text-lg">
                                                                ${totalRevenue.toFixed(2)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Enhanced Vehicle Types Chart */}
                    <Card className="hover:shadow-lg transition-all duration-300">
                        <CardHeader>
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <Car className="h-5 w-5 text-primary" />
                                    Vehicle Distribution
                                </CardTitle>
                                <CardDescription>
                                    Analysis of vehicle types serviced
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px] flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={Object.entries(vehicleTypes)
                                                .map(([name,value]) => ({
                                                    name,
                                                    value,
                                                    percentage: ((value / (bookings?.data?.length || 1)) * 100).toFixed(1)
                                                }))}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            fill="hsl(221.2 83.2% 53.3%)"
                                            dataKey="value"
                                            label={({ name,percentage }) => `${name} (${percentage}%)`}
                                            labelLine={true}
                                        >
                                            {Object.entries(vehicleTypes).map((_entry,index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={COLORS[index % COLORS.length]}
                                                    className="stroke-background hover:opacity-80 transition-opacity"
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            content={({ payload }) => {
                                                if (payload && payload[0]) {
                                                    return (
                                                        <div className="bg-background p-2 rounded-lg border shadow-lg">
                                                            <p className="font-semibold">{payload[0].name}</p>
                                                            <p className="text-sm text-muted-foreground">
                                                                {payload[0].value} bookings ({payload[0].payload.percentage}%)
                                                            </p>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Legend
                                            formatter={(value,entry) => (
                                                <span className="text-sm font-medium">
                                                    {value}
                                                </span>
                                            )}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                    {/* Reviews Section with Enhanced Styling */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <Star className="h-5 w-5 text-yellow-500" />
                                    Recent Reviews
                                </CardTitle>
                                <Badge variant="outline">{totalReviews} total reviews</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                                {(reviews?.data as Review[] || []).slice(0,3).map((review) => (
                                    <Card key={review._id} className="bg-muted/50 hover:shadow-md transition-all duration-300">
                                        <CardHeader className="space-y-0 pb-2">
                                            <div className="flex justify-between items-center">
                                                <CardTitle className="text-sm font-medium">{review.name}</CardTitle>
                                                <div className="flex items-center gap-0.5">
                                                    {Array.from({ length: 5 }).map((_,i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 ${i < review.rating
                                                                ? 'fill-yellow-400 text-yellow-400'
                                                                : 'text-muted-foreground/20'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground line-clamp-3 italic">
                                                "{review.message}"
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>



            {/* Enhanced Recent Bookings Table */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Recent Bookings</CardTitle>
                            <CardDescription>Latest {recentBookings.length} bookings</CardDescription>
                        </div>
                        <Badge variant="outline" className="ml-auto">
                            Total: {totalBookings}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Service</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Vehicle</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentBookings.map((booking) => (
                                <TableRow key={booking._id}>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium">{booking.customer.name}</p>
                                            <p className="text-sm text-muted-foreground">{booking.customer.email}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium">{booking.service.name}</p>
                                            <p className="text-sm text-muted-foreground">{booking.service.description}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>{booking.slot.date}</TableCell>
                                    <TableCell>{`${booking.slot.startTime} - ${booking.slot.endTime}`}</TableCell>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium">{booking.vehicleType} - {booking.vehicleBrand}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {booking.vehicleModel} ({booking.registrationPlate})
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell>${booking.service.price}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClassName(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Services Insights Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Performing Services Card */}
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-primary" />
                                    Top Performing Services
                                </CardTitle>
                                <CardDescription>Most booked services this month</CardDescription>
                            </div>
                            <Badge variant="secondary">Top 5</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {[...(services?.data || [])]
                            .sort((a,b) => {
                                const aBookings = (bookings?.data || []).filter(booking => booking.service._id === a._id).length;
                                const bBookings = (bookings?.data || []).filter(booking => booking.service._id === b._id).length;
                                return bBookings - aBookings;
                            })
                            .slice(0,5)
                            .map((service: any,index: number) => {
                                const serviceBookings = (bookings?.data || []).filter(booking => booking.service._id === service._id);
                                const revenue = serviceBookings.reduce((sum,booking) => sum + booking.service.price,0);

                                return (
                                    <div key={service._id} className="flex items-center justify-between py-4 border-b last:border-0">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-primary/10 text-primary font-semibold h-8 w-8 rounded-full flex items-center justify-center">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">{service.name}</h4>
                                                <p className="text-sm text-muted-foreground">{serviceBookings.length} bookings</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">${revenue.toFixed(2)}</p>
                                            <p className="text-sm text-muted-foreground">${service.price} per service</p>
                                        </div>
                                    </div>
                                );
                            })}
                    </CardContent>
                </Card>

                {/* Service Categories Overview */}
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <LayoutGrid className="h-5 w-5 text-primary" />
                                    Service Categories
                                </CardTitle>
                                <CardDescription>Distribution by category</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {Object.entries(
                            (services?.data || []).reduce((acc: Record<string,any>,service: any) => {
                                const category = service.category || 'Uncategorized';
                                if (!acc[category]) {
                                    acc[category] = {
                                        count: 0,
                                        revenue: 0,
                                        bookings: 0
                                    };
                                }
                                acc[category].count++;
                                const serviceBookings = bookings?.data?.filter(booking => booking.service._id === service._id) || [];
                                acc[category].bookings += serviceBookings.length;
                                acc[category].revenue += serviceBookings.reduce((sum,booking) => sum + booking.service.price,0);
                                return acc;
                            },{})
                        ).map(([category,data]) => (
                            <div key={category} className="flex items-center justify-between py-4 border-b last:border-0">
                                <div>
                                    <h4 className="font-semibold">{category}</h4>
                                    <p className="text-sm text-muted-foreground">{data.count} services</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">${data.revenue.toFixed(2)}</p>
                                    <p className="text-sm text-muted-foreground">{data.bookings} bookings</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Service Performance Metrics */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-primary" />
                                    Service Performance Overview
                                </CardTitle>
                                <CardDescription>Key metrics for all services</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Card className="bg-accent">
                                <CardHeader className="pb-2">
                                    <CardDescription>Total Services</CardDescription>
                                    <CardTitle className="text-2xl">{services?.data?.length || 0}</CardTitle>
                                </CardHeader>
                            </Card>

                            <Card className="bg-accent">
                                <CardHeader className="pb-2">
                                    <CardDescription>Average Price</CardDescription>
                                    <CardTitle className="text-2xl">
                                        ${((services?.data || []).reduce((sum,service) => sum + service.price,0) / (services?.data?.length || 1)).toFixed(2)}
                                    </CardTitle>
                                </CardHeader>
                            </Card>

                            <Card className="bg-accent">
                                <CardHeader className="pb-2">
                                    <CardDescription>Most Popular</CardDescription>
                                    <CardTitle className="text-2xl">
                                        {[...(services?.data || [])]
                                            .sort((a,b) => {
                                                const aBookings = (bookings?.data || []).filter(booking => booking.service._id === a._id).length;
                                                const bBookings = (bookings?.data || []).filter(booking => booking.service._id === b._id).length;
                                                return bBookings - aBookings;
                                            })[0]?.name || 'N/A'}
                                    </CardTitle>
                                </CardHeader>
                            </Card>

                            <Card className="bg-accent">
                                <CardHeader className="pb-2">
                                    <CardDescription>Average Duration</CardDescription>
                                    <CardTitle className="text-2xl">
                                        {Math.round((services?.data || []).reduce((sum,service) => sum + service.duration,0) / (services?.data?.length || 1))} mins
                                    </CardTitle>
                                </CardHeader>
                            </Card>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Service Performance Overview - Simplified and Enhanced */}
            <Card className="col-span-2">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="text-2xl flex items-center gap-2">
                                <BarChart3 className="h-6 w-6 text-primary" />
                                Service Performance
                            </CardTitle>
                            <CardDescription className="text-base mt-1">
                                Revenue and booking distribution across services
                            </CardDescription>
                        </div>
                        <Badge variant="secondary" className="text-base px-4 py-1.5">
                            Total Revenue: ${totalRevenue.toFixed(2)}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[...(services?.data || [])]
                            .sort((a,b) => {
                                const aRevenue = (bookings?.data || [])
                                    .filter(booking => booking.service._id === a._id)
                                    .reduce((sum,booking) => sum + booking.service.price,0);
                                const bRevenue = (bookings?.data || [])
                                    .filter(booking => booking.service._id === b._id)
                                    .reduce((sum,booking) => sum + booking.service.price,0);
                                return bRevenue - aRevenue;
                            })
                            .map((service: any) => {
                                const serviceBookings = (bookings?.data || [])
                                    .filter(booking => booking.service._id === service._id);
                                const serviceRevenue = serviceBookings
                                    .reduce((sum,booking) => sum + booking.service.price,0);
                                const revenuePercentage = (serviceRevenue / totalRevenue) * 100;

                                return (
                                    <div
                                        key={service._id}
                                        className="group bg-card hover:bg-accent/50 rounded-lg p-4 transition-all duration-200"
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3 min-w-[200px]">
                                                <div className={`
                                                    h-10 w-10 rounded-full flex items-center justify-center
                                                    ${revenuePercentage > 20 ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}
                                                `}>
                                                    <Wrench className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                                                        {service.name}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        ${service.price} per service
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6 ml-auto">
                                                <div className="text-center min-w-[100px]">
                                                    <p className="text-2xl font-bold">
                                                        {serviceBookings.length}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">Bookings</p>
                                                </div>

                                                <div className="text-center min-w-[120px]">
                                                    <p className="text-2xl font-bold">
                                                        ${serviceRevenue.toFixed(2)}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">Revenue</p>
                                                </div>

                                                <div className="text-center min-w-[100px]">
                                                    <p className="text-2xl font-bold text-primary">
                                                        {revenuePercentage.toFixed(1)}%
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">of Total</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-3 w-full bg-background rounded-full h-2">
                                            <div
                                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${revenuePercentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminOverview;