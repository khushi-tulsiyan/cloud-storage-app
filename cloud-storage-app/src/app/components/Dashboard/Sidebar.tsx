import React from "react";

const Sidebar = ({ setActiveApp }: { setActiveApp: (app: string) => void }) => {
  return (
    <div className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold">iCloud</h2>
      <ul>
        <li
          className="py-2 cursor-pointer hover:bg-gray-100"
          onClick={() => setActiveApp("Drive")}
        >
          Drive
        </li>
        <li
          className="py-2 cursor-pointer hover:bg-gray-100"
          onClick={() => setActiveApp("Photos")}
        >
          Photos
        </li>
        <li
          className="py-2 cursor-pointer hover:bg-gray-100"
          onClick={() => setActiveApp("Notes")}
        >
          Notes
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
