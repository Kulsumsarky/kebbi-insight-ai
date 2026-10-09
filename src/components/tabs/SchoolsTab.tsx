import PilotBadge from "@/components/PilotBadge";
import { useMemo, useState } from "react";
import { Check, Info, Minus, X } from "lucide-react";
import { coreCoverageForSchool, dnemisLgaData, dnemisTotals, schoolsData, type CoreCoverageStatus } from "@/data/kebbiData";
import { Button } from "@/components/ui/button";

const allLGAs = dnemisLgaData.map(r => r.lga).sort();

const CoverageMark = ({ subject, status }: { subject: string; status: CoreCoverageStatus }) => {
  const settings = {
    qualified: { icon: Check, label: "qualified teacher present", className: "bg-secondary/15 text-secondary" },
    missing: { icon: X, label: "no qualified teacher", className: "bg-destructive/10 text-destructive" },
    unverified: { icon: Minus, label: "teacher unqualified or unverified", className: "bg-accent/20 text-accent" },
  }[status];
  const Icon = settings.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${settings.className}`} title={`${subject}: ${settings.label}`}>
      {subject}<Icon className="w-3.5 h-3.5" aria-hidden="true" /><span className="sr-only">: {settings.label}</span>
    </span>
  );
};

const SchoolsTab = () => {
  const [lgaFilter, setLgaFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [locFilter, setLocFilter] = useState("");
  const [search, setSearch] = useState("");

  const schoolRows = useMemo(() => schoolsData.map(school => ({ ...school, coverage: coreCoverageForSchool(school) })), []);
  const fullCoverage = schoolRows.filter(row => Object.values(row.coverage).every(status => status === "qualified")).length;
  const withCoreGap = schoolRows.length - fullCoverage;
  const filtered = useMemo(() => schoolRows.filter(school => {
    if (lgaFilter && school.lga !== lgaFilter) return false;
    if (typeFilter && school.type !== typeFilter) return false;
    if (locFilter && school.location !== locFilter) return false;
    if (search && !school.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [schoolRows, lgaFilter, typeFilter, locFilter, search]);

  const reset = () => { setLgaFilter(""); setTypeFilter(""); setLocFilter(""); setSearch(""); };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          ["Total Schools", dnemisTotals.schools, "All 21 LGAs · DNEMIS Annual School Census 2024", "border-l-secondary"],
          ["Schools with Full Core Coverage", fullCoverage, "Illustrative directory sample · Estimated", "border-l-accent"],
          ["Schools with at Least One Core Gap", withCoreGap, "Illustrative directory sample · Estimated", "border-l-destructive"],
        ].map(([title, value, note, border]) => (
          <div key={String(title)} className={`bg-card rounded-md p-4 shadow-sm border-l-4 ${border}`}>
            <p className="text-xs text-muted-foreground font-body uppercase tracking-wide">{title}</p>
            <p className="text-2xl font-display font-bold text-card-foreground mt-1">{Number(value).toLocaleString()}</p>
            <p className="text-xs text-muted-foreground font-body mt-1">{note}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground font-body flex items-start gap-2">
        <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
        <span>The directory is illustrative pending authorised school-level records. Core coverage is inferred from the listed staffing record and marked unverified where qualification cannot be confirmed.</span>
      </p>

      <div className="bg-card rounded-md p-4 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <select aria-label="Filter by LGA" value={lgaFilter} onChange={event => setLgaFilter(event.target.value)} className="border border-border rounded-md px-2 py-1.5 text-sm bg-card font-body focus:ring-2 focus:ring-accent focus:outline-none">
            <option value="">All LGAs</option>{allLGAs.map(lga => <option key={lga}>{lga}</option>)}
          </select>
          <select aria-label="Filter by school type" value={typeFilter} onChange={event => setTypeFilter(event.target.value)} className="border border-border rounded-md px-2 py-1.5 text-sm bg-card font-body focus:ring-2 focus:ring-accent focus:outline-none">
            <option value="">All Types</option><option>Mainstream</option><option>Special Needs</option><option>Inclusive</option>
          </select>
          <select aria-label="Filter by location" value={locFilter} onChange={event => setLocFilter(event.target.value)} className="border border-border rounded-md px-2 py-1.5 text-sm bg-card font-body focus:ring-2 focus:ring-accent focus:outline-none">
            <option value="">All Locations</option><option>Urban</option><option>Rural</option>
          </select>
          <input aria-label="Search schools" type="search" placeholder="Search school..." value={search} onChange={event => setSearch(event.target.value)} className="border border-border rounded-md px-2 py-1.5 text-sm bg-card font-body focus:ring-2 focus:ring-accent focus:outline-none" />
          <Button variant="secondary" size="sm" onClick={reset}>Reset</Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 font-body">{filtered.length} record(s) found</p>
      </div>

      <div className="bg-card rounded-md shadow-sm overflow-x-auto">
        {filtered.length === 0 ? (
          <div className="p-8 text-center"><p className="text-muted-foreground font-body">No records match your filters.</p><Button variant="secondary" className="mt-3" onClick={reset}>Reset Filters</Button></div>
        ) : (
          <table className="w-full text-sm font-body">
            <thead><tr className="bg-muted text-left">
              {['School Name', 'LGA', 'Type', 'Location', 'Students', 'Disabled', 'Core Subject Coverage'].map(label => <th key={label} className="px-4 py-3 font-display font-semibold">{label}</th>)}
            </tr></thead>
            <tbody>{filtered.map((school, index) => (
              <tr key={school.name} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                <td className="px-4 py-3 font-semibold">{school.name}</td><td className="px-4 py-3">{school.lga}<PilotBadge lga={school.lga} /></td><td className="px-4 py-3">{school.type}</td><td className="px-4 py-3">{school.location}</td><td className="px-4 py-3">{school.students.toLocaleString()}</td><td className="px-4 py-3">{school.disabled}</td>
                <td className="px-4 py-3"><div className="flex gap-1.5 flex-wrap"><CoverageMark subject="Maths" status={school.coverage.maths} /><CoverageMark subject="English" status={school.coverage.english} /><CoverageMark subject="Science" status={school.coverage.science} /></div></td>
              </tr>
            ))}</tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SchoolsTab;