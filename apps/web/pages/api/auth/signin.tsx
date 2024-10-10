import React from "react";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl mb-4">Sign In</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => signIn("passkey")}
        >
          Sign in with Passkey
        </button>
      </div>
    </div>
  );
};

export default SignIn;
