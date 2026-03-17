import { useState, useMemo } from "react";
import { schoolsData, lgaData, totalSchools } from "@/data/kebbiData";
import ExportButton from "@/components/ExportButton";
import { exportToCSV } from "@/lib/csvExport";

const allLGAs = lgaData.map(l => l.name);

const SchoolsTab = () => {
  const [lgaFilter, setLgaFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [locFilter, setLocFilter] = useState("");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return schoolsData.filter(s => {
      if (lgaFilter && s.lga !== lgaFilter) return false;
      if (typeFilter && s.type !== typeFilter) return false;
      if (locFilter && s.location !== locFilter) return false;
      if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [lgaFilter, typeFilter, locFilter, search]);

  const reset = () => { setLgaFilter(""); setTypeFilter(""); setLocFilter(""); setSearch(""); };
  const specialNeeds = schoolsData.filter(s => s.type === "Special Needs").length;
  const inclusive = schoolsData.filter(s => s.type === "Inclusive").length;

  const typeBadge = (type: string) => {
    if (type === "Mainstream") return "bg-kebbi-light text-secondary";
    if (type === "Special Needs") return "bg-accent/20 text-accent";
    return "bg-destructive/10 text-destructive";
  };

  const handleExport = () => {
    exportToCSV("kebbi_schools",
      ["School Name", "LGA", "Type", "Location", "Students", "Disabled", "Subjects Offered"],
      filtered.map(s => [s.name, s.lga, s.type, s.location, s.students, s.disabled, s.subjects])
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-md p-4 shadow-sm border-l-4 border-l-secondary transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
          <p className="text-xs text-muted-foreground font-body uppercase tracking-wide">Total Schools</p>
          <p className="text-2xl font-display font-bold text-card-foreground">{totalSchools}</p>
        </div>
        <div className="bg-card rounded-md p-4 shadow-sm border-l-4 border-l-accent transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
          <p className="text-xs text-muted-foreground font-body uppercase tracking-wide">Special Needs Only</p>
          <p className="text-2xl font-display font-bold text-card-foreground">{specialNeeds}</p>
        </div>
        <div className="bg-card rounded-md p-4 shadow-sm border-l-4 border-l-destructive transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
          <p className="text-xs text-muted-foreground font-body uppercase tracking-wide">Inclusive</p>
          <p className="text-2xl font-display font-bold text-card-foreground">{inclusive}</p>
        </div>
      </div>

      <div className="bg-card rounded-md p-4 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <select value={lgaFilter} onChange={e => setLgaFilter(e.target.value)} className="border border-border rounded-md px-2 py-1.5 text-sm bg-card font-body focus:ring-2 focus:ring-accent focus:outline-none">
            <option value="">All LGAs</option>
            {allLGAs.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="border border-border rounded-md px-2 py-1.5 text-sm bg-card font-body focus:ring-2 focus:ring-accent focus:outline-none">
            <option value="">All Types</option>
            <option value="Mainstream">Mainstream</option>
            <option value="Special Needs">Special Needs</option>
            <option value="Inclusive">Inclusive</option>
          </select>
          <select value={locFilter} onChange={e => setLocFilter(e.target.value)} className="border border-border rounded-md px-2 py-1.5 text-sm bg-card font-body focus:ring-2 focus:ring-accent focus:outline-none">
            <option value="">All Locations</option>
            <option value="Urban">Urban</option>
            <option value="Rural">Rural</option>
          </select>
          <input
            type="text"
            placeholder="Search school..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-border rounded-md px-2 py-1.5 text-sm bg-card font-body focus:ring-2 focus:ring-accent focus:outline-none"
          />
          <button onClick={reset} className="bg-secondary text-secondary-foreground rounded-md px-3 py-1.5 text-sm font-display font-semibold hover:opacity-90">
            Reset
          </button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-muted-foreground font-body">{filtered.length} record(s) found</p>
          <ExportButton onClick={handleExport} label="Export Schools" />
        </div>
      </div>

      <div className="bg-card rounded-md shadow-sm overflow-x-auto">
        {filtered.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground font-body">No records match your filters.</p>
            <button onClick={reset} className="mt-3 bg-secondary text-secondary-foreground rounded-md px-4 py-2 text-sm font-display font-semibold hover:opacity-90">Reset Filters</button>
          </div>
        ) : (
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="bg-muted text-left">
                <th className="px-4 py-2 font-display font-semibold">School Name</th>
                <th className="px-4 py-2 font-display font-semibold">LGA</th>
                <th className="px-4 py-2 font-display font-semibold">Type</th>
                <th className="px-4 py-2 font-display font-semibold">Location</th>
                <th className="px-4 py-2 font-display font-semibold">Students</th>
                <th className="px-4 py-2 font-display font-semibold">Disabled</th>
                <th className="px-4 py-2 font-display font-semibold">Subjects</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s.name} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                  <td className="px-4 py-2 font-semibold">{s.name}</td>
                  <td className="px-4 py-2">{s.lga}</td>
                  <td className="px-4 py-2"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${typeBadge(s.type)}`}>{s.type}</span></td>
                  <td className="px-4 py-2">{s.location}</td>
                  <td className="px-4 py-2">{s.students.toLocaleString()}</td>
                  <td className="px-4 py-2">{s.disabled}</td>
                  <td className="px-4 py-2 text-xs">{s.subjects}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SchoolsTab;
