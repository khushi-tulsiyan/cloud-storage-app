import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import useFirebaseAuth from "../hooks/useFirebaseAuth";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useFirebaseAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/signin");
    }
  }, [user, router]);

  return user ? <>{children}</> : null;
}
