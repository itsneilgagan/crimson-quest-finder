import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search for services..." }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 text-base bg-card/50 backdrop-blur border-burgundy/30 focus:border-primary"
          />
        </div>
        <Button 
          type="submit" 
          size="lg"
          className="px-6 bg-primary hover:bg-primary-dark"
        >
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="lg"
          className="px-4 border-burgundy/30 hover:bg-primary/10"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;