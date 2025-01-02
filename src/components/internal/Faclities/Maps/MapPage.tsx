import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';
import SkeletonLoader from '@/pages/common/SkeletonLoader';
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import api from '@/utils/api';
import { AlignRight } from 'lucide-react';

type FacilityLocation = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

const FacilityMap: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('Pharmacy');
  const [facilities, setFacilities] = useState<FacilityLocation[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<FacilityLocation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [showPharmacy, setShowPharmacy] = useState(true);
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [showBloodBanks, setShowBloodBanks] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDZbcWcVkjMlZIMYHQ29hNKjbVgDVJ348g',
  });

  const location = useLocation();
  const { state } = location;
  const facilityLocation = state?.location;

  useEffect(() => {
    setIsLoading(true);
    let endpoint = '';

    if (showPharmacy) {
      endpoint = '/admin/get-pharmacy-coordinates';
    } else if (showDiagnostics) {
      endpoint = '/admin/get-diagnostic-center-coordinates';
    } else if (showBloodBanks) {
      endpoint = '/admin/get-blood-bank-coordinates';
    }

    if (endpoint) {
      api
        .get(endpoint)
        .then((response) => {
          if (response.data.success) {
            const mappedData = response.data.data.map((item: any) => ({
              id: showPharmacy
                ? item.pharmacyId
                : showDiagnostics
                  ? item.diagnosticCenterId
                  : item.bloodBankId,
              name: showPharmacy
                ? item.pharmacyName
                : showDiagnostics
                  ? item.diagnosticCenterName
                  : item.bloodBankName,
              latitude: item.latitude,
              longitude: item.longitude,
            }));
            setFacilities(mappedData);
            setError(null);
          } else {
            setError(`Failed to load facility data.`);
          }
        })
        .catch(() => {
          setError(`An error occurred while fetching facility data.`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [showPharmacy, showDiagnostics, showBloodBanks]);

  const filteredFacilities = facilities.filter((facility) =>
    facility.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!facilityLocation) {
    return <p>No location provided.</p>;
  }
  const facilityName = showPharmacy
    ? 'Pharmacy'
    : showDiagnostics
      ? 'Diagnostic Center'
      : 'Blood Bank';

  return (
    <>
      <div className='flex items-center justify-between'>
        <h2 className="mb-4 text-2xl font-normal ml-20 mt-4 text-[#013DC0]">{facilityName}</h2>
        <div className="flex justify-end p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span className='bg-[#013DC0] text-white px-4 py-2 rounded-lg'> <AlignRight className='' /> </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>See what’s near you</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={showPharmacy}
                onCheckedChange={() => {
                  setShowPharmacy(true);
                  setShowDiagnostics(false);
                  setShowBloodBanks(false);
                }}
              >
                Pharmacy
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showDiagnostics}
                onCheckedChange={() => {
                  setShowDiagnostics(true);
                  setShowPharmacy(false);
                  setShowBloodBanks(false);
                }}
              >
                Diagnostic Center
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showBloodBanks}
                onCheckedChange={() => {
                  setShowBloodBanks(true);
                  setShowPharmacy(false);
                  setShowDiagnostics(false);
                }}
              >
                Blood Bank
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex h-full max-w-8xl p-2 space-x-4">
        {/* Sidebar */}
        <Card className="w-64 p-4 bg-white rounded-lg shadow-lg overflow-y-auto hide-scrollbar">
          <h2 className="mb-4 text-lg font-bold">Available {facilityName}s</h2>

          {/* Search Bar */}
          <input
            type="text"
            placeholder={`Search ${facilityName}s by name`}
            className="p-2 border rounded mb-4 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : filteredFacilities.length === 0 ? (
            <p>No {facilityName}s found.</p>
          ) : (
            filteredFacilities.map((facility) => (
              <Card
                key={facility.id}
                className={`p-4 mb-2 cursor-pointer hover:bg-gray-200 ${selectedFacility?.id === facility.id ? 'border-2 border-blue-500' : ''}`}
                onClick={() => setSelectedFacility(facility)}
              >
                <h3 className="text-base font-semibold">{facility.name}</h3>
                <p className="text-sm text-gray-600">
                  📍 {facility.latitude}, {facility.longitude}
                </p>
              </Card>
            ))
          )}
        </Card>

        {/* Map */}
        <div className="flex-1 relative">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%', borderRadius: '20px' }}
              center={
                selectedFacility
                  ? { lat: selectedFacility.latitude, lng: selectedFacility.longitude }
                  : facilityLocation
              }
              zoom={15}
            >
              {/* Facility Marker */}
              <Marker position={facilityLocation} title="Facility Location" />

              {/* Facility Type Markers */}
              {filteredFacilities.map((facility) => (
                <Marker
                  key={facility.id}
                  position={{ lat: facility.latitude, lng: facility.longitude }}
                  title={facility.name}
                  icon={
                    selectedFacility?.id === facility.id
                      ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                      : undefined
                  }
                />
              ))}
            </GoogleMap>
          ) : (
            <SkeletonLoader fullPage />
          )}
        </div>
      </div>
    </>
  );
};

export default FacilityMap;
