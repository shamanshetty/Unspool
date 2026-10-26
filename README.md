# Unspool — Speak. Sort. Start.

A calm, voice-friendly workspace for turning a messy brain dump into a manageable next step. Built for the HH Goa 2026 Wispr Flow challenge.

## Run

Requires Node.js 22 or later. No npm install or API key is required.

```powershell
git clone https://github.com/shamanshetty/Unspool.git
cd Unspool
node server.mjs
```

Open http://127.0.0.1:4173 in a browser. Keep the terminal running. Press Ctrl+C to stop.

```powershell
npm test
```

## What works

- Dictation-compatible capture field: focus it and use your configured Wispr Flow shortcut.
- Local rule-based organization: sentence splitting, suggested categories, priority, dates, and duration.
- Editable tasks, completion/reopening, search, and active/done/all filters.
- Suggested next action sorted by priority, then due date.
- Start/pause/reset focus sessions; closing the focus dialog pauses the timer. Reloading resets timer progress.
- Local saving of drafts and tasks, one-step undo, Markdown export, JSON backup and restore.
- Responsive layouts, labeled controls, keyboard-operable native dialogs, and reduced-motion support.
- No task data is sent to an AI provider or backend. Google Fonts is requested for typography; system fonts work as fallback.

## Organizer contract

Separate tasks with sentences, newlines, semicolons, or spoken transitions such as “and then.” Say “urgent,” “ASAP,” “must,” or “high priority” for high priority. “Maybe,” “someday,” and “low priority” suggest low priority. Dates support “today,” “tonight,” “tomorrow,” and valid YYYY-MM-DD values. Other date phrases remain in the title for manual review. Duration supports numeric minutes or hours and defaults to 25 minutes (range 1–240). Categories are keyword suggestions, not semantic AI.

The app opens with a labeled sample workspace. Your first organized capture replaces that sample; undo can restore it. “Start fresh” clears the workspace after confirmation. Each capture supports at most 80 sentences; longer captures are rejected without clearing the draft. Each workspace supports 1,000 tasks. Exact title duplicates are skipped. Review the plan after organizing; speech and parsing can be imperfect.

## Files

- `dist/index.html`: accessible application shell and dialogs.
- `dist/style.css`: responsive visual system.
- `dist/app.js`: workspace interactions, saving, import/export, focus timer.
- `dist/core.js`: pure parsing, validation, ordering, and export logic.
- `tests/core.test.mjs`: automated core and static-integrity checks.
- `SUBMISSION.md`: recording instructions, pitch, and final checklist.
- `TEST-REPORT.md`: test results and remaining verification.

## Honest submission note

This implementation was generated with coding-agent assistance. The participant must record genuine Wispr Flow-driven build instructions and ensure their process meets the organizer's rules. A product walkthrough alone does not establish a voice-built project. The app uses text inserted by the Wispr Flow desktop app; it has no Wispr Flow SDK integration or built-in microphone recorder.
