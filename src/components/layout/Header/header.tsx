
const Header = () => {
  return (
    <header className="flex items-center justify-between h-28 px-8 border-b w-full">
      <div className="items-center">
        {/* <SidebarTrigger /> */}
        <p className="text-[#000000] font-normal text-2xl">Admin</p>
      </div>
      <div className="flex items-center gap-4 bg-blue-100  rounded-[50px_16px_16px_50px]">
        {/* Circle with "R" and Border */}
        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white text-[#013DC0]  flex items-center justify-center text-2xl font-semibold border-[1.5px] border-[#013DC0]">
          R
        </div>
        {/* Text and Role with Background Color */}
        <div className="flex flex-col p-1 w-32">
          <h2 className="text-sm font-normal text-gray-900">Rahul Prasad</h2>
          <p className="text-[#013DC0] text-xs">Admin</p>
        </div>
      </div>
    </header>
  );
};

export default Header;

