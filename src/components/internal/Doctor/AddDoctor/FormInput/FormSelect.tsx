import { Label } from "@/components/ui/label";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import FormError from "../FormErrors/FormError";

interface FormSelectProps {
  id: string;
  label: string;
  options: string[];
  register: UseFormRegister<any>; // Adjust type here
  error?: { message?: string };
}

const FormSelect: React.FC<FormSelectProps> = ({ id, label, options, register, error }) => {
  return (
    <div className="mb-4">
      <Label htmlFor={id} className="block mb-1">
        {label}
      </Label>
      <select
        id={id}
        {...register(id, { required: `${label} is required` })}  // Correct way to use register
        className="border-none p-2.5 rounded-lg bg-[#E9F4FF] w-full text-sm"
        aria-invalid={!!error}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <FormError message={error.message} />}
    </div>
  );
};

export default FormSelect;
