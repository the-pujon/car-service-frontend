export interface Category {
    value: string;
    name: string;
}

// export const categories: Category[] = [
//     { value: 'all', name: 'All' },
//     { value: 'basicWash', name: 'Basic Wash' },
//     { value: 'detailing', name: 'Detailing' },
//     { value: 'specialtyService', name: 'Specialty Service' },
//     { value: 'premiumPackages', name: 'Premium Packages' },
//     { value: 'ecoFriendly', name: 'Eco-Friendly Services' },
//     { value: 'convenience', name: 'Convenience Services' },
//     { value: 'additional', name: 'Additional Services' }
// ];

export const categories: Category[] = [
    { value: 'all', name: 'All' },
    { value: 'basicWash', name: 'Basic Wash' },
    { value: 'exteriorWash', name: 'Exterior Wash' },
    { value: 'interiorCleaning', name: 'Interior Cleaning' },
    { value: 'fullServiceWash', name: 'Full-Service Wash' },
    { value: 'ecoFriendly', name: 'Eco-Friendly Wash' },
    { value: 'detailing', name: 'Detailing Services' },
    { value: 'waxingPolishing', name: 'Waxing and Polishing' },
    { value: 'engineCleaning', name: 'Engine Cleaning' },
    { value: 'tireWheelCleaning', name: 'Tire and Wheel Cleaning' },
    { value: 'undercarriageCleaning', name: 'Undercarriage Cleaning' },
    { value: 'paintProtection', name: 'Paint Protection' },
    { value: 'premiumPackages', name: 'Premium Packages' },
    { value: 'headlightRestoration', name: 'Headlight Restoration' },
    { value: 'petHairRemoval', name: 'Pet Hair Removal' },
    { value: 'steamCleaning', name: 'Steam Cleaning' },
    { value: 'odorRemoval', name: 'Odor Removal' },
    { value: 'ceramicCoating', name: 'Ceramic Coating' },
    { value: 'mobileCarWash', name: 'Mobile Car Wash' },
    { value: 'fleetCleaning', name: 'Fleet Cleaning' },
    { value: 'luxuryCarCare', name: 'Luxury Car Care' },
    { value: 'classicCarCare', name: 'Classic Car Care' },
    { value: 'specialtyService', name: 'Specialty Service' },
];


export const getCategoryName = (categoryValue: string): string => {
    const category = categories.find(cat => cat.value === categoryValue);
    return category?.name || categoryValue; // Fallback to value if name not found
};