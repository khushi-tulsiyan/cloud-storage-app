import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl">Personal Cloud Storage</h1>
      </header>
      <main className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold">User Profile</h2>
            {/* User profile component will go here */}
          </div>
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold">Photos</h2>
            {/* Photos component will go here */}
          </div>
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold">Drive</h2>
            {/* Drive component will go here */}
          </div>
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold">Notes</h2>
            {/* Notes component will go here */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
