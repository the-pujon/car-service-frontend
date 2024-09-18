

import { useState } from "react"
import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function Profile() {
    const [user,setUser] = useState({
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        address: "123 Main St, City, Country",
    })

    const handleProfileUpdate = (e) => {
        e.preventDefault()
        // In a real application, you would send this data to your backend
        console.log("Profile updated:",user)
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
                                    onChange={(e) => setUser({ ...user,email: e.target.value })}
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
                    <Button type="submit" onClick={handleProfileUpdate}>Save Changes</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Profile
