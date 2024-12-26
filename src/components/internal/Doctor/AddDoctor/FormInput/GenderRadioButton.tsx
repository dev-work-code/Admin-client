import React from "react";
import { useController, Control } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // ShadCN imports
import FormError from "../FormErrors/FormError";

interface GenderRadioButtonProps {
  id: string;
  label: string;
  control: Control<any>;  // Control for managing field values
  error?: { message?: string };
}

const GenderRadioButton: React.FC<GenderRadioButtonProps> = ({
  id,
  label,
  control,
  error,
}) => {
  // UseController to manage the radio button value
  const { field } = useController({
    name: id,
    control,
    rules: { required: "Gender is required" },
  });

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-1">
        {label} <span className="text-red-500 mt-2">*</span>
      </label>
      <RadioGroup
        {...field}
        value={field.value}  // Bind the value to the form value
        onValueChange={field.onChange}  // Update form state on change
      >
        <div className="flex space-x-4">
          <div className="flex items-center">
            <RadioGroupItem
              id={`${id}-male`}
              value="male"
              className="mr-2 bg-[#E9F4FF] border-none"
            />
            <label htmlFor={`${id}-male`}>Male</label>
          </div>
          <div className="flex items-center">
            <RadioGroupItem
              id={`${id}-female`}
              value="female"
              className="mr-2 bg-[#E9F4FF] border-none"
            />
            <label htmlFor={`${id}-female`}>Female</label>
          </div>
          <div className="flex items-center">
            <RadioGroupItem
              id={`${id}-other`}
              value="other"
              className="mr-2 bg-[#E9F4FF] border-none"
            />
            <label htmlFor={`${id}-other`}>Other</label>
          </div>
        </div>
      </RadioGroup>
      {error && <FormError message={error.message} />}
    </div>
  );
};

export default GenderRadioButton;
