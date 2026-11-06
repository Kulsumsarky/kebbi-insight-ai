import { LogOut } from "lucide-react";
import edumapLogo from "@/assets/edumap-logo-reversed.png";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-primary border-b-[3px] border-accent">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <img src={edumapLogo} alt="EduMap" className="h-10 md:h-12 w-auto" />
        </div>
        <div className="text-center flex-1 px-4">
          <p className="text-accent text-xs md:text-sm font-display">Teacher Deployment &amp; Gap Intelligence · Kebbi State</p>
        </div>
        <div className="flex items-center gap-3">
          {user && (
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="text-accent hover:text-primary-foreground hover:bg-secondary"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4 md:mr-1.5" />
              <span className="hidden md:inline">Sign out</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
