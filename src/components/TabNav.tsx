import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const tabs = ["Overview", "Teacher Density", "Teachers", "Schools", "Academic Health", "AI Predictions"];

interface TabNavProps {
  activeTab: number;
  onTabChange: (i: number) => void;
}

const TabNav = ({ activeTab, onTabChange }: TabNavProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleTabClick = (i: number) => {
    onTabChange(i);
    setMobileOpen(false);
  };

  return (
    <nav className="bg-secondary sticky top-0 z-40">
      <div className="container">
        {/* Mobile: hamburger + current tab label */}
        {isMobile ? (
          <div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-full flex items-center justify-between px-2 py-3 text-secondary-foreground"
            >
              <span className="text-sm font-display font-semibold text-accent">{tabs[activeTab]}</span>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            {mobileOpen && (
              <div className="pb-2 space-y-1 animate-fade-in">
                {tabs.map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => handleTabClick(i)}
                    className={`w-full text-left px-4 py-2.5 text-sm font-display font-semibold rounded transition-colors ${
                      activeTab === i
                        ? "bg-primary/30 text-accent"
                        : "text-secondary-foreground hover:bg-primary/20 hover:text-primary-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Desktop: horizontal tabs */
          <div className="flex min-w-max">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => onTabChange(i)}
                className={`px-4 py-3 text-sm font-display font-semibold whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === i
                    ? "text-accent border-accent"
                    : "text-secondary-foreground border-transparent hover:text-primary-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default TabNav;
