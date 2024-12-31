import { AlertDialog, AlertDialogContent, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import OrganizationForm from "../ProfileForm/ProfileDataForm";

interface AlertDialogComponentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlertDialogComponent: React.FC<AlertDialogComponentProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-5xl rounded-3xl">
        <button
          className="absolute top-4 right-4 bg-[#E9F4FF] rounded-full text-[#013DC0] p-2"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-6 w-6" />
        </button>
        <AlertDialogHeader className="text-2xl font-medium mb-6 ml-6 text-[#003CBF]">Add Doctor</AlertDialogHeader>
        <div className="p-4">
          <OrganizationForm />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogComponent;