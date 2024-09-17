import { trpc } from './apps/web/src/utils/trpc';

export default function UserProfile() {
  const { data: user } = trpc.user.getById.useQuery({ id: 'user-123' });

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
