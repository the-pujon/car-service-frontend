import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Avatar,AvatarFallback,AvatarImage } from '@/components/ui/avatar';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import { useGetUserByIdQuery } from '@/redux/features/users/usersApi';
import Loading from '@/components/ui/Loading';

//interface ProfileProps {
//  user: {
//    name: string;
//    email: string;
//    phone: string;
//    address: string;
//    profileImage?: string;
//  };
//}

const Profile = (): React.ReactElement => {

    const currentUser = useSelector(selectCurrentUser)
    const { data: userData,isLoading: isLoadingUser } = useGetUserByIdQuery(currentUser?._id)
    const user = userData?.data;


    return (
        <div className="min-h-screen py-10">
            {isLoadingUser && <Loading />}
            <motion.div
                initial={{ opacity: 0,y: 20 }}
                animate={{ opacity: 1,y: 0 }}
                transition={{ duration: 0.6,ease: "easeOut" }}
                className="container mx-auto p-6"
            >
                <Card className="max-w-4xl mx-auto backdrop-blur-sm bg-card/50 shadow-xl border">
                    <CardHeader className="text-center relative pb-24 p-0">
                        {/* Cover Image Section */}
                        <div className="relative h-[200px] rounded-t-lg overflow-hidden">
                            {user?.profileImage ? (
                                <img
                                    src={user.profileImage}
                                    alt="cover"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-r from-muted via-accent to-muted" />
                            )}
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/95" />
                        </div>

                        {/* Profile Image */}
                        <motion.div
                            initial={{ opacity: 0,y: 20 }}
                            animate={{ opacity: 1,y: 0 }}
                            transition={{ duration: 0.6,ease: "easeOut" }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute left-[40%] -bottom-20"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full bg-accent blur-2xl opacity-20 animate-pulse" />
                                <Avatar className="w-40 h-40 border-4 border-background shadow-2xl">
                                    <AvatarImage src={user?.profileImage} className="object-cover" />
                                    <AvatarFallback className="bg-muted">
                                        <User className="w-20 h-20 text-muted-foreground" />
                                    </AvatarFallback>
                                </Avatar>
                                {/* Decorative rings */}
                                <div className="absolute inset-0 rounded-full border-2 border-accent/20 animate-pulse" />
                                <div className="absolute -inset-1 rounded-full border border-accent/10 animate-pulse" />
                            </div>
                        </motion.div>
                    </CardHeader>

                    <CardContent className="space-y-6 px-8 pb-8 pt-24">
                        <div className="text-center space-y-2">
                            <CardTitle className="text-4xl font-bold text-accent-foreground">
                                {user?.name}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">@{user?.email.split('@')[0]}</p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0,y: 20 }}
                            animate={{ opacity: 1,y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="grid grid-cols-2 gap-6"
                        >
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="group space-y-2 p-6 rounded-xl bg-card hover:bg-accent/5 border border-border hover:border-accent/20 transition-all duration-300"
                            >
                                <h3 className="font-semibold text-accent-foreground text-lg flex items-center gap-2">
                                    Email
                                </h3>
                                <p className="text-muted-foreground group-hover:text-foreground break-all transition-colors">
                                    {user?.email}
                                </p>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="group space-y-2 p-6 rounded-xl bg-card hover:bg-accent/5 border border-border hover:border-accent/20 transition-all duration-300"
                            >
                                <h3 className="font-semibold text-accent-foreground text-lg flex items-center gap-2">
                                    Phone
                                </h3>
                                <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                                    {user?.phone}
                                </p>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="group col-span-2 space-y-2 p-6 rounded-xl bg-card hover:bg-accent/5 border border-border hover:border-accent/20 transition-all duration-300"
                            >
                                <h3 className="font-semibold text-accent-foreground text-lg flex items-center gap-2">
                                    Address
                                </h3>
                                <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                                    {user?.address}
                                </p>
                            </motion.div>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default Profile;