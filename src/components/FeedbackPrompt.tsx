import { MessageSquare } from "lucide-react";
import { FEEDBACK_FORM_URL } from "@/config";

/** Floating feedback button, shown only while PUBLIC_DEMO_MODE is on. (The demo note is in the page footer; the feedback link sits beside the Data year dropdown.) */
const FeedbackPrompt = () => (
  <>
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
