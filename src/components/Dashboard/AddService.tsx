import React,{ useState } from 'react';
import { Controller,useForm } from 'react-hook-form';
import { DialogClose,DialogContent,DialogDescription,DialogHeader,DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card,CardContent } from '../ui/card';
import { Clock,DollarSign,Upload } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { useAddServiceMutation } from '@/redux/features/service/serviceApi';
import { toast } from 'sonner';
import { Select,SelectContent,SelectGroup,SelectItem,SelectTrigger,SelectValue } from '../ui/select';

interface Service {
    _id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    image: string;
    category: string; // Add this line
}

const categories = [
    { value: 'basicWash',name: 'Basic Wash' },
    { value: 'detailing',name: 'Detailing' },
    { value: 'specialtyService',name: 'Specialty Service' },
    { value: 'premiumPackages',name: 'Premium Packages' },
    { value: 'ecoFriendly',name: 'Eco-Friendly Services' },
    { value: 'convenience',name: 'Convenience Services' },
    { value: 'additional',name: 'Additional Services' }
];

const AddService = () => {
    const [imageFile,setImageFile] = useState<File | null>(null);
    const [imagePreview,setImagePreview] = useState<string | null>(null);
    const [isUploading,setIsUploading] = useState(false);

    const [addService,{ isError,error }] = useAddServiceMutation(undefined)

    const { register,handleSubmit,reset,setValue,getValues,control } = useForm<Omit<Service,'_id'>>({
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            duration: 0,
            image: '',
            category: '', // Add this line
        },
    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const fileUrl = URL.createObjectURL(file);
        setImagePreview(fileUrl);
        setImageFile(file);
    };


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit = async (_data: Omit<Service,'_id'>) => {
        setIsUploading(true);

        if (!imageFile) {
            console.error('Image file is missing');
            setIsUploading(false);
            return;
        }

        const formData = new FormData();
        formData.append('image',imageFile);

        const imgbbAPI = import.meta.env.VITE_IMGBB_API_KEY;
        const imgbbURL = import.meta.env.VITE_IMGBB_API_URL;

        const toastId = toast.loading('Adding...');

        try {
            const response = await fetch(`${imgbbURL}?key=${imgbbAPI}`,{
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                setValue('image',result.data.url,{ shouldDirty: true });
                const serviceData = getValues()

                try {
                    await addService(serviceData).unwrap();
                    toast.success('Service Added Successfully',{ id: toastId,duration: 2000 });
                } catch (serviceError) {
                    console.error('Error adding service:',serviceError);
                    toast.error("Failed to add service",{ id: toastId });
                }
            } else {
                console.error('Failed to upload image');
                toast.error("Failed to upload image")
            }
            reset();
            setImageFile(null);
            setImagePreview(null);
        } catch (error) {
            console.error('Error uploading image:',error);
        } finally {
            setIsUploading(false);
        }
    };

    if (isError) {
        console.error(error);
        const apiError = error as { data?: { message?: string } };
        toast.error(apiError.data?.message || "Something went wrong");
    }


    return (
        <DialogContent className="backdrop-blur-md w-full max-w-[60rem] text-white ">

            <DialogHeader>
                <DialogTitle>Add New Service</DialogTitle>
                <DialogDescription>Enter the details for the new service.</DialogDescription>
            </DialogHeader>
            <div className="w-full max-w-4xl mx-auto p-4 bg-background ">
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
                                </div>
                            </div>
                            <div className="order-1 md:order-2">
                                <form id='service-form' onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Controller
                                            name="category"
                                            control={control}
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {categories.map((category) => (
                                                                <SelectItem key={category.value} value={category.value}>
                                                                    {category.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            )}
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

                                </form>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <DialogClose asChild>
                <Button type="submit" form='service-form' className='button'>
                    Add Service
                </Button>
            </DialogClose>
        </DialogContent>
    );
};

export default AddService;
