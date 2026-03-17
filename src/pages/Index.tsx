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

const tabComponents = [OverviewTab, TeacherDensityTab, TeachersTab, SchoolsTab, AcademicHealthTab, AIPredictionsTab];

const Index = () => {
  const [activeTab, setActiveTab] = useState(0);
  const ActiveComponent = tabComponents[activeTab];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <RoleSelector />
      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container py-6">
        <ActiveComponent />
      </main>
    </div>
  );
};

export default Index;
