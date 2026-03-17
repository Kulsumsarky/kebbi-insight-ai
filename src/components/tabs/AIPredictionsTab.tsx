import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from "recharts";
import { aiPredictions } from "@/data/kebbiData";
import { AlertTriangle, TrendingDown, Sparkles, Printer } from "lucide-react";
import ExportButton from "@/components/ExportButton";
import { exportToCSV } from "@/lib/csvExport";

const AIPredictionsTab = () => {
  const [showModal, setShowModal] = useState(false);

  const supplyDemandData = aiPredictions.supplyDemand.years.map((y, i) => ({
    year: y,
    Supply: aiPredictions.supplyDemand.supply[i],
    Demand: aiPredictions.supplyDemand.demand[i],
  }));

  const senRatioData = aiPredictions.senRatio.years.map((y, i) => ({
    year: y,
    "SEN Ratio": aiPredictions.senRatio.actual[i],
    Recommended: aiPredictions.senRatio.recommended[i],
  }));

  const handleInterventionsExport = () => {
    exportToCSV("kebbi_ai_interventions",
      ["LGA", "Priority", "Gap Type", "Recommended Action", "Impact"],
      aiPredictions.interventions.map(r => [r.lga, r.priority, r.gapType, r.action, r.impact])
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Alert banners */}
      <div className="bg-destructive/10 border border-destructive/30 rounded-md p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
        <p className="text-sm font-body text-foreground">
          <strong>Critical:</strong> At current trends, Kebbi State will face a shortage of <strong>1,240+ teachers</strong> by 2026 — affecting an estimated <strong>89,000 students</strong>.
        </p>
      </div>
      <div className="bg-accent/10 border border-accent/30 rounded-md p-4 flex items-start gap-3">
        <TrendingDown className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
        <p className="text-sm font-body text-foreground">
          <strong>Warning:</strong> SEN teacher-to-student ratio worsening from <strong>1:46</strong> to <strong>1:73</strong> by 2026 — nearly 3× the recommended maximum of 1:25.
        </p>
      </div>

      {/* Forecast cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-md p-4 shadow-sm border-t-4 border-t-accent transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
          <p className="text-xs text-muted-foreground font-body uppercase tracking-wide">Predicted Teacher Shortage 2026</p>
          <p className="text-2xl font-display font-bold text-destructive mt-1">+1,240</p>
        </div>
        <div className="bg-card rounded-md p-4 shadow-sm border-t-4 border-t-accent transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
          <p className="text-xs text-muted-foreground font-body uppercase tracking-wide">SEN Ratio by 2026</p>
          <p className="text-2xl font-display font-bold text-destructive mt-1">1:73</p>
        </div>
        <div className="bg-card rounded-md p-4 shadow-sm border-t-4 border-t-accent transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
          <p className="text-xs text-muted-foreground font-body uppercase tracking-wide">Vocational Readiness</p>
          <p className="text-2xl font-display font-bold text-accent mt-1">34%</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-md p-4 shadow-sm">
          <h3 className="font-display font-semibold text-sm mb-3 text-card-foreground">STEM Teacher Supply vs Demand (2022–2026)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={supplyDemandData}>
              <XAxis dataKey="year" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="Supply" stroke="#1a6e2e" fill="#1a6e2e" fillOpacity={0.2} strokeWidth={2} />
              <Area type="monotone" dataKey="Demand" stroke="#d63031" fill="#d63031" fillOpacity={0.2} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-md p-4 shadow-sm">
          <h3 className="font-display font-semibold text-sm mb-3 text-card-foreground">SEN Ratio Forecast (2022–2026)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={senRatioData}>
              <XAxis dataKey="year" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="SEN Ratio" stroke="#c9a227" strokeWidth={2} dot={{ fill: "#c9a227" }} />
              <Line type="monotone" dataKey="Recommended" stroke="#c9a227" strokeWidth={1} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Interventions table */}
      <div className="bg-card rounded-md shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between p-4 pb-2">
          <h3 className="font-display font-semibold text-sm text-card-foreground">AI Intervention Recommendations</h3>
          <ExportButton onClick={handleInterventionsExport} label="Export Interventions" />
        </div>
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="bg-muted text-left">
              <th className="px-4 py-2 font-display font-semibold">LGA</th>
              <th className="px-4 py-2 font-display font-semibold">Priority</th>
              <th className="px-4 py-2 font-display font-semibold">Gap Type</th>
              <th className="px-4 py-2 font-display font-semibold">Recommended Action</th>
              <th className="px-4 py-2 font-display font-semibold">Impact</th>
            </tr>
          </thead>
          <tbody>
            {aiPredictions.interventions.map((row, i) => (
              <tr key={row.lga} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                <td className="px-4 py-2 font-semibold">{row.lga}</td>
                <td className="px-4 py-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    row.priority === "Critical" ? "bg-destructive/10 text-destructive" : "bg-accent/20 text-accent"
                  }`}>
                    {row.priority}
                  </span>
                </td>
                <td className="px-4 py-2">{row.gapType}</td>
                <td className="px-4 py-2">{row.action}</td>
                <td className="px-4 py-2">{row.impact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={() => setShowModal(true)}
          className="bg-accent text-accent-foreground px-6 py-3 rounded-md font-display font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Generate AI Report
        </button>
        <button
          onClick={handlePrint}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-display font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          Print Report
        </button>
      </div>
      <p className="text-[10px] text-muted-foreground font-body text-center max-w-md mx-auto">
        Forecasts generated via time-series modelling (Make.com AI connector). All predictions are estimates.
      </p>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-md p-6 max-w-md w-full shadow-lg">
            <h3 className="font-display font-bold text-lg text-card-foreground mb-3">AI Report Generation</h3>
            <p className="text-sm font-body text-muted-foreground mb-4">
              In production, this connects to Make.com AI connector to generate a PDF briefing for the Kebbi State Ministry of Education.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md font-display font-semibold text-sm hover:opacity-90"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPredictionsTab;
