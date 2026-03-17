import kebbiSeal from "@/assets/kebbi-seal.jpg";
import kebbiMap from "@/assets/kebbi-map.jpg";

const Header = () => {
  return (
    <header className="bg-primary border-b-[3px] border-accent">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <img src={kebbiSeal} alt="Kebbi State Seal" className="w-[52px] h-[52px] rounded-full border-2 border-accent object-cover" />
        </div>
        <div className="text-center flex-1 px-4">
          <h1 className="text-primary-foreground font-display font-bold text-lg md:text-xl tracking-tight">EduMap Kebbi</h1>
          <p className="text-accent text-xs md:text-sm font-display">Education Intelligence Platform — Kebbi State, Nigeria</p>
        </div>
        <div className="flex items-center gap-3">
          <img src={kebbiMap} alt="Kebbi State Map" className="w-[52px] h-[52px] rounded-md border-2 border-accent object-cover" />
          <div className="hidden md:flex flex-col gap-1">
            <span className="text-[10px] border border-accent text-accent rounded-full px-2 py-0.5 font-display font-semibold">3MTT NextGen 2026</span>
            <span className="text-[10px] border border-accent text-accent rounded-full px-2 py-0.5 font-display font-semibold">Powered by AI</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
