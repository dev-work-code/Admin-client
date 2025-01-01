import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';
import SkeletonLoader from '@/pages/common/SkeletonLoader';

const FacilityMap: React.FC = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDZbcWcVkjMlZIMYHQ29hNKjbVgDVJ348g',
  });

  const location = useLocation();
  // const navigate = useNavigate();

  const { state } = location;
  const facilityLocation = state?.location;

  if (!facilityLocation) {
    return <p>No location provided.</p>;
  }

  return (
    <div className="h-full  max-w-6xl p-2 ml-4">
      {/* <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded absolute top-4 left-4 z-10"
      >
        Back
      </button> */}
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' , borderRadius:"20px" }}
          center={facilityLocation}
          zoom={15}
        >
          <Marker position={facilityLocation} />
        </GoogleMap>
      ) : (
        <div><SkeletonLoader fullPage /></div>
      )}
    </div>
  );
};

export default FacilityMap;
