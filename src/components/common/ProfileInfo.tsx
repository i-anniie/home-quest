
import { getInitials } from "@/utils/helper";
import React, { useState } from "react";

interface ProfileInfoProps {
  handleLogOut: () => void;
  fullName: string
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  fullName,
  handleLogOut,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const showDropdown = () => setIsDropdownVisible(true);
  const hideDropdown = () => setIsDropdownVisible(false);

  const logOut = async () => {
    handleLogOut();
  };

  return (
    <section
      className="flex items-center gap-4 relative"
      onMouseEnter={showDropdown}
      onMouseLeave={hideDropdown}
    >
      <h1 className="w-12 h-12 flex items-center justify-center rounded-full text-white bg-gray-700 cursor-pointer mb-2">
        {getInitials(`${fullName}` || "User")}
      </h1>
      {isDropdownVisible && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full bg-white border rounded shadow-lg py-2 w-32">
          <p className="text-sm font-medium px-4 py-2 uppercase">
            {`${fullName}` || "user"}
          </p>
          <button
            onClick={logOut}
            className="text-sm text-blue-700 uppercase font-bold px-4 py-2 w-full text-left"
          >
            Log Out
          </button>
        </div>
      )}
    </section>
  );
};

export default ProfileInfo;
