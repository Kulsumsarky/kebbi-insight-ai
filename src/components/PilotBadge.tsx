/** Year 1 pilot LGEAs — phased rollout, not all 21 at once. */
export const PILOT_LGAS = ["Birnin Kebbi", "Kalgo", "Argungu", "Gwandu", "Aliero"];
const DATA_COMPLETE = "Birnin Kebbi";

export const isPilotLga = (lga: string) => PILOT_LGAS.includes(lga);

const PilotBadge = ({ lga }: { lga: string }) => {
  if (!isPilotLga(lga)) return null;
  const complete = lga === DATA_COMPLETE;
  return (
    <span
      title={complete ? "Year 1 Pilot — full subject-level data available" : "Year 1 Pilot — data collection in progress"}
      className={`ml-2 inline-flex items-center whitespace-nowrap text-[10px] font-display font-semibold px-2 py-0.5 rounded-full border ${
        complete ? "bg-primary text-primary-foreground border-primary" : "bg-accent/15 text-foreground border-accent/50"
      }`}
    >
      Year 1 Pilot · {complete ? "Data Complete" : "Data Collection in Progress"}
    </span>
  );
};

export default PilotBadge;
