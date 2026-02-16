# Specification

## Summary
**Goal:** Build the AJ.1 multilingual assistant web app chat experience on the Internet Computer with structured, safe, readable responses, user-adjustable explanation depth, and persistence for signed-in users.

**Planned changes:**
- Create a multi-turn chat UI that renders assistant answers in clearly labeled sections: core issue, sub-parts, step-by-step solution, examples (when helpful), and next action/summary.
- Add an explanation-level control (Beginner / Student / Expert) that adjusts response structure/detail while keeping a calm, friendly, confident, slightly futuristic tone.
- Add a language selector for major languages; localize all UI strings and output assistant section headings/templates in the selected language; include an in-app list of supported languages (extendable).
- Add ambiguity handling: when prompts are missing key details, show an explicit “what’s missing” note and ask numbered clarifying questions before attempting a full solution.
- Add safety enforcement that blocks harmful/illegal/unsafe instructions with a consistent refusal style and safe alternatives; include a small user-facing Safety note in About.
- Implement Internet Identity sign-in and persist per-user settings (language, explanation level) plus chat history by principal; allow clearing history; keep session-only behavior for unauthenticated users with a prompt to sign in for persistence.
- Apply a coherent calm, slightly futuristic visual theme across pages/components that avoids blue/purple as the dominant primary scheme and is responsive on mobile.
- Brand the UI as “AJ.1” throughout (header/title/about) and display included static icon/logo assets from `frontend/public/assets/generated`.
- Add an About/Help note clarifying this deliverable is a web app on the Internet Computer and that Android APK packaging is a separate external step (not produced by this build).

**User-visible outcome:** Users can chat with AJ.1 in a chosen language and explanation level, receive structured readable help (or clarifying questions when needed), see safe refusals for disallowed requests, sign in with Internet Identity to keep settings and chat history across sessions, and view AJ.1 branding plus a clear note about APK expectations.
