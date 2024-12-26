const ServiceCardSkeleton = () => {
    return (
        <div className="w-full max-w-sm mx-auto overflow-hidden animate-pulse bg-primary-foreground rounded-lg shadow">
            <div className="relative">
                <div className="w-full h-64 bg-gray-300/20 dark:bg-gray-700/20" />
                <div className="absolute top-4 left-4 h-7 w-24 bg-gray-300/20 dark:bg-gray-700/20 rounded-full flex items-center">
                    <div className="w-4 h-4 rounded-full ml-2 bg-gray-300/40 dark:bg-gray-700/40" />
                    <div className="w-12 h-3 rounded-full ml-2 bg-gray-300/40 dark:bg-gray-700/40" />
                </div>
                <div className="absolute -bottom-6 right-4 w-12 h-12 bg-gray-300/20 dark:bg-gray-700/20 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-gray-300/40 dark:bg-gray-700/40" />
                </div>
            </div>
            <div className="p-6">
                <div className="h-8 bg-gray-300/20 dark:bg-gray-700/20 rounded-lg w-3/4 mb-4" />
                <div className="space-y-2">
                    <div className="h-4 bg-gray-300/20 dark:bg-gray-700/20 rounded w-full" />
                    <div className="h-4 bg-gray-300/20 dark:bg-gray-700/20 rounded w-full" />

                    {/* <div className="h-4 bg-gray-300/20 dark:bg-gray-700/20 rounded w-5/6" /> */}
                    {/* <div className="h-4 bg-gray-300/20 dark:bg-gray-700/20 rounded w-4/6" /> */}
                </div>
            </div>
            <div className="p-6 pt-0">
                <div className="h-12 bg-gray-300/20 dark:bg-gray-700/20 rounded-lg flex items-center justify-center">
                    <div className="w-24 h-4 bg-gray-300/40 dark:bg-gray-700/40 rounded mr-2" />
                    <div className="w-5 h-5 bg-gray-300/40 dark:bg-gray-700/40 rounded" />
                </div>
            </div>
        </div>
    );
};

export default ServiceCardSkeleton; 