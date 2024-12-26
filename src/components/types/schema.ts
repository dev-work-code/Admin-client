import { z } from 'zod';

export const hospitalSchema = z.object({
    hospitalName: z.string().nonempty("Hospital Name is required"),
    hospitalLocation: z.string().nonempty("Hospital Location is required"),
    hospitalPhoneNumber: z.string().nonempty("Phone Number is required"),
    hospitalDateOfRegistration: z.string().nonempty("Date of Registration is required"),
    hospitalDMHORegistration: z.string().nonempty("DMHO Registration is required"),
    hospitalCompanyDetails: z.string().nonempty("Company Details are required"),
    hospitalCompanyPAN: z.string().nonempty("Company PAN is required"),
    hospitalOwnerDetails: z.string().nonempty("Owner Details are required"),
    hospitalServicesOffered: z.string().nonempty("Services Offered are required"),
    hospitalSpecialistServices: z.string().nonempty("Specialist Services are required"),
    hospitalNumberOfBeds: z.string().nonempty("Number of Beds is required"),
    hospitalAreasOfInterest: z.string().nonempty("Areas of Interest are required"),
    images: z.custom<FileList>((val) => val instanceof FileList && val.length > 0, {
        message: "Images are required",
    }),
    address: z.string().nonempty("Address is required"),
    latitude: z.string().nonempty("Latitude is required"),
    longitude: z.string().nonempty("Longitude is required"),
});
