/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState,useEffect } from "react"
import { useSelector } from "react-redux"
import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { selectCurrentUser } from "@/redux/features/auth/authSlice"
import { useGetUserByIdQuery,useUpdateUserProfileMutation } from "@/redux/features/users/usersApi"
import { toast } from "sonner"
import Loading from "@/components/ui/Loading"
import { Avatar,AvatarFallback,AvatarImage } from "@/components/ui/avatar"
import { User,Upload,X } from "lucide-react"
import { motion,AnimatePresence } from "framer-motion"

function EditProfile() {
    const currentUser = useSelector(selectCurrentUser)
    const [updateUserProfile,{ isLoading: isUpdating }] = useUpdateUserProfileMutation()
    const { data: userData,isLoading: isLoadingUser } = useGetUserByIdQuery(currentUser?._id)

    const [user,setUser] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        profileImage: "",
    })

    const [previewImage,setPreviewImage] = useState<string | null>(null)
    const [selectedFile,setSelectedFile] = useState<File | null>(null)
    const [isUploading,setIsUploading] = useState(false)

    const [initialUser,setInitialUser] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        profileImage: "",
    });

    useEffect(() => {
        if (userData?.data) {
            const userDataFromApi = {
                name: userData.data.name || "",
                email: userData.data.email || "",
                phone: userData.data.phone || "",
                address: userData.data.address || "",
                profileImage: userData.data.profileImage || "",
            };
            setUser(userDataFromApi);
            setInitialUser(userDataFromApi);
            setPreviewImage(userData.data.profileImage || null);
        }
    },[userData]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            const imageUrl = URL.createObjectURL(file)
            setPreviewImage(imageUrl)
        }
    }

    const handleRemoveImage = () => {
        setPreviewImage(null)
        setSelectedFile(null)
        setUser({ ...user,profileImage: "" })
    }

    const uploadToImgBB = async (file: File) => {
        const formData = new FormData()
        formData.append('image',file)

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,{
                method: 'POST',
                body: formData,
            })
            const data = await response.json()
            return data.data.url
        } catch (error) {
            throw new Error('Image upload failed')
        }
    }

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsUploading(true)

        try {
            let imageUrl = user.profileImage

            if (selectedFile) {
                imageUrl = await uploadToImgBB(selectedFile)
            }

            const { email,...updateData } = user
            await updateUserProfile({
                ...updateData,
                profileImage: imageUrl
            }).unwrap()

            toast.success("Profile updated successfully")
        } catch (error) {
            toast.error("Failed to update profile")
        } finally {
            setIsUploading(false)
        }
    }

    const hasChanges = () => {
        const hasProfileImageChange =
            (selectedFile !== null) ||
            (initialUser.profileImage !== user.profileImage);

        const hasFieldChanges =
            initialUser.name !== user.name ||
            initialUser.phone !== user.phone ||
            initialUser.address !== user.address;

        return hasProfileImageChange || hasFieldChanges;
    };

    return (
        <div className="wrapper p-4">
            {isLoadingUser && <Loading />}
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal information here</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleProfileUpdate}>
                        {/* Profile Image Section */}
                        <div className="mb-6 flex flex-col items-center space-y-4">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={previewImage ? 'preview' : 'upload'}
                                    initial={{ opacity: 0,y: 20 }}
                                    animate={{ opacity: 1,y: 0 }}
                                    exit={{ opacity: 0,y: -20 }}
                                    className="relative"
                                >
                                    <Avatar className="w-32 h-32 cursor-pointer">
                                        <AvatarImage src={previewImage || undefined} />
                                        <AvatarFallback className="bg-muted">
                                            <User className="w-16 h-16 text-muted-foreground" />
                                        </AvatarFallback>
                                    </Avatar>

                                    {previewImage && (
                                        <motion.button
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full"
                                            onClick={handleRemoveImage}
                                            type="button"
                                        >
                                            <X className="w-4 h-4" />
                                        </motion.button>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            <div className="flex items-center space-x-2">
                                <Input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    id="profileImage"
                                    onChange={handleImageChange}
                                />
                                <Label
                                    htmlFor="profileImage"
                                    className="flex items-center space-x-2 cursor-pointer hover:text-accent-foreground transition-colors"
                                >
                                    <Upload className="w-4 h-4" />
                                    <span>{previewImage ? 'Change Photo' : 'Upload Photo'}</span>
                                </Label>
                            </div>
                        </div>

                        {/* Other form fields */}
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
                                    className="text-muted-foreground cursor-not-allowed"
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
                    <Button
                        type="submit"
                        onClick={handleProfileUpdate}
                        disabled={isUpdating || isUploading || !hasChanges()}
                        className={!hasChanges() ? "opacity-50 cursor-not-allowed" : ""}
                    >
                        {isUploading ? "Uploading..." : isUpdating ? "Saving..." : "Save Changes"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default EditProfile
