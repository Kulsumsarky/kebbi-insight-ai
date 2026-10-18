import { useState } from "react";
import Header from "@/components/Header";
import RoleSelector from "@/components/RoleSelector";
import TabNav from "@/components/TabNav";
import OverviewTab from "@/components/tabs/OverviewTab";
import TeacherGapsTab from "@/components/tabs/TeacherGapsTab";
import DeploymentTab from "@/components/tabs/DeploymentTab";
import SchoolsTab from "@/components/tabs/SchoolsTab";
import AIPredictionsTab from "@/components/tabs/AIPredictionsTab";
import FeedbackPrompt from "@/components/FeedbackPrompt";
import { PUBLIC_DEMO_MODE } from "@/config";
import { DATA_SOURCE, PARTIAL_DATA_NOTE } from "@/data/kebbiData";

const allTabs = [
  { label: "Overview", Component: OverviewTab, hiddenInDemo: false },
  { label: "Teacher Gaps", Component: TeacherGapsTab, hiddenInDemo: false },
  { label: "Deployment", Component: DeploymentTab, hiddenInDemo: false },
  // Hidden during the public feedback window: the directory is illustrative until real school records arrive.
  { label: "Schools", Component: SchoolsTab, hiddenInDemo: true },
  { label: "Recommendations", Component: AIPredictionsTab, hiddenInDemo: false },
];
const visibleTabs = PUBLIC_DEMO_MODE ? allTabs.filter((t) => !t.hiddenInDemo) : allTabs;

const Index = () => {
  const [activeTab, setActiveTab] = useState(0);
  const ActiveComponent = visibleTabs[activeTab].Component;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      {PUBLIC_DEMO_MODE && <FeedbackPrompt />}
      <RoleSelector />
      <TabNav labels={visibleTabs.map((t) => t.label)} activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container py-6 flex-1">
        <ActiveComponent />
      </main>
      <footer className="border-t border-border bg-card">
        <div className="container py-4 space-y-1">
          <p className="text-xs text-muted-foreground font-body">{DATA_SOURCE}</p>
          <p className="text-xs text-muted-foreground font-body">{PARTIAL_DATA_NOTE}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
