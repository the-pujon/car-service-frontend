import { DollarSign,MoveRight,SettingsIcon } from "lucide-react";
import { Card,CardContent,CardFooter } from "./card";
import { Button } from "./button";
import { Badge } from "./badge";
import { Link } from "react-router-dom";

interface ServiceCardProps {
    _id: string;
    image: string;
    description: string;
    title: string;
    price: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ image,description,title,price,_id }) => {
    return (
        <Card className="w-full max-w-sm mx-auto overflow-hidden transition-all duration-300 hover:shadow-xl group">
            <div className="relative">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge className="absolute top-4 left-4 bg-foreground text-white tracking-widest px-2 py-1">
                    <DollarSign className="w-4 h-4 mr-1 inline" />
                    {price?.toFixed(2)}
                </Badge>
                <div className="absolute -bottom-6 right-4 bg-foreground p-3 rounded-full shadow-lg transition-transform duration-300 group-hover:-translate-y-2">
                    <SettingsIcon className="w-6 h-6 text-white" />
                </div>
            </div>
            <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
                <Button asChild
                    className="w-full group bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 button"
                >
                    <Link to={`/serviceDetails/${_id}`}>
                        <span className="mr-2">Book Now</span>
                        <MoveRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ServiceCard;
