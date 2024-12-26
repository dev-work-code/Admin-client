import { Card, CardHeader } from "@/components/ui/card";
import Logo from "@/assets/Liv PrivateLimited Transprent 1.svg";
import BackGroundLogo from "@/assets/BackgroundImage.svg";
import LoginForm from "./loginForm";

const LoginComponent = () => {
  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${BackGroundLogo})` }}
    >
      <Card className="bg-white rounded-sm md:rounded-2xl lg:rounded-3xl dark:bg-background w-[539px] h-[564px] shadow-lg">
        <div className="mx-auto flex flex-col items-center">
          <img
            src={Logo}
            alt="logo"
            className="w-[260px] h-[200px]"
            loading="lazy"
          />
          <div className="-mt-8">
            <CardHeader className="block font-Inter text-xl font-medium text-[#013DC0]">
              Login
            </CardHeader>
            <LoginForm />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginComponent;
