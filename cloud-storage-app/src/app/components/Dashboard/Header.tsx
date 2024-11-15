import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">iCloud</div>
      <div className="flex items-center space-x-2">
        <img
          src="/profile.jpg" // Replace with the actual user profile image URL
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
        <button className="bg-blue-600 px-3 py-1 rounded">Logout</button>
      </div>
    </header>
  );
};

export default Header;
