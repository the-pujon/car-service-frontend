import { ArrowRightIcon,MoveRight,SettingsIcon } from "lucide-react";
import { Card,CardContent,CardFooter } from "./card";
import { Button } from "./button";

interface ServiceCardProps {
    image: string;
    description: string;
    title: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ image,description,title }) => {
    return (
        <Card className="w-full relative max-w-lg border-white border-dotted mx-auto  shadow-md">
            <div className="">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-72 object-cover"
                />
                <div className="absolute -top-7 left-3 bg-foreground p-2">
                    <SettingsIcon size={40} className=" text-white" />
                </div>
            </div>
            <CardContent className="p-4">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-sm">
                    {description}
                </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button
                    //variant="link"
                    className="tracking-widest bg-foreground text-white hover:text-black h-auto font-semibold"
                >
                    BOOK NOW
                    <MoveRight className="ml-2 w-4 h-4" />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ServiceCard;
