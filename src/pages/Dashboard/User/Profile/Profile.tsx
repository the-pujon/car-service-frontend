import { useState } from "react"
import { useSelector } from "react-redux"
import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { selectCurrentUser } from "@/redux/features/auth/authSlice"
import { useUpdateUserProfileMutation } from "@/redux/features/users/usersApi"
import { toast } from "sonner"

function Profile() {
    const currentUser = useSelector(selectCurrentUser)
    const [updateUserProfile,{ isLoading }] = useUpdateUserProfileMutation()

    const [user,setUser] = useState({
        name: currentUser?.name || "",
        email: currentUser?.email || "",
        phone: currentUser?.phone || "",
        address: currentUser?.address || "",
    })

    const handleProfileUpdate = async (e) => {
        e.preventDefault()
        try {
            // Remove email from the payload as it shouldn't be updated
            const { email,...updateData } = user
            await updateUserProfile(updateData).unwrap()
            toast.success("Profile updated successfully")
        } catch (error) {
            toast.error("Failed to update profile")
        }
    }

    return (
        <div className="container mx-auto p-4">
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
                    <Button type="submit" onClick={handleProfileUpdate} disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Profile
