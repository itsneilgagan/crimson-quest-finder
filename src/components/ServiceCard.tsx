import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock } from 'lucide-react';

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description: string;
    provider_name: string;
    price_range: string;
    rating: number;
    location: string;
    availability: string;
    skill_name: string;
  };
  onSelect: (serviceId: string) => void;
}

const ServiceCard = ({ service, onSelect }: ServiceCardProps) => {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 bg-card border-burgundy/20">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {service.skill_name}
          </Badge>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{service.rating}</span>
          </div>
        </div>
        <CardTitle className="text-xl line-clamp-2">{service.title}</CardTitle>
        <CardDescription className="text-primary font-medium">
          by {service.provider_name}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {service.description}
        </p>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            {service.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            {service.availability}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="text-lg font-bold text-primary">
            {service.price_range}
          </div>
          <Button 
            onClick={() => onSelect(service.id)}
            className="bg-primary hover:bg-primary-dark"
          >
            Book Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;