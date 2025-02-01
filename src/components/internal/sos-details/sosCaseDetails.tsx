import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import api from '@/utils/api';
import SkeletonLoader from '@/pages/common/SkeletonLoader';
import { useSearchParams } from 'react-router-dom';

const SOSCaseDetails: React.FC = () => {
 
  const [details, setDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await api.get(`/admin/get-complete-call-details?sosCallbackId=${id}`);
        setDetails(response.data);
      } catch (err) {
        setError('Failed to load SOS case details');
        console.error('Error fetching SOS details:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (isLoading) return <SkeletonLoader fullPage />;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!details) return <div className="text-center">No details found</div>;

  return (
    <Card className="max-w-4xl mx-auto mt-8 p-6 shadow-lg">
      <CardTitle className="text-2xl font-medium mb-6 text-[#003CBF]">
        SOS Case Details
      </CardTitle>
      <CardContent className="space-y-6">
        <div className="bg-[#E8F1FD] p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">User Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <p className="text-gray-700"><span className="font-medium">Name:</span> {details.sosCase.user.name}</p>
            <p className="text-gray-700"><span className="font-medium">Mobile:</span> {details.sosCase.user.mobileNumber}</p>
            <p className="text-gray-700"><span className="font-medium">Email:</span> {details.sosCase.user.email}</p>
            <p className="text-gray-700"><span className="font-medium">Care Plan Details:</span> {details?.carePlanDetials || '-'}</p>
            <p className="text-gray-700"><span className="font-medium">Distance from ambulance:</span> {details?.distance || '-'}</p>
            <p className="text-gray-700"><span className="font-medium">Estimated time:</span> {details?.estimatedTime || '-'}</p>
          </div>
        </div>

        {details.sosCase.hospital && (
          <div className="bg-[#E8F1FD] p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Assigned Hospital Details</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <p className="text-gray-700"><span className="font-medium">Name:</span> {details.sosCase.hospital.hospitalName}</p>
              <p className="text-gray-700"><span className="font-medium">Contact:</span> {details.sosCase.hospital.hospitalPhoneNumber}</p>
              <p className="text-gray-700"><span className="font-medium">Address:</span> {details.sosCase.hospital.hospitalLocation}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        </div>

        {details.sosCase.driver && (
          <div className="bg-[#E8F1FD] p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Assigned Driver Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-gray-700"><span className="font-medium">Name:</span> {details.sosCase.driver.driverName}</p>
              <p className="text-gray-700"><span className="font-medium">Mobile:</span> {details.sosCase.driver.driverMobileNumber}</p>
              <p className="text-gray-700"><span className="font-medium">Vehicle Number:</span> {details.sosCase.driver.registrationNumber}</p>
              <p className="text-gray-700"><span className="font-medium">Ambulance Type:</span> {details.sosCase.driver.typeOfAmbulance}</p>
              <p className="text-gray-700"><span className="font-medium">Hospital:</span> {details.sosCase.driver.registeredHospital}</p>
            </div>
          </div>
        )}

        {details.sosCase.doctor && (
          <div className="bg-[#E8F1FD] p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Assigned Doctor Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-gray-700"><span className="font-medium">Name:</span> {details.sosCase.doctor.doctorName}</p>
              <p className="text-gray-700"><span className="font-medium">Mobile:</span> {details.sosCase.doctor.doctorMobileNumber}</p>
              <p className="text-gray-700"><span className="font-medium">Specialization:</span> {details.sosCase.doctor.areaOfSpecialization}</p>
              <p className="text-gray-700"><span className="font-medium">Experience:</span> {details.sosCase.doctor.experience}</p>
              <p className="text-gray-700"><span className="font-medium">Hospital:</span> {details.sosCase.doctor.doctorHospital}</p>
              <p className="text-gray-700"><span className="font-medium">Qualification:</span> {details.sosCase.doctor.doctorQualification}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SOSCaseDetails;