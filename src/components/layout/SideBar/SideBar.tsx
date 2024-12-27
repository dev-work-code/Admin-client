import * as React from "react";
import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar";
import { NavMain } from "./NavMain";
import Logo from "@/assets/Liv PrivateLimited Transprent 1.svg";
import dashBoardIcon from "@/assets/ic_Dashboard.svg";
import RoleIcon from "@/assets/Role.svg";
import DoctorIcon from "@/assets/Doctor.svg";
import LiveCasesIcon from "@/assets/Live-Case.svg"
import ProfileIcon from "@/assets/Profile.svg"
import { SidebarHeader } from "./SidebarHeader";
import HospitalIcon from "@/assets/HospitalIcon.svg"
import AmbulanceIcon from "@/assets/Ambulance.svg"
import MapIcon from "@/assets/Maps.svg"
const data = {
  user: {
    name: "Liv Med",
    email: "livmed@gmail.com",
    avatar: "https://ui.shadcn.com/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: dashBoardIcon,
    },
    {
      title: "Live Cases",
      url: "/livecases",
      icon: LiveCasesIcon,
    },
    {
      title: "Hospitals",
      url: "/hospitals",
      icon: HospitalIcon,
    },
    {
      title: "Doctors",
      url: "/doctor",
      icon: DoctorIcon,
    },
    {
      title: "Ambulance",
      url: "/ambulance",
      icon: AmbulanceIcon,
    },
    {
      title: "Maps",
      url: "/maps",
      icon: MapIcon,
    },
    {
      title: "Roles",
      url: "/role",
      icon: RoleIcon,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: ProfileIcon,
    },
  ],
  navMain2: [
    {
      title: "Logo",
      url: "/",
      icon: Logo,
      isActive: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader items={data.navMain2} />
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}