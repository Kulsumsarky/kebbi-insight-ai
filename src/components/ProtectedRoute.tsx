import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const CONTACT_EMAIL = "hello@edumap.com.ng";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, role, loading, roleLoading, signOut } = useAuth();

  if (loading || (user && roleLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  // Signed in but not yet approved: no role has been assigned to this account.
  if (!role) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-background px-6 text-center">
        <h1 className="font-display font-bold text-2xl text-foreground">Awaiting approval</h1>
        <p className="text-muted-foreground font-body max-w-md">
          Your account has been created but has not been approved yet. Access is for authorised officials only.
          To request approval, email {CONTACT_EMAIL}.
        </p>
        <Button onClick={signOut} variant="outline">Sign out</Button>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
