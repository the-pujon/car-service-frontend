import React from 'react';
import { motion } from 'framer-motion';
import { Lock,KeyRound,Eye,EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card,CardHeader,CardTitle,CardDescription,CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { toast } from 'sonner';


const ChangePassword = () => {
    const [currentPassword,setCurrentPassword] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [showPasswords,setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Passwords don't match");

            return;
        }

        // Add your password change logic here
        try {
            // API call to change password
            toast.success("Your password has been changed successfully.");

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("Failed to change password. Please try again.");

        }
    };

    return (
        <motion.div
            initial={{ opacity: 0,y: 20 }}
            animate={{ opacity: 1,y: 0 }}
            className="flex justify-center items-center p-4"
        >
            <Card className="w-full max-w-md shadow-lg border-muted">
                <CardHeader className="space-y-4">
                    <div className="flex justify-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="p-3 rounded-full bg-primary/10"
                        >
                            <Lock className="w-6 h-6 text-primary" />
                        </motion.div>
                    </div>
                    <CardTitle className="text-center text-2xl font-bold">
                        Change Password
                    </CardTitle>
                    <CardDescription className="text-center text-muted-foreground">
                        Keep your account secure by updating your password regularly
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="relative group">
                                <Input
                                    type={showPasswords.current ? "text" : "password"}
                                    placeholder="Current Password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="pr-10 transition-all border-muted focus:border-primary"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswords(prev => ({ ...prev,current: !prev.current }))}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>

                            <motion.div
                                initial={{ x: -10,opacity: 0 }}
                                animate={{ x: 0,opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="relative group"
                            >
                                <Input
                                    type={showPasswords.new ? "text" : "password"}
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="pr-10 transition-all border-muted focus:border-primary"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswords(prev => ({ ...prev,new: !prev.new }))}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </motion.div>

                            <motion.div
                                initial={{ x: -10,opacity: 0 }}
                                animate={{ x: 0,opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="relative group"
                            >
                                <Input
                                    type={showPasswords.confirm ? "text" : "password"}
                                    placeholder="Confirm New Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="pr-10 transition-all border-muted focus:border-primary"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswords(prev => ({ ...prev,confirm: !prev.confirm }))}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </motion.div>
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                        >
                            <Button type="submit" className="w-full text-base font-medium shadow-lg">
                                <KeyRound className="w-4 h-4 mr-2" />
                                Update Password
                            </Button>
                        </motion.div>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default ChangePassword;