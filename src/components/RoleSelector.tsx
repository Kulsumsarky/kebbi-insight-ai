import { useState } from "react";

const roles = ["State Ministry of Education", "LGA Education Secretary", "School Administrator"];

const RoleSelector = () => {
  const [role, setRole] = useState(roles[0]);

  return (
    <div className="bg-kebbi-light border-b border-border">
      <div className="container flex items-center justify-between py-2 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-display font-semibold text-foreground">Viewing as:</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="text-sm border border-border rounded-md px-3 py-1.5 bg-card text-foreground font-body focus:ring-2 focus:ring-accent focus:outline-none"
          >
            {roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <span className="text-xs text-muted-foreground font-body">Last updated: March 2026 (Mock Data)</span>
      </div>
    </div>
  );
};

export default RoleSelector;
