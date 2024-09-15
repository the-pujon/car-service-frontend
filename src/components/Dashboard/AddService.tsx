//import React,{ useState } from 'react'
//import { DialogClose,DialogContent,DialogDescription,DialogHeader,DialogTitle } from '../ui/dialog'
//import { Label } from '../ui/label'
//import { Input } from '../ui/input'
//import { Button } from '../ui/button'
//import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from '../ui/card'
//import { Clock,DollarSign,Upload,X } from 'lucide-react'
//import { Textarea } from '../ui/textarea'

//interface Service {
//    _id: string;
//    name: string;
//    description: string;
//    price: number;
//    duration: number;
//    image: string;
//}

//const AddService = () => {

//    const [service,setService] = useState<Omit<Service,'_id'>>({
//        name: '',
//        description: '',
//        price: 0,
//        duration: 0,
//        image: '',
//    })
//    const [isUploading,setIsUploading] = useState(false)

//    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//        const { name,value } = e.target
//        setService(prev => ({
//            ...prev,
//            [name]: name === 'price' || name === 'duration' ? parseFloat(value) : value
//        }))
//    }

//    const handleSubmit = (e: React.FormEvent) => {
//        e.preventDefault()
//        // Here you would typically send the data to your backend
//        console.log('Service to be added:',service)
//        // Reset form after submission
//        setService({ name: '',description: '',price: 0,duration: 0,image: '' })
//    }

//    const handleImageDelete = () => {
//        setService(prev => ({ ...prev,image: '' }))
//    }

//    //const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//    //    const file = e.target.files?.[0]
//    //    if (!file) return

//    //    setIsUploading(true)

//    //    const formData = new FormData()
//    //    formData.append('image',file)

//    //    try {
//    //        const response = await fetch('https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY',{
//    //            method: 'POST',
//    //            body: formData,
//    //        })

//    //        const data = await response.json()

//    //        if (data.success) {
//    //            setService(prev => ({ ...prev,image: data.data.url }))
//    //        } else {
//    //            console.error('Failed to upload image')
//    //        }
//    //    } catch (error) {
//    //        console.error('Error uploading image:',error)
//    //    } finally {
//    //        setIsUploading(false)
//    //    }
//    //}




//    return (
//        <DialogContent className='backdrop-blur-md w-full max-w-[60rem] text-white'>
//            {/*<DialogHeader>
//                <DialogTitle>Add New Service</DialogTitle>
//                <DialogDescription>Enter the details for the new service.</DialogDescription>
//            </DialogHeader>*/}
//            <div className="w-full max-w-4xl mx-auto p-4 bg-background">
//                <Card className="border-none shadow-lg">
//                    <CardHeader className="space-y-1">
//                        <CardTitle className="text-2xl font-bold">Add New Service</CardTitle>
//                        <CardDescription>Enter the details of the new service below.</CardDescription>
//                    </CardHeader>
//                    <CardContent>
//                        <div className="grid md:grid-cols-2 gap-6">
//                            <div className="order-2 md:order-1 space-y-4">
//                                <div className="aspect-video rounded-lg overflow-hidden bg-muted relative group">
//                                    {service.image ? (
//                                        <>
//                                            <img
//                                                src={service.image}
//                                                alt="Service preview"
//                                                className="w-full h-full object-cover transition-opacity group-hover:opacity-50"
//                                            />
//                                            <Button
//                                                type="button"
//                                                variant="destructive"
//                                                size="icon"
//                                                onClick={handleImageDelete}
//                                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
//                                            >
//                                                <X className="h-4 w-4" />
//                                                <span className="sr-only">Delete image</span>
//                                            </Button>
//                                        </>
//                                    ) : (
//                                        <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
//                                            <Upload className="h-12 w-12 mb-2" />
//                                            <span>No image uploaded</span>
//                                        </div>
//                                    )}
//                                </div>
//                                <div className="space-y-2">
//                                    <Label htmlFor="image">Upload Image</Label>
//                                    <Input
//                                        id="image"
//                                        name="image"
//                                        type="file"
//                                        accept="image/*"
//                                        //onChange={handleImageUpload}
//                                        disabled={isUploading}
//                                        className="w-full text-white file:text-white"
//                                    />
//                                    {isUploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
//                                </div>
//                            </div>
//                            <div className="order-1 md:order-2">
//                                <form onSubmit={handleSubmit} className="space-y-4">
//                                    <div className="space-y-2">
//                                        <Label htmlFor="name">Service Name</Label>
//                                        <Input
//                                            id="name"
//                                            name="name"
//                                            value={service.name}
//                                            onChange={handleChange}
//                                            required
//                                            placeholder="e.g. Haircut"
//                                        />
//                                    </div>
//                                    <div className="space-y-2">
//                                        <Label htmlFor="description">Description</Label>
//                                        <Textarea
//                                            id="description"
//                                            name="description"
//                                            value={service.description}
//                                            onChange={handleChange}
//                                            required
//                                            placeholder="Describe the service..."
//                                            className="min-h-[100px]"
//                                        />
//                                    </div>
//                                    <div className="grid grid-cols-2 gap-4">
//                                        <div className="space-y-2">
//                                            <Label htmlFor="price">Price</Label>
//                                            <div className="relative">
//                                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
//                                                <Input
//                                                    id="price"
//                                                    name="price"
//                                                    type="number"
//                                                    value={service.price}
//                                                    onChange={handleChange}
//                                                    required
//                                                    min="0"
//                                                    step="0.01"
//                                                    className="pl-10"
//                                                />
//                                            </div>
//                                        </div>
//                                        <div className="space-y-2">
//                                            <Label htmlFor="duration">Duration (minutes)</Label>
//                                            <div className="relative">
//                                                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
//                                                <Input
//                                                    id="duration"
//                                                    name="duration"
//                                                    type="number"
//                                                    value={service.duration}
//                                                    onChange={handleChange}
//                                                    required
//                                                    min="0"
//                                                    className="pl-10"
//                                                />
//                                            </div>
//                                        </div>
//                                    </div>
//                                </form>
//                            </div>
//                        </div>
//                    </CardContent>
//                    <DialogClose asChild>
//                        {/*<CardFooter >*/}
//                        <Button type="submit" className="w-full button" onClick={handleSubmit}>Add Service</Button>
//                        {/*</CardFooter>*/}
//                    </DialogClose>
//                </Card>
//            </div>
//            {/*<DialogFooter>
//                <Button >Add Service</Button>
//            </DialogFooter>*/}
//        </DialogContent>
//    )
//}

//export default AddService


//import React,{ useState } from 'react'
//import { useForm,Controller } from 'react-hook-form'
//import { DialogClose,DialogContent,DialogDescription,DialogHeader,DialogTitle } from '../ui/dialog'
//import { Label } from '../ui/label'
//import { Input } from '../ui/input'
//import { Button } from '../ui/button'
//import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from '../ui/card'
//import { Clock,DollarSign,Upload,X } from 'lucide-react'
//import { Textarea } from '../ui/textarea'

//interface Service {
//    _id: string;
//    name: string;
//    description: string;
//    price: number;
//    duration: number;
//    image: string;
//}

//const AddService = () => {
//    const [isUploading,setIsUploading] = useState(false)
//    const { control,handleSubmit,reset,setValue,watch } = useForm<Omit<Service,'_id'>>({
//        defaultValues: {
//            name: '',
//            description: '',
//            price: 0,
//            duration: 0,
//            image: '',
//        },
//    })

//    const image = watch('image')

//    console.log(image)

//    const onSubmit = (data: Omit<Service,'_id'>) => {
//        console.log('Service to be added:',data)
//        // Here you would typically send the data to your backend
//        reset() // Reset form after submission
//    }

//    const handleImageDelete = () => {
//        setValue('image','')
//    }

//    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//        const file = e.target.files?.[0]
//        if (!file) return

//        setIsUploading(true)

//        const formData = new FormData()
//        formData.append('image',file)

//        try {
//            const response = await fetch('https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY',{
//                method: 'POST',
//                body: formData,
//            })

//            const data = await response.json()

//            if (data.success) {
//                setValue('image',data.data.url)
//            } else {
//                console.error('Failed to upload image')
//            }
//        } catch (error) {
//            console.error('Error uploading image:',error)
//        } finally {
//            setIsUploading(false)
//        }
//    }

//    return (
//        <DialogContent className='backdrop-blur-md w-full max-w-[60rem] text-white'>
//            <DialogHeader>
//                <DialogTitle>Add New Service</DialogTitle>
//                <DialogDescription>Enter the details for the new service.</DialogDescription>
//            </DialogHeader>
//            <div className="w-full max-w-4xl mx-auto p-4 bg-background">
//                <Card className="border-none shadow-lg">
//                    {/*<CardHeader className="space-y-1">
//                        <CardTitle className="text-2xl font-bold">Add New Service</CardTitle>
//                        <CardDescription>Enter the details of the new service below.</CardDescription>
//                    </CardHeader>*/}
//                    <CardContent>
//                        <div className="grid md:grid-cols-2 gap-6">
//                            <div className="order-2 md:order-1 space-y-4">
//                                <div className="aspect-video rounded-lg overflow-hidden bg-muted relative group">
//                                    {image ? (
//                                        <>
//                                            <img
//                                                src={image}
//                                                alt="Service preview"
//                                                className="w-full h-full object-cover transition-opacity group-hover:opacity-50"
//                                            />
//                                            <Button
//                                                type="button"
//                                                variant="destructive"
//                                                size="icon"
//                                                onClick={handleImageDelete}
//                                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
//                                            >
//                                                <X className="h-4 w-4" />
//                                                <span className="sr-only">Delete image</span>
//                                            </Button>
//                                        </>
//                                    ) : (
//                                        <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
//                                            <Upload className="h-12 w-12 mb-2" />
//                                            <span>No image uploaded</span>
//                                        </div>
//                                    )}
//                                </div>
//                                <div className="space-y-2">
//                                    <Label htmlFor="image">Upload Image</Label>
//                                    <Controller
//                                        name="image"
//                                        control={control}
//                                        render={({ field }) => (
//                                            <Input
//                                                id="image"
//                                                //name="image"
//                                                type="file"
//                                                accept="image/*"
//                                                onChange={(e) => handleImageUpload(e)}
//                                                disabled={isUploading}
//                                                className="w-full text-white file:text-white"
//                                                {...field}

//                                            />
//                                        )}
//                                    />
//                                    {isUploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
//                                </div>
//                            </div>
//                            <div className="order-1 md:order-2">
//                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                                    <div className="space-y-2">
//                                        <Label htmlFor="name">Service Name</Label>
//                                        <Controller
//                                            name="name"
//                                            control={control}
//                                            render={({ field }) => (
//                                                <Input
//                                                    id="name"
//                                                    placeholder="e.g. Haircut"
//                                                    {...field}
//                                                />
//                                            )}
//                                        />
//                                    </div>
//                                    <div className="space-y-2">
//                                        <Label htmlFor="description">Description</Label>
//                                        <Controller
//                                            name="description"
//                                            control={control}
//                                            render={({ field }) => (
//                                                <Textarea
//                                                    id="description"
//                                                    placeholder="Describe the service..."
//                                                    className="min-h-[100px]"
//                                                    {...field}
//                                                />
//                                            )}
//                                        />
//                                    </div>
//                                    <div className="grid grid-cols-2 gap-4">
//                                        <div className="space-y-2">
//                                            <Label htmlFor="price">Price</Label>
//                                            <div className="relative">
//                                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
//                                                <Controller
//                                                    name="price"
//                                                    control={control}
//                                                    render={({ field }) => (
//                                                        <Input
//                                                            id="price"
//                                                            type="number"
//                                                            min="0"
//                                                            step="0.01"
//                                                            className="pl-10"
//                                                            {...field}
//                                                        />
//                                                    )}
//                                                />
//                                            </div>
//                                        </div>
//                                        <div className="space-y-2">
//                                            <Label htmlFor="duration">Duration (minutes)</Label>
//                                            <div className="relative">
//                                                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
//                                                <Controller
//                                                    name="duration"
//                                                    control={control}
//                                                    render={({ field }) => (
//                                                        <Input
//                                                            id="duration"
//                                                            type="number"
//                                                            min="0"
//                                                            className="pl-10"
//                                                            {...field}
//                                                        />
//                                                    )}
//                                                />
//                                            </div>
//                                        </div>
//                                    </div>
//                                    <Button type="submit" className="w-full">Add Service</Button>
//                                </form>
//                            </div>
//                        </div>
//                    </CardContent>
//                    {/* <DialogFooter>
//                        <Button>Add Service</Button>
//                    </DialogFooter> */}
//                </Card>
//            </div>
//        </DialogContent>
//    )
//}

//export default AddService



//import React,{ useState } from 'react'
//import { useForm,Controller } from 'react-hook-form'
//import { DialogClose,DialogContent,DialogDescription,DialogHeader,DialogTitle } from '../ui/dialog'
//import { Label } from '../ui/label'
//import { Input } from '../ui/input'
//import { Button } from '../ui/button'
//import { Card,CardContent } from '../ui/card'
//import { Clock,DollarSign,Upload,X } from 'lucide-react'
//import { Textarea } from '../ui/textarea'

//interface Service {
//    _id: string;
//    name: string;
//    description: string;
//    price: number;
//    duration: number;
//    image: string;
//}

//const AddService = () => {
//    const [imageFile,setImageFile] = useState<File | null>(null)
//    const [isUploading,setIsUploading] = useState(false)
//    const [imagePreview,setImagePreview] = useState<string | null>(null)
//    const { control,handleSubmit,reset,setValue,watch } = useForm<Omit<Service,'_id'>>({
//        defaultValues: {
//            name: '',
//            description: '',
//            price: 0,
//            duration: 0,
//            image: '',
//        },
//    })

//    //const image = watch('image')

//    const onSubmit = async (data: Omit<Service,'_id'>) => {
//        setIsUploading(true);
//        if (!imageFile) {
//            console.error('Image URL is missing')
//            return
//        }

//        const formData = new FormData()
//        formData.append('image',imageFile)

//        setValue('image',"img");
//        //const imgbbAPI = import.meta.env.VITE_IMGBB_API_KEY
//        //const imgbbURL = import.meta.env.VITE_IMGBB_API_URL

//        //try {
//        //    const response = await fetch(`${imgbbURL}?key=${imgbbAPI}`,{
//        //        method: 'POST',
//        //        body: formData,
//        //    })

//        //    const data = await response.json()

//        //    if (data.success) {
//        //        console.log(data.data.url)
//        //        setValue('image',data.data.url,{ shouldDirty: true });
//        //    } else {
//        //        console.error('Failed to upload image')
//        //    }
//        //} catch (error) {
//        //    console.error('Error uploading image:',error)
//        //} finally {
//        //    setIsUploading(false)
//        //}



//        console.log('Service to be added:',data)
//        reset()
//    }

//    const handleImageDelete = () => {
//        setImagePreview(null)
//        setValue('image','')
//    }

//    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//        const file = e.target.files?.[0]
//        if (!file) return

//        const fileUrl = URL.createObjectURL(file)
//        setImagePreview(fileUrl)

//        setImageFile(file)




//    }

//    return (
//        <DialogContent className='backdrop-blur-md w-full max-w-[60rem] text-white'>
//            <DialogHeader>
//                <DialogTitle>Add New Service</DialogTitle>
//                <DialogDescription>Enter the details for the new service.</DialogDescription>
//            </DialogHeader>
//            <div className="w-full max-w-4xl mx-auto p-4 bg-background">
//                <Card className="border-none shadow-lg">
//                    <CardContent>
//                        <div className="grid md:grid-cols-2 gap-6">
//                            <div className="order-2 md:order-1 space-y-4">
//                                <div className="aspect-video rounded-lg overflow-hidden bg-muted relative group">
//                                    {imagePreview ? (
//                                        <>
//                                            <img
//                                                src={imagePreview}
//                                                alt="Service preview"
//                                                className="w-full h-full object-cover transition-opacity group-hover:opacity-50"
//                                            />
//                                            <Button
//                                                type="button"
//                                                variant="destructive"
//                                                size="icon"
//                                                onClick={handleImageDelete}
//                                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
//                                            >
//                                                <X className="h-4 w-4" />
//                                                <span className="sr-only">Delete image</span>
//                                            </Button>
//                                        </>
//                                    ) :
//                                        //image ? (
//                                        //    <>
//                                        //        <img
//                                        //            src={image}
//                                        //            alt="Service preview"
//                                        //            className="w-full h-full object-cover transition-opacity group-hover:opacity-50"
//                                        //        />
//                                        //        <Button
//                                        //            type="button"
//                                        //            variant="destructive"
//                                        //            size="icon"
//                                        //            onClick={handleImageDelete}
//                                        //            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
//                                        //        >
//                                        //            <X className="h-4 w-4" />
//                                        //            <span className="sr-only">Delete image</span>
//                                        //        </Button>
//                                        //    </>
//                                        //) :
//                                        (
//                                            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
//                                                <Upload className="h-12 w-12 mb-2" />
//                                                <span>No image uploaded</span>
//                                            </div>
//                                        )}
//                                </div>
//                                <div className="space-y-2">
//                                    <Label htmlFor="image">Upload Image</Label>
//                                    <Input
//                                        id="image"
//                                        name="image"
//                                        type="file"
//                                        accept="image/*"
//                                        onChange={handleImageUpload}
//                                        disabled={isUploading}
//                                        className="w-full text-white file:text-white"
//                                    />
//                                    {isUploading && <p className="text-sm text-white">Uploading...</p>}
//                                </div>
//                            </div>
//                            <div className="order-1 md:order-2">
//                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                                    <div className="space-y-2">
//                                        <Label htmlFor="name">Service Name</Label>
//                                        <Controller
//                                            name="name"
//                                            control={control}
//                                            render={({ field }) => (
//                                                <Input
//                                                    id="name"
//                                                    placeholder="e.g. Haircut"
//                                                    {...field}
//                                                />
//                                            )}
//                                        />
//                                    </div>
//                                    <div className="space-y-2">
//                                        <Label htmlFor="description">Description</Label>
//                                        <Controller
//                                            name="description"
//                                            control={control}
//                                            render={({ field }) => (
//                                                <Textarea
//                                                    id="description"
//                                                    placeholder="Describe the service..."
//                                                    className="min-h-[100px]"
//                                                    {...field}
//                                                />
//                                            )}
//                                        />
//                                    </div>
//                                    <div className="grid grid-cols-2 gap-4">
//                                        <div className="space-y-2">
//                                            <Label htmlFor="price">Price</Label>
//                                            <div className="relative">
//                                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
//                                                <Controller
//                                                    name="price"
//                                                    control={control}
//                                                    render={({ field }) => (
//                                                        <Input
//                                                            id="price"
//                                                            type="number"
//                                                            min="0"
//                                                            step="0.01"
//                                                            className="pl-10"
//                                                            {...field}
//                                                        />
//                                                    )}
//                                                />
//                                            </div>
//                                        </div>
//                                        <div className="space-y-2">
//                                            <Label htmlFor="duration">Duration (minutes)</Label>
//                                            <div className="relative">
//                                                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
//                                                <Controller
//                                                    name="duration"
//                                                    control={control}
//                                                    render={({ field }) => (
//                                                        <Input
//                                                            id="duration"
//                                                            type="number"
//                                                            min="0"
//                                                            className="pl-10"
//                                                            {...field}
//                                                        />
//                                                    )}
//                                                />
//                                            </div>
//                                        </div>
//                                    </div>
//                                    <Button type="submit" className="w-full">Add Service</Button>
//                                </form>
//                            </div>
//                        </div>
//                    </CardContent>
//                </Card>
//            </div>
//        </DialogContent>
//    )
//}

//export default AddService





import React,{ useState } from 'react';
import { useForm } from 'react-hook-form';
import { DialogClose,DialogContent,DialogDescription,DialogHeader,DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card,CardContent } from '../ui/card';
import { Clock,DollarSign,Upload,X } from 'lucide-react';
import { Textarea } from '../ui/textarea';

interface Service {
    _id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    image: string;
}

const AddService = () => {
    const [imageFile,setImageFile] = useState<File | null>(null);
    const [imagePreview,setImagePreview] = useState<string | null>(null);
    const [isUploading,setIsUploading] = useState(false);

    const { register,handleSubmit,reset,setValue,watch,getValues } = useForm<Omit<Service,'_id'>>({
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            duration: 0,
            image: '',
        },
    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const fileUrl = URL.createObjectURL(file);
        setImagePreview(fileUrl);
        setImageFile(file);
    };

    const handleImageDelete = () => {
        setImagePreview(null);
        setImageFile(null);
        setValue('image',''); // Reset the image value in the form
    };

    const onSubmit = async (data: Omit<Service,'_id'>) => {
        setIsUploading(true);

        if (!imageFile) {
            console.error('Image file is missing');
            setIsUploading(false);
            return;
        }

        const formData = new FormData();
        formData.append('image',imageFile);

        setValue('image',"result.data.url",{ shouldDirty: true });

        console.log(getValues())

        console.log(data)

        // Uncomment and replace with your image upload logic
        // const imgbbAPI = import.meta.env.VITE_IMGBB_API_KEY;
        // const imgbbURL = import.meta.env.VITE_IMGBB_API_URL;

        try {
            // const response = await fetch(`${imgbbURL}?key=${imgbbAPI}`, {
            //     method: 'POST',
            //     body: formData,
            // });

            // const result = await response.json();

            // if (result.success) {
            //     setValue('image', result.data.url, { shouldDirty: true });
            // } else {
            //     console.error('Failed to upload image');
            // }

            console.log('Service to be added:',data);

            // Reset the form fields
            reset();
            setImageFile(null);
            setImagePreview(null);
        } catch (error) {
            console.error('Error uploading image:',error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <DialogContent className="backdrop-blur-md w-full max-w-[60rem] text-white">
            <DialogHeader>
                <DialogTitle>Add New Service</DialogTitle>
                <DialogDescription>Enter the details for the new service.</DialogDescription>
            </DialogHeader>
            <div className="w-full max-w-4xl mx-auto p-4 bg-background">
                <Card className="border-none shadow-lg">
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="order-2 md:order-1 space-y-4">
                                <div className="aspect-video rounded-lg overflow-hidden bg-muted relative group">
                                    {imagePreview ? (
                                        <>
                                            <img
                                                src={imagePreview}
                                                alt="Service preview"
                                                className="w-full h-full object-cover transition-opacity group-hover:opacity-50"
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                onClick={handleImageDelete}
                                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="h-4 w-4" />
                                                <span className="sr-only">Delete image</span>
                                            </Button>
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                                            <Upload className="h-12 w-12 mb-2" />
                                            <span>No image uploaded</span>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="image">Upload Image</Label>
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={isUploading}
                                        className="w-full text-white file:text-white"
                                    />
                                    {isUploading && <p className="text-sm text-white">Uploading...</p>}
                                </div>
                            </div>
                            <div className="order-1 md:order-2">
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Service Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="e.g. Haircut"
                                            {...register('name')}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Describe the service..."
                                            className="min-h-[100px]"
                                            {...register('description')}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="price">Price</Label>
                                            <div className="relative">
                                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                                <Input
                                                    id="price"
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    className="pl-10"
                                                    {...register('price',{ valueAsNumber: true })}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="duration">Duration (minutes)</Label>
                                            <div className="relative">
                                                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                                <Input
                                                    id="duration"
                                                    type="number"
                                                    min="0"
                                                    className="pl-10"
                                                    {...register('duration',{ valueAsNumber: true })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <Button type="submit" className="w-full">Add Service</Button>
                                </form>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DialogContent>
    );
};

export default AddService;
