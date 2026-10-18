import { MessageSquare } from "lucide-react";
import { FEEDBACK_FORM_URL } from "@/config";

/** Slim banner plus a floating button, shown only while PUBLIC_DEMO_MODE is on. */
const FeedbackPrompt = () => (
  <>
    <div className="bg-accent/15 border-b border-accent/40">
      <div className="container py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-xs md:text-sm font-body text-foreground">
          <strong>Demo preview.</strong> Figures marked (est.) are estimates while real data is collected.
        </p>
        <a
          href={FEEDBACK_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs md:text-sm font-display font-semibold text-primary underline underline-offset-2 shrink-0"
        >
          Give feedback (1 minute)
        </a>
      </div>
    </div>
    <a
      href={FEEDBACK_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-accent text-primary px-4 py-3 text-sm font-display font-semibold shadow-lg hover:bg-accent/90 transition-colors"
    >
      <MessageSquare className="w-4 h-4" />
      Give feedback
    </a>
  </>
);

export default FeedbackPrompt;
