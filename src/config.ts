/**
 * Public demo switch.
 *
 * true  = anyone can open /dashboard without signing in (temporary feedback window).
 *         The Schools tab and the SUBEB banner are hidden, and a feedback prompt is shown.
 * false = the dashboard is sign-in only, exactly as before. /admin is always sign-in only.
 *
 * To end the feedback window, set this to false and publish.
 */
export const PUBLIC_DEMO_MODE = true;

export const FEEDBACK_FORM_URL = "https://forms.gle/FYUFxkkKTzSFeoGA6";
