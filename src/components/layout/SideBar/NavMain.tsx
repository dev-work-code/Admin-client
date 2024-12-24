import {
    Collapsible,
  } from "@/components/ui/collapsible";
  import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar";
  import { Link } from "react-router-dom";
  import { Separator } from "@/components/ui/separator"; // Import Separator from shadcn
  import { useLocation } from "react-router-dom"; // Import useLocation to get the current page URL
  import React from "react";
  
  export function NavMain({
    items,
  }: {
    items: {
      title: string;
      url: string;
      icon?: string; // Image path
      isActive?: boolean;
    }[];
  }) {
    const location = useLocation(); // Get the current page URL
  
    return (
      <SidebarGroup className="overflow-hidden">
        <SidebarMenu>
          {items.map((item, index) => {
            const isActivePage = location.pathname === item.url; // Check if the current page matches the item URL
  
            return (
              <React.Fragment key={item.title}>
                <Collapsible
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem className="relative pl-0 "> {/* Remove padding from the left */}
                    <Link to={item.url}>
                      <SidebarMenuButton
  
                        tooltip={item.title}
                        className={`gap-4 ${isActivePage
                          ? "bg-gradient-to-r from-white/30 via-[#013DC0]/20 to-transparent text-white border-b-6 border-[#235EDE] h-[57px] w-96"
                          : "hover:bg-[#013DC0] hover:text-white"
                          }`} // Apply active or hover styles based on the active page
                      >
                        {item.icon && (
                          <img
                            src={item.icon}
                            alt={item.title}
                            className="w-[21px] h-[21px]" // Set width and height to 21px
                          />
                        )}
                        <span className="font-normal text-base text-white">{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
  
                    {/* Active Indicator */}
                    {/* {isActivePage && (
                      <span
                        className="absolute top-1/2 transform -translate-y-1/2 bg-white w-[6px] h-[57px] left-0"
                        style={{
                          borderRadius: "4px 0 0 4px", // Rounded corners on the left side
                        }}
                      />
                    )} */}
                  </SidebarMenuItem>
                </Collapsible>
  
                {/* Add separator after each item except the last one */}
                {index !== items.length - 1 && (
                  <Separator className="my-2 left-5 w-[185px] bg-[#235EDE]" />
                )}
              </React.Fragment>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    );
  }