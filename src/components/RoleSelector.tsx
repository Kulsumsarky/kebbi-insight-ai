import { useAuth, roleLabels } from "@/hooks/useAuth";

const RoleSelector = () => {
  const { role, profile } = useAuth();

  return (
    <div className="bg-kebbi-light border-b border-border">
      <div className="container flex items-center justify-between py-2 flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-display font-semibold text-foreground">Signed in as:</span>
          <span className="text-sm border border-secondary text-secondary rounded-full px-3 py-1 font-display font-semibold bg-card">
            {role ? roleLabels[role] : "Access level pending assignment"}
          </span>
          {profile?.full_name && (
            <span className="text-xs text-muted-foreground font-body">{profile.full_name}</span>
          )}
          {profile?.lga && (
            <span className="text-xs text-muted-foreground font-body">LGA: {profile.lga}</span>
          )}
        </div>
        <span className="text-xs text-muted-foreground font-body">Last updated: March 2026 (Simulated Data)</span>
      </div>
    </div>
  );
};

export default RoleSelector;
