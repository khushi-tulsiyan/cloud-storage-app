import { auth } from "../../auth";
import { signOut } from "firebase/auth";


export default function UserProfile() {
  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div>
      <p>User Profile</p>
      <button onClick={handleSignOut}> Sign Out </button>
    </div>
  );
}
