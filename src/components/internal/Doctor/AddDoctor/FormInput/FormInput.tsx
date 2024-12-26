import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import FormError from "../FormErrors/FormError";

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  register: ReturnType<UseFormRegister<any>>;
  error?: { message?: string };
  placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({ id, label, type, register, error, placeholder }) => {
  return (
    <div className="mb-4">
      <Label htmlFor={id} className="block mb-1">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        {...register}
        placeholder={placeholder}
        className="border-none  bg-[#E9F4FF] " // Customize styles as needed
        aria-invalid={!!error}
      />
      {error && <FormError message={error.message} />}
    </div>
  );
};

export default FormInput;
