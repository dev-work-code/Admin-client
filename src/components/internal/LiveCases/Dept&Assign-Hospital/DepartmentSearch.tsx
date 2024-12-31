import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface DepartmentSearchProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const DepartmentSearch: React.FC<DepartmentSearchProps> = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className="relative w-full shadow-[5px_5px_20px_0px_#61ABEB33] rounded-full">
            <Input
                placeholder="Search for Doctor Department"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border px-4 py-6 rounded-full pr-10"
            />
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#003CBF] p-4 rounded-full">
                <Search className="text-white w-5 h-5" />
            </div>
        </div>
    );
};

export default DepartmentSearch;
