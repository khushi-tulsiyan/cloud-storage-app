import React, { useEffect, useState } from 'react';
import { trpc } from '../utils/trpc';

const UserProfile = () => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Fetch the session user ID here (can use next-auth session)
    setUserId('your-session-user-id');
  }, []);

  const { data: user, isLoading } = trpc.getUser.useQuery({ id: userId });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h3>{user?.name}</h3>
      <p>Email: {user?.email}</p>
    </div>
  );
};

export default UserProfile;
