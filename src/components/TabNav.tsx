const tabs = ["Overview", "Teacher Density", "Teachers", "Schools", "Academic Health", "AI Predictions"];

interface TabNavProps {
  activeTab: number;
  onTabChange: (i: number) => void;
}

const TabNav = ({ activeTab, onTabChange }: TabNavProps) => {
  return (
    <nav className="bg-secondary">
      <div className="container overflow-x-auto">
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
      </div>
    </nav>
  );
};

export default TabNav;
