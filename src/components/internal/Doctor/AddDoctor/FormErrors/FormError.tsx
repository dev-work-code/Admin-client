import React from "react";

interface FormErrorProps {
  message?: string;
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  return <span role="alert" className="text-red-500 text-xs">{message}</span>;
};

export default FormError;
