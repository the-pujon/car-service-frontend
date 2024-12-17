import React, { useState } from 'react';
import { Controller, useForm, useFieldArray, FieldArrayPath } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Clock, DollarSign, Upload, Plus, X } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useAddServiceMutation } from '@/redux/features/service/serviceApi';
import { toast } from 'sonner';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Service {
    _id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    image: string;
    category: string;
    benefits: string[];
    suitableFor: string[];
}

type ServiceFormData = Omit<Service,'_id'>;

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

    const { register,handleSubmit,reset,setValue,getValues,control } = useForm<ServiceFormData>({
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            duration: 0,
            image: '',
            category: '',
            benefits: [''],
            suitableFor: [''],
        },
    });

    const { fields: benefitFields,append: appendBenefit,remove: removeBenefit } = useFieldArray({
        control,
        name: "benefits" as FieldArrayPath<ServiceFormData>,
    });

    const { fields: suitableForFields,append: appendSuitableFor,remove: removeSuitableFor } = useFieldArray({
        control,
        name: "suitableFor" as FieldArrayPath<ServiceFormData>,
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
        <div className="container mx-auto py-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Add New Service</h1>
                    <p className="text-muted-foreground">Create a new service by filling out the details below.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Image Upload Section */}
                <Card className="lg:col-span-1 border-none shadow-lg">
                    <CardHeader>
                        <CardTitle>Service Image</CardTitle>
                        <CardDescription>Upload a representative image for the service</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="aspect-video rounded-lg overflow-hidden bg-muted relative group">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Service preview"
                                    className="w-full h-full object-cover transition-opacity group-hover:opacity-50"
                                />
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
                    </CardContent>
                </Card>

                {/* Service Details Form */}
                <Card className="lg:col-span-2 border-none shadow-lg">
                    <CardHeader>
                        <CardTitle>Service Details</CardTitle>
                        <CardDescription>Fill in the service information</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form id='service-form' onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Service Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="e.g. Premium Car Wash"
                                        {...register('name')}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Controller
                                        name="category"
                                        control={control}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger>
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

                            <div className="grid md:grid-cols-2 gap-6">
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
                                            {...register('price', { valueAsNumber: true })}
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
                                            {...register('duration', { valueAsNumber: true })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Benefits Section */}
                            <div className="space-y-2">
                                <Label>Service Includes</Label>
                                <div className="space-y-2">
                                    {benefitFields.map((field, index) => (
                                        <div key={field.id} className="flex items-center space-x-2">
                                            <Input
                                                {...register(`benefits.${index}`)}
                                                placeholder="e.g. Exterior wash"
                                            />
                                            {index > 0 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeBenefit(index)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" size="sm" onClick={() => appendBenefit('')}>
                                        <Plus className="h-4 w-4 mr-2" /> Add Benefit
                                    </Button>
                                </div>
                            </div>

                            {/* Suitable For Section */}
                            <div className="space-y-2">
                                <Label>Suitable For</Label>
                                <div className="space-y-2">
                                    {suitableForFields.map((field, index) => (
                                        <div key={field.id} className="flex items-center space-x-2">
                                            <Input
                                                {...register(`suitableFor.${index}`)}
                                                placeholder="e.g. Sedan"
                                            />
                                            {index > 0 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeSuitableFor(index)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" size="sm" onClick={() => appendSuitableFor('')}>
                                        <Plus className="h-4 w-4 mr-2" /> Add Vehicle Type
                                    </Button>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button type="submit" className="button w-full md:w-auto">
                                    Add Service
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AddService;
