import { LogOut } from "lucide-react";
import kebbiSeal from "@/assets/kebbi-seal.jpg";
import kebbiMap from "@/assets/kebbi-map.jpg";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-primary border-b-[3px] border-accent">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <img src={kebbiSeal} alt="Kebbi State Seal" className="w-[52px] h-[52px] rounded-full border-2 border-accent object-cover" />
        </div>
        <div className="text-center flex-1 px-4">
          <h1 className="text-primary-foreground font-display font-bold text-lg md:text-xl tracking-tight">EduMap Kebbi</h1>
          <p className="text-accent text-xs md:text-sm font-display">Teacher Deployment &amp; Gap Intelligence — Kebbi State</p>
        </div>
        <div className="flex items-center gap-3">
          <img src={kebbiMap} alt="Kebbi State Map" className="w-[52px] h-[52px] rounded-md border-2 border-accent object-cover" />
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
