/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react"
import { useSelector } from "react-redux"
import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { selectCurrentUser } from "@/redux/features/auth/authSlice"
import { useGetUserByIdQuery,useUpdateUserProfileMutation } from "@/redux/features/users/usersApi"
import { toast } from "sonner"
import Loading from "@/components/ui/Loading"
import { useEffect } from "react"

function Profile() {
    const currentUser = useSelector(selectCurrentUser)
    const [updateUserProfile,{ isLoading: isUpdating }] = useUpdateUserProfileMutation()
    const { data: userData,isLoading: isLoadingUser } = useGetUserByIdQuery(currentUser?._id)

    const [user,setUser] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    })

    useEffect(() => {
        if (userData?.data) {
            setUser({
                name: userData.data.name || "",
                email: userData.data.email || "",
                phone: userData.data.phone || "",
                address: userData.data.address || "",
            })
        }
    },[userData])

    const handleProfileUpdate = async (e: any) => {
        e.preventDefault()
        try {
            const { email,...updateData } = user
            await updateUserProfile(updateData).unwrap()
            toast.success("Profile updated successfully")
        } catch (error) {
            toast.error("Failed to update profile")
        }
    }



    return (
        <div className="wrapper p-4">
            {
                isLoadingUser && <Loading />
            }
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal information here</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleProfileUpdate}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={user.name}
                                    onChange={(e) => setUser({ ...user,name: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className=" text-gray-300 cursor-not-allowed"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    value={user.phone}
                                    onChange={(e) => setUser({ ...user,phone: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    value={user.address}
                                    onChange={(e) => setUser({ ...user,address: e.target.value })}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button type="submit" onClick={handleProfileUpdate} disabled={isUpdating}>
                        {isUpdating ? "Saving..." : "Save Changes"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Profile
