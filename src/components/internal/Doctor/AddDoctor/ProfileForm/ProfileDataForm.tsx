import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormInput from "../FormInput/FormInput";
import LogoInput from "../FileInput/FileInput";
import { useToast } from "@/hooks/use-toast";
import GenderRadioButton from "../FormInput/GenderRadioButton";
import api from "@/utils/api";
import FormSelect from "../FormInput/FormSelect";
import { areaSpecializations, CreateProfileFormData } from "@/components/types/types";
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB in bytes

// Custom validation function for file size
const validateFileSize = (fileList: FileList): boolean | string => {
  if (fileList.length === 0) return true; // No file, validation not required
  const file = fileList[0];
  return file.size <= MAX_FILE_SIZE || "File size must not exceed 2 MB";
};

// Main component
const CreateProfileForm: React.FC = () => {
  const { toast } = useToast(); // Toast notification handler
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  // Use React Hook Form for form management
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateProfileFormData>();

  const bloodGroups = [
    "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "RhD+", "RhD-"
  ];

  // Handle form submission
  const onSubmit: SubmitHandler<CreateProfileFormData> = async (data) => {
    setLoading(true); // Start loading state
  
    // Prepare FormData for file uploads and other fields
    const formData = new FormData();
  
    Object.entries(data).forEach(([key, value]) => {
      // Handle file fields
      if (key === "panCard" || key === "medicalLicense" || key === "aadharCard" || key === "doctorPhoto") {
        if (value instanceof FileList && value.length > 0) {
          formData.append(key, value[0]); // Append the first file
        }
      } else {
        formData.append(key, value as string); // Append other fields as strings
      }
    });
  
    // Log the FormData key-value pairs
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    try {
      // Post the form data to the API
      const response = await api.post("/admin/registerDoctor", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      toast({
        description: response.data.message || 'Doctor profile created successfully!',
        variant: 'default',
        className: "bg-green-500 text-white",
      });
  
      console.log('Success:', response.data);
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Profile creation failed!';
      toast({
        description: errorMessage,
        variant: 'destructive',
      });
  
      console.error('Error:', error);
    } finally {
      setLoading(false); // End loading state
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} aria-label="Create Profile Form" className="max-w-5xl mx-auto space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-12 gap-y-4">
        <FormInput
          id="doctorName"
          label="Name"
          type="text"
          register={register("doctorName", {
            required: "Name is required",
            validate: (value) => value.trim() !== "" || "Name cannot be empty or just spaces",
          })}
          error={errors.doctorName}
        />
        <FormInput
          id="doctorEmail"
          label="Email"
          type="email"
          register={register("doctorEmail", {
            required: "email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address (e.g., name@example.com)",
            },
          })}
          error={errors.doctorEmail}
        />
        <GenderRadioButton
          id="doctorGender"
          label="Gender"
          control={control}
          error={errors.doctorGender}
        />
        <FormInput
          id="phoneNumber"
          label="Phone Number"
          type="text"
          register={register("doctorMobileNumber", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Please enter a valid 10-digit phone number",
            },
          })}
          error={errors.doctorMobileNumber}
        />
        <FormInput
          id="doctorDOB"
          label="Date of Birth"
          type="date"
          register={register("doctorDOB", {
            required: "Date of Birth is required",
          })}
          error={errors.doctorDOB}
        />
        <FormSelect
          id="bloodType"
          label="Blood Group"
          options={bloodGroups}
          register={register}
          error={errors.bloodType}
        />
        <FormInput
          id="doctorQualification"
          label="Qualification"
          type="text"
          register={register("doctorQualification", {
            required: "Qualification is required",
          })}
          error={errors.doctorQualification}
        />
        <FormInput
          id="doctorAdditionalQualification"
          label="Additional Qualifications"
          type="text"
          register={register("doctorAdditionalQualification")}
          error={errors.doctorAdditionalQualification}
        />
        <FormInput
          id="doctorAddress"
          label="Address"
          type="text"
          register={register("doctorAddress", {
            required: "Address is required",
          })}
          error={errors.doctorAddress}
        />
        <FormInput
          id="practiceLocation"
          label="Practicing Hospital"
          type="text"
          register={register("practiceLocation", {
            required: "Practicing Hospital is required",
          })}
          error={errors.practiceLocation}
        />
        <FormSelect
          id="areaOfSpecialization"
          label="Area of Specialization"
          options={areaSpecializations}
          register={register}
          error={errors.areaOfSpecialization}
        />
        <FormInput
          id="workplace"
          label="Work Location"
          type="text"
          register={register("workplace", {
            required: "Work Location is required",
          })}
          error={errors.workplace}
        />
        <FormInput
          id="experience"
          label="Experience"
          type="text"
          register={register("experience", {
            required: "Experience is required",
          })}
          error={errors.experience}
        />
        <FormInput
          id="credentials"
          label="Credentials"
          type="text"
          register={register("credentials", {
            required: "Credentials are required",
          })}
          error={errors.credentials}
        />
        <LogoInput
          id="medicalLicense"
          label="MedicalLicense"
          register={register("medicalLicense", {
            required: "Medical License file is required",
            validate: (value) => validateFileSize(value) || true,
          })}
          error={errors.medicalLicense}
        />
        <LogoInput
          id="panCard"
          label="PanCard"
          register={register("panCard", {
            required: "Pan Card file is required",
            validate: (value) => validateFileSize(value) || true,
          })}
          error={errors.panCard}
        />
        <LogoInput
          id="aadhaarCardFile"
          label="Aadhaar Card"
          register={register("aadharCard", {
            required: "Aadhaar card is required",
            validate: (value) => validateFileSize(value) || true,
          })}
          error={errors.aadharCard}
        />
        <LogoInput
          id="doctorPhoto"
          label="Doctor Photo"
          register={register("doctorPhoto", {
            required: "DoctorPhoto is required",
            validate: (value) => validateFileSize(value) || true,
          })}
          error={errors.doctorPhoto}
        />
      </div>

      <div className="flex items-center justify-center">
        <Button
          type="submit"
          disabled={loading}
          variant="primary"
          className="w-96 h-10 flex items-center justify-center bg-[#013DC0] text-white"
        >
          {loading ? "Adding Doctor..." : "Add Doctor"}
        </Button>
      </div>
    </form>
  );
};

export default CreateProfileForm;
