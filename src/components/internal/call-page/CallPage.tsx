import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Video, Mic } from 'lucide-react';
import { useDoctors } from '@/hooks/useDoctors';
import api from '@/utils/api';
import { useDrivers } from '@/hooks/useDrivers';
import {
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  usePublish,
  useRemoteUsers,
} from 'agora-rtc-react';

const CallPage = () => {
  const [searchParams] = useSearchParams();
  const [selectedDoctor] = useState<string | null>(null);
  const { data: doctors, isLoading } = useDoctors();
  const { data: drivers } = useDrivers();
  const [calling, setCalling] = useState(false);
  const isConnected = useIsConnected();
<<<<<<< HEAD
  const [hospitals, setHospitals] = useState<
    Array<{ hospitalId: string; hospitalName: string }>
  >([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  //@ts-ignore
=======
  const [hospitals, setHospitals] = useState<Array<{ hospitalId: string; hospitalName: string }>>([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
>>>>>>> db52837 (new change)
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);

  const appId = searchParams.get('appId');
  const token = searchParams.get('token');
  const channel = searchParams.get('channel');

  useJoin(
    {
      appid: appId || '',
      channel: channel || '',
      token: token || null,
    },
    calling
  );

  //local user
  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  usePublish([localMicrophoneTrack, localCameraTrack]);
  //remote users
  const remoteUsers = useRemoteUsers();

  const connectWebSocket = (url: string, message: object) => {
    const socket = new WebSocket(url);

    // Handle WebSocket open event
    socket.onopen = () => {
      console.log('WebSocket connection established.');
      socket.send(JSON.stringify(message));
    };

    // Handle incoming messages
    socket.onmessage = (event) => {
      console.log('Message from server:', event.data);
    };

    // Handle WebSocket error
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Handle WebSocket close
    socket.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    return socket;
  };

  const allDoctors = [
    ...(doctors?.approved || []),
    ...(doctors?.pending || []),
    ...(doctors?.rejected || []),
  ];

  const handleDoctorSelect = async (doctorId: string) => {
    const sosCallbackId = searchParams.get('sosCallbackId');

    if (!sosCallbackId) {
      alert('SOS Callback ID is missing.');
      return;
    }

    try {
      await api.post('/admin/assign-doctor', {
        sosCallbackId,
        doctorId,
      });

      connectWebSocket('wss://livapp.elitceler.com/ws/sos-callback', {
        userType: 'user',
        appId: appId,
        token: token,
        channel: channel,
        sosCallbackId: sosCallbackId,
      });

      alert('Request sent successfully!');
    } catch (error) {
      console.error('Failed to send request:', error);
      alert('Failed to send request.');
    }
  };
  const handleDriverSelect = async (driverId: string) => {
    const sosCallbackId = searchParams.get('sosCallbackId');
    const latitude = searchParams.get('latitutde');
    const longitude = searchParams.get('longitude');

    if (!sosCallbackId) {
      alert('SOS Callback ID is missing.');
      return;
    }

    try {
      await api.post('/admin/assign-driver', {
        sosCallbackId,
        driverId,
        latitude,
        longitude,
      });
      alert('Request sent successfully!');
    } catch (error) {
      console.error('Failed to send request:', error);
      alert('Failed to send request.');
    }
  };

  const fetchNearbyHospitals = async () => {
    const sosCallbackId = searchParams.get('sosCallbackId');
<<<<<<< HEAD

=======
    
>>>>>>> db52837 (new change)
    if (!sosCallbackId) {
      alert('SOS Callback ID is missing.');
      return;
    }

    try {
      setLoadingHospitals(true);
<<<<<<< HEAD
      const response = await api.get(
        `/admin/get-nearby-hospitals?sosCallbackId=${sosCallbackId}`
      );
=======
      const response = await api.get(`/admin/get-nearby-hospitals?sosCallbackId=${sosCallbackId}`);
>>>>>>> db52837 (new change)
      setHospitals(response.data.nearbyHospitals);
    } catch (error) {
      console.error('Failed to fetch hospitals:', error);
      alert('Failed to fetch nearby hospitals.');
    } finally {
      setLoadingHospitals(false);
    }
  };

  const handleHospitalSelect = async (hospitalId: string) => {
    const sosCallbackId = searchParams.get('sosCallbackId');

    if (!sosCallbackId) {
      alert('SOS Callback ID is missing.');
      return;
    }

    try {
      await api.post('/admin/assign-hospital-soscase', {
        sosCallbackId,
        hospitalId,
      });
      alert('Hospital assigned successfully!');
    } catch (error) {
      console.error('Failed to assign hospital:', error);
      alert('Failed to assign hospital.');
    }
  };

<<<<<<< HEAD
=======
  const handleEndCall = async () => {
    const sosCallbackId = searchParams.get('sosCallbackId');

    if (!sosCallbackId) {
      alert('SOS Callback ID is missing.');
      return;
    }

    try {
      await api.put(`/admin/call-completed?sosCallbackId=${sosCallbackId}`);
      setCalling(false);
      alert('Call ended successfully!');
    } catch (error) {
      console.error('Failed to end call:', error);
      alert('Failed to end call.');
    }
  };

>>>>>>> db52837 (new change)
  return (
    <div>
      <>
        <div className='pt-[100px]'>
          {isConnected ? (
            <div className='grid grid-cols-3 gap-6 p-8 max-w-7xl mx-auto'>
              <div className='relative aspect-video rounded-xl overflow-hidden border border-gray-700 shadow-lg bg-gray-800'>
                <LocalUser
                  audioTrack={localMicrophoneTrack}
                  cameraOn={cameraOn}
                  micOn={micOn}
                  videoTrack={localCameraTrack}
                  cover='https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg'
                >
                  <div className='absolute bottom-3 left-3 z-10 inline-flex items-center gap-2 px-3 py-1.5 text-sm text-white bg-black/60 backdrop-blur-sm rounded-lg'>
                    <span>You</span>
                  </div>
                </LocalUser>
              </div>
              {remoteUsers.map((user) => (
                <div
                  className='relative aspect-video rounded-xl overflow-hidden border border-gray-700 shadow-lg bg-gray-800'
                  key={user.uid}
                >
                  <RemoteUser
                    cover='https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg'
                    user={user}
                  >
                    <div className='absolute bottom-3 left-3 z-10 inline-flex items-center gap-2 px-3 py-1.5 text-sm text-white bg-black/60 backdrop-blur-sm rounded-lg'>
                      <span>{user.uid}</span>
                    </div>
                  </RemoteUser>
                </div>
              ))}
            </div>
          ) : (
            <div className='max-w-[380px] mx-auto rounded p-4 shadow-[0_20px_40px_rgba(0,0,0,0.3)]'>
              <button
                className={`w-full mt-2.5 px-4 h-8 rounded-md text-sm text-white bg-gray-700 shadow-[0_2px_0_rgba(5,145,255,0.1)] transition-all duration-200 
                  ${
                    !appId || !channel
                      ? 'bg-gray-300 shadow-none'
                      : 'hover:bg-blue-600'
                  }`}
                disabled={!appId || !channel}
                onClick={() => setCalling(true)}
              >
                <span>Join Channel</span>
              </button>
            </div>
          )}
        </div>
        <div>
          <div className='absolute top-32 right-4 flex flex-col gap-4 min-w-[250px]'>
            <select
              className='w-full bg-gray-700 text-white p-2.5 rounded-lg shadow-lg outline-none border border-gray-600 hover:border-gray-500 transition-colors'
              onChange={(e) => handleDoctorSelect(e.target.value)}
              value={selectedDoctor || ''}
            >
              <option value='' disabled>
                {isLoading ? 'Loading doctors...' : 'Assign a doctor'}
              </option>
              {allDoctors?.map((doctor) => (
                <option key={doctor.doctorId} value={doctor.doctorId}>
                  {doctor.doctorName}
                </option>
              ))}
            </select>

            <select
              className='w-full bg-gray-700 text-white p-2.5 rounded-lg shadow-lg outline-none border border-gray-600 hover:border-gray-500 transition-colors'
              onChange={(e) => handleDriverSelect(e.target.value)}
              value={selectedDoctor || ''}
            >
              <option value='' disabled>
                {isLoading ? 'Loading drivers...' : 'Assign a driver'}
              </option>
              {Array.isArray(drivers) &&
                drivers.map(
                  (driverData: { driverId: string; driverName: string }) => (
                    <option
                      key={driverData.driverId}
                      value={driverData.driverId}
                    >
                      {driverData.driverName}
                    </option>
                  )
                )}
            </select>

            <select
              className='w-full bg-gray-700 text-white p-2.5 rounded-lg shadow-lg outline-none border border-gray-600 hover:border-gray-500 transition-colors'
              onChange={(e) => handleHospitalSelect(e.target.value)}
              value={selectedHospital || ''}
              onClick={() => {
                if (!hospitals?.length) {
                  fetchNearbyHospitals();
                }
              }}
            >
              <option value='' disabled>
                {loadingHospitals ? 'Loading hospitals...' : 'Nearby hospitals'}
              </option>
<<<<<<< HEAD
              {Array.isArray(hospitals) &&
                hospitals.map((hospital) => (
                  <option key={hospital.hospitalId} value={hospital.hospitalId}>
                    {hospital.hospitalName}
                  </option>
                ))}
=======
              {Array.isArray(hospitals) && hospitals.map((hospital) => (
                <option key={hospital.hospitalId} value={hospital.hospitalId}>
                  {hospital.hospitalName}
                </option>
              ))}
>>>>>>> db52837 (new change)
            </select>
          </div>
        </div>
        {isConnected && (
          <div className='fixed bottom-0 left-0 right-0 flex items-center justify-center gap-6 py-6 px-8 bg-[#21242c]/90 backdrop-blur-sm border-t border-white/10'>
            <div className='flex items-center gap-4'>
              <button
                className='flex items-center justify-center w-12 h-12 bg-white hover:bg-gray-600/50 border border-white/10 rounded-full transition-all duration-200'
                onClick={() => setMic((a) => !a)}
              >
                <Mic className={`w-5 h-5 ${!micOn ? 'opacity-40' : ''}`} />
              </button>
              <button
                className='flex items-center justify-center w-12 h-12 bg-white hover:bg-gray-600/50 border border-white/10 rounded-full transition-all duration-200'
                onClick={() => setCamera((a) => !a)}
              >
                <Video className={`w-5 h-5 ${!cameraOn ? 'opacity-40' : ''}`} />
              </button>
            </div>
            
            {calling && (
              <button
                className='flex items-center justify-center px-8 py-3 bg-red-600 hover:bg-red-700 rounded-full text-white font-medium transition-all duration-200'
                onClick={handleEndCall}
              >
                End Call
              </button>
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default CallPage;
