import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import ServiceCard from './ServiceCard';
import { toast } from '@/hooks/use-toast';

interface Service {
  id: string;
  title: string;
  description: string;
  provider_name: string;
  price_range: string;
  rating: number;
  location: string;
  availability: string;
  skill_name: string;
}

interface ServiceGridProps {
  searchQuery: string;
}

const ServiceGrid = ({ searchQuery }: ServiceGridProps) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, [searchQuery]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      
      // Fetch requests with related data
      let query = supabase
        .from('requests')
        .select(`
          request_id,
          title,
          description,
          budget_min,
          budget_max,
          customers!inner(
            address
          ),
          skills!inner(
            name
          ),
          assignments!inner(
            providers!inner(
              profiles!inner(
                first_name,
                last_name
              ),
              average_rating
            )
          )
        `);

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query.limit(20);

      if (error) {
        console.error('Error fetching services:', error);
        toast({
          title: "Error",
          description: "Failed to load services",
          variant: "destructive",
        });
        return;
      }

      // Transform data to match our Service interface
      const transformedServices: Service[] = (data || []).map((item: any) => ({
        id: item.request_id,
        title: item.title || 'Service Request',
        description: item.description || 'No description available',
        provider_name: item.assignments?.[0]?.providers?.profiles?.first_name 
          ? `${item.assignments[0].providers.profiles.first_name} ${item.assignments[0].providers.profiles.last_name || ''}`.trim()
          : 'Provider',
        price_range: item.budget_min && item.budget_max 
          ? `₹${item.budget_min} - ₹${item.budget_max}`
          : 'Price on request',
        rating: item.assignments?.[0]?.providers?.average_rating || 4.5,
        location: item.customers?.address || 'Location not specified',
        availability: 'Available',
        skill_name: item.skills?.name || 'General Service',
      }));

      setServices(transformedServices);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSelect = (serviceId: string) => {
    toast({
      title: "Service Selected",
      description: "Contact the provider to book this service.",
    });
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-80 bg-card/50 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No services found</h3>
        <p className="text-muted-foreground">
          {searchQuery ? `No services match "${searchQuery}"` : 'No services available at the moment'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onSelect={handleServiceSelect}
        />
      ))}
    </div>
  );
};

export default ServiceGrid;