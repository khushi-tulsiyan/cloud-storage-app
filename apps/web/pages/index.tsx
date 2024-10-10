import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import UserProfile from "../components/UserProfile";
import Photos from "../components/Photos";
import Drive from "../components/Drive";
import Notes from "../components/Notes";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl">Personal Cloud Storage</h1>
      </header>
      <main className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold">User Profile</h2>
            <UserProfile />
          </div>
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold">Photos</h2>
            <Photos />
          </div>
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold">Drive</h2>
            <Drive />
          </div>
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold">Notes</h2>
            <Notes />
          </div>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};
