import React, { useEffect, useState } from 'react';
import { getAuthCookies } from '@/utils/cookies'; // Import your utility
import { SidebarTrigger } from '@/components/ui/sidebar';

const Header: React.FC = () => {
  const [user, setUser] = useState<{ adminName?: string; role?: string }>({});

  useEffect(() => {
    // Retrieve the authentication data from cookies when the component mounts
    const authData = getAuthCookies();
    if (authData) {
      setUser({
        adminName: authData.adminName,
        role: authData.role || undefined, // Convert null to undefined
      });
    }
  }, []);

  return (
    <header className="flex items-center justify-between h-28 px-8 border-b w-full">
      <div className="items-center">
        {/* <p className="text-[#000000] font-normal text-2xl">{user.role || 'No Role'}</p> */}
        <SidebarTrigger />
      </div>
      <div className="flex items-center gap-4 bg-blue-100 rounded-[50px_16px_16px_50px]">
        {/* Circle with "R" and Border */}
        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white text-[#013DC0] flex items-center justify-center text-2xl font-semibold border-[1.5px] border-[#013DC0]">
          {user.adminName?.[0]} {/* Display the first letter of adminName */}
        </div>
        {/* Text and Role with Background Color */}
        <div className="flex flex-col p-1 w-32">
          <h2 className="text-sm font-normal text-gray-900">{user.adminName || 'Guest'}</h2>
          <p className="text-[#013DC0] text-xs">{user.role || 'No Role'}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
