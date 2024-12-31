import { Card, CardTitle } from '@/components/ui/card';
import { useLocation } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import AmbulanceDetailsCard from './AmbulanceCard';
import PersonalDetailsCard from './PersonalDetailsCard';
import ChiefComplaintsCard from './ChiefComplaintsCard';
import ECGCard from './ECGCard';
import BloodPressureCard from './VitalsCard/BloodPressureCard';
import HeartRateCard from './VitalsCard/HeartRateCard';
import SPO2Card from './VitalsCard/SPO2Card';
import BodyTemperatureCard from './VitalsCard/BodyTemperatureCard';
import RespiratoryRateCard from './VitalsCard/RespiratoryRateCard';
import HeartRateVariabilityCard from './VitalsCard/HeartRateVariabilityCard';
import HospitalDetailsCard from './ HospitalCard';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
interface ECGPoint {
  e: number; // ECG signal strength
  t: number; // Time in milliseconds
  o: number; // (optional) Additional info
}
interface Appointment {
  appointmentId: string;
  appointmentDate: string;
  appointmentType: string;
  description: string;
  doctor: {
    name: string;
    qualification: string;
  };
  prescription: string;
}

const LiveCaseProfile = () => {
  const { state } = useLocation();
  const caseDetails = state?.caseDetails;

  if (!caseDetails) {
    return <p>No case details available</p>;
  }

  // Extract vitals from caseDetails
  const vitals = caseDetails.vitals?.data;
  const bp = vitals?.bp; // Blood Pressure
  const heartRate = caseDetails.heartRate;
  const spo2 = caseDetails.spo2;
  const bodyTemp = '36.7';  // Example data
  const respiratoryRate = '18';  // Example data
  const hrv = '42';  // Example data

  // ECG Data
  const ecgData = vitals?.ecg?.ecg_clean as ECGPoint[]; // Explicitly typing ecg_clean

  // Extract appointments from medical history
  const appointments = caseDetails.medicalHistory?.appointments || [];

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-8">
        {/* Ambulance Details Card */}
        <AmbulanceDetailsCard
          ambulancePhoto={caseDetails.ambulanceDriver?.ambulancePhoto || null}
          typeOfAmbulance={caseDetails.ambulanceDriver?.typeOfAmbulance || 'N/A'}
          driverName={caseDetails.ambulanceDriver?.driverName || 'Unknown'}
          driverMobileNumber={caseDetails.ambulanceDriver?.driverMobileNumber || 'N/A'}
          registrationNumber={caseDetails.ambulanceDriver?.registrationNumber || 'N/A'}
        />

        <HospitalDetailsCard
          hospitalPhoto={caseDetails.hospital?.hospitalPhoto || null}
          hospitalName={caseDetails.hospital?.hospitalName || 'N/A'}
          hospitalLocation={caseDetails.hospital?.hospitalLocation || 'N/A'}
          hospitalWorkingHours={caseDetails.hospital?.hospitalWorkingHours || 'N/A'}
        />

        <PersonalDetailsCard
          patientName={caseDetails.patientName || 'N/A'}
          patientAge={caseDetails.patientAge || 'N/A'}
          patientGender={caseDetails.patientGender || 'N/A'}
          phoneNumber1={caseDetails.phoneNumber1 || 'N/A'}
          meetLinks={caseDetails.meetLinks || {}}
        />

        {/* Chief Complaints Card */}
        <ChiefComplaintsCard
          caseHistoryChiefComplaints={caseDetails.caseHistoryChiefComplaints || 'No complaints specified'}
        />
      </div>

      {/* Vitals Card */}
      <div className="w-[1100px] mt-6 ml-9">
        <Card className="w-full  border border-gray-200 shadow-md">
          <div className='bg-[#E9F4FF] h-12 rounded-t-lg flex items-center justify-start'>
            <span className='text-[#013DC0] font-semibold ml-2'>Details</span>
          </div>

          {ecgData && <ECGCard ecgData={ecgData} />}
          <CardTitle className='mt-4 ml-2 text-[#013DC0] font-semibold'>Latest Vitals</CardTitle>
          <div className="flex flex-row items-center justify-evenly gap-6 mt-4 mb-4">
            <BloodPressureCard bp={bp} />
            <HeartRateCard heartRate={heartRate} />
            <SPO2Card spo2={spo2} />
            <BodyTemperatureCard bodyTemp={bodyTemp} />
            <RespiratoryRateCard respiratoryRate={respiratoryRate} />
            <HeartRateVariabilityCard hrv={hrv} />
          </div>
        </Card>
      </div>

      {/* Previous Appointments Card */}
      <div className="w-[1100px] mt-6 ml-9">
        <Card className="w-full border border-gray-200 shadow-md">
          <div className='bg-[#E9F4FF] h-12 rounded-t-lg flex items-center justify-start'>
            <span className='text-[#013DC0] font-semibold ml-2'>Previous Appointments</span>
          </div>
          <div className="p-4">
            {appointments.length > 0 ? (
              appointments.map((appointment: Appointment) => (
                <div key={appointment.appointmentId} className="border-b border-gray-200 py-4">
                  <h3 className="text-lg font-semibold">{new Date(appointment.appointmentDate).toLocaleDateString()}</h3>
                  <p className="text-sm text-gray-600">Appointment Type: {appointment.appointmentType}</p>
                  <p className="text-sm text-gray-600">Description: {appointment.description}</p>
                  <p className="text-sm text-gray-600">Doctor: {appointment.doctor?.name} ({appointment.doctor?.qualification})</p>
                  <a
                    href={appointment.prescription}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm"
                  >
                    View Prescription
                  </a>
                </div>
              ))
            ) : (
              <p>No previous appointments available.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LiveCaseProfile;
