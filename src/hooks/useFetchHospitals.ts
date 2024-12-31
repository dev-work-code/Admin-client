import { useState } from 'react';
import api from '@/utils/api';

const useFetchHospitals = (selectedDepartments: string[]) => {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchHospitals = async () => {
        if (selectedDepartments.length === 0) return;

        setLoading(true);
        try {
            const response = await api.get('/admin/get-available-hospitals', {
                params: { requiredServices: selectedDepartments.join(',') },
            });
            setHospitals(response.data.data.hospitals || []);
        } catch (error) {
            console.error('Error fetching hospitals:', error);
        } finally {
            setLoading(false);
        }
    };

    return { hospitals, loading, fetchHospitals };
};

export default useFetchHospitals;
