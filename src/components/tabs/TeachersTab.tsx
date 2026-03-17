import { useState, useMemo } from "react";
import { teachersData, lgaData } from "@/data/kebbiData";

const allSubjects = [...new Set(teachersData.map(t => t.subject))].sort();
const allLGAs = lgaData.map(l => l.name);

const TeachersTab = () => {
  const [lgaFilter, setLgaFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [trcnFilter, setTrcnFilter] = useState("");
  const [senFilter, setSenFilter] = useState("");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return teachersData.filter(t => {
      if (lgaFilter && t.lga !== lgaFilter) return false;
      if (subjectFilter && t.subject !== subjectFilter) return false;
      if (trcnFilter && t.trcn !== trcnFilter) return false;
      if (senFilter === "Yes" && !t.senCertified) return false;
      if (senFilter === "No" && t.senCertified) return false;
      if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [lgaFilter, subjectFilter, trcnFilter, senFilter, search]);

  const reset = () => { setLgaFilter(""); setSubjectFilter(""); setTrcnFilter(""); setSenFilter(""); setSearch(""); };

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-md p-4 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <select value={lgaFilter} onChange={e => setLgaFilter(e.target.value)} className="border border-border rounded-md px-2 py-1.5 text-sm bg-card font-body focus:ring-2 focus:ring-accent focus:outline-none">
            <option value="">All LGAs</option>
            {allLGAs.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <select value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)} className="border border-border rounded-md px-2 py-1.5 text-sm bg-card font-body focus:ring-2 focus:ring-accent focus:outline-none">
            <option value="">All Subjects</option>
            {allSubjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={trcnFilter} onChange={e => setTrcnFilter(e.target.value)} className="border border-border rounded-md px-2 py-1.5 text-sm bg-card font-body focus:ring-2 focus:ring-accent focus:outline-none">
            <option value="">TRCN Status</option>
            <option value="Licensed">Licensed</option>
            <option value="Unlicensed">Unlicensed</option>
          </select>
          <select value={senFilter} onChange={e => setSenFilter(e.target.value)} className="border border-border rounded-md px-2 py-1.5 text-sm bg-card font-body focus:ring-2 focus:ring-accent focus:outline-none">
            <option value="">SEN Certified</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-border rounded-md px-2 py-1.5 text-sm bg-card font-body focus:ring-2 focus:ring-accent focus:outline-none"
          />
          <button onClick={reset} className="bg-secondary text-secondary-foreground rounded-md px-3 py-1.5 text-sm font-display font-semibold hover:opacity-90 transition-opacity">
            Reset
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 font-body">{filtered.length} record(s) found</p>
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
                <th className="px-4 py-2 font-display font-semibold">Name</th>
                <th className="px-4 py-2 font-display font-semibold">LGA</th>
                <th className="px-4 py-2 font-display font-semibold">School</th>
                <th className="px-4 py-2 font-display font-semibold">Subject</th>
                <th className="px-4 py-2 font-display font-semibold">TRCN</th>
                <th className="px-4 py-2 font-display font-semibold">SEN Cert</th>
                <th className="px-4 py-2 font-display font-semibold">Experience</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => (
                <tr key={t.name} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                  <td className="px-4 py-2 font-semibold">{t.name}</td>
                  <td className="px-4 py-2">{t.lga}</td>
                  <td className="px-4 py-2">{t.school}</td>
                  <td className="px-4 py-2">{t.subject}</td>
                  <td className="px-4 py-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${t.trcn === "Licensed" ? "bg-kebbi-light text-secondary" : "bg-destructive/10 text-destructive"}`}>
                      {t.trcn}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${t.senCertified ? "bg-kebbi-light text-secondary" : "bg-muted text-muted-foreground"}`}>
                      {t.senCertified ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-4 py-2">{t.experience} yrs</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TeachersTab;
