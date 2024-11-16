"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "./components/Dashboard/Sidebar"; 
import Header from "./components/Dashboard/Header";
import Drive from "./components/Dashboard/DriveSection"; 
import Photos from "./components/Dashboard/PhotosSection"; 

const Page = () => {
  const [activeApp, setActiveApp] = useState("Drive");
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (activeApp === "Drive") {
      fetchFiles();
    }
  }, [activeApp]);

  const fetchFiles = async () => {
    try {
      const response = await fetch("/api/drive"); 
      const data = await response.json();
      setFiles(data.files || []);
    } catch (error) {
      console.error("Failed to fetch files:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar setActiveApp={setActiveApp} />
      <div className="flex-1 bg-gray-50">
        <Header />
        <main className="container mx-auto p-4">
          {activeApp === "Drive" && <Drive files={files} loading={loading} />}
          {activeApp === "Photos" && <Photos />}
        </main>
      </div>
    </div>
  );
};

export default Page;
