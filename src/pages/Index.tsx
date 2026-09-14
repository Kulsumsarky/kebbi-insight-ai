import { useState } from "react";
import Header from "@/components/Header";
import RoleSelector from "@/components/RoleSelector";
import TabNav from "@/components/TabNav";
import OverviewTab from "@/components/tabs/OverviewTab";
import TeacherDensityTab from "@/components/tabs/TeacherDensityTab";
import TeachersTab from "@/components/tabs/TeachersTab";
import SchoolsTab from "@/components/tabs/SchoolsTab";
import AcademicHealthTab from "@/components/tabs/AcademicHealthTab";
import AIPredictionsTab from "@/components/tabs/AIPredictionsTab";
import { DATA_SOURCE, PARTIAL_DATA_NOTE } from "@/data/kebbiData";

// Order must match the tab labels in TabNav.
const tabComponents = [AIPredictionsTab, AcademicHealthTab, OverviewTab, TeacherDensityTab, TeachersTab, SchoolsTab];

const Index = () => {
  const [activeTab, setActiveTab] = useState(0);
  const ActiveComponent = tabComponents[activeTab];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <RoleSelector />
      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
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
