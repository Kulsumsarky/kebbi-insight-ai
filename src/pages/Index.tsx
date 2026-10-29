import { useState } from "react";
import Header from "@/components/Header";
import RoleSelector from "@/components/RoleSelector";
import TabNav from "@/components/TabNav";
import OverviewTab from "@/components/tabs/OverviewTab";
import TeacherGapsTab from "@/components/tabs/TeacherGapsTab";
import DeploymentTab from "@/components/tabs/DeploymentTab";
import HeatMapTab from "@/components/tabs/HeatMapTab";
import SchoolsTab from "@/components/tabs/SchoolsTab";
import AIPredictionsTab from "@/components/tabs/AIPredictionsTab";
import FeedbackPrompt from "@/components/FeedbackPrompt";
import { PUBLIC_DEMO_MODE } from "@/config";
import { PARTIAL_DATA_NOTE } from "@/data/kebbiData";
import YearSelect from "@/components/YearSelect";
import { YearProvider, useYearData } from "@/hooks/useYear";

const allTabs = [
  { label: "Overview", Component: OverviewTab, hiddenInDemo: false },
  { label: "Heat Map", Component: HeatMapTab, hiddenInDemo: false },
  { label: "Teacher Gaps", Component: TeacherGapsTab, hiddenInDemo: false },
  { label: "Deployment", Component: DeploymentTab, hiddenInDemo: false },
  // Hidden during the public feedback window: the directory is illustrative until real school records arrive.
  { label: "Schools", Component: SchoolsTab, hiddenInDemo: true },
  { label: "Recommendations", Component: AIPredictionsTab, hiddenInDemo: false },
];
const visibleTabs = PUBLIC_DEMO_MODE ? allTabs.filter((t) => !t.hiddenInDemo) : allTabs;

const DashboardPage = () => {
  const { source } = useYearData();
  const [activeTab, setActiveTab] = useState(0);
  const ActiveComponent = visibleTabs[activeTab].Component;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <YearSelect />
      {PUBLIC_DEMO_MODE && <FeedbackPrompt />}
      <RoleSelector />
      <TabNav labels={visibleTabs.map((t) => t.label)} activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container py-6 flex-1">
        <ActiveComponent />
      </main>
      <footer className="border-t border-border bg-card">
        <div className="container py-4 space-y-1">
          <p className="text-xs text-muted-foreground font-body">{source}</p>
          <p className="text-xs text-muted-foreground font-body">{PARTIAL_DATA_NOTE}</p>
          <div className="pt-3">
            <a
              href="mailto:hello@edumap.com.ng?subject=EduMap%20wrong%20figure"
              className="inline-flex items-center min-h-[44px] rounded-md border-2 border-primary px-4 text-sm font-display font-semibold text-primary hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Report a wrong figure
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Index = () => (
  <YearProvider>
    <DashboardPage />
  </YearProvider>
);

export default Index;
