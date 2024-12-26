import { Card } from "@/components/ui/card";
import Logo from "@/assets/Liv PrivateLimited Transprent 1.svg";
import HospitalForm from "./hospitalRegister";
import BackGroundLogo from "@/assets/BackgroundImage.svg";

function OTPComponent() {
    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${BackGroundLogo})` }}
        >
            <Card className="bg-white rounded-sm md:rounded-2xl lg:rounded-3xl dark:bg-background w-[1129px] shadow-lg">
                <div className="flex flex-col items-center">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="w-[260px] h-[200px]"
                        loading="lazy"
                    />
                    <HospitalForm />
                </div>
            </Card>
        </div>
    );
}

export default OTPComponent;
