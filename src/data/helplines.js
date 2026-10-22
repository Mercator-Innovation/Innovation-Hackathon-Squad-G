// Real help that is open all day and night. Checked 22 October 2026: check again before relying on it.
// always: true  → shown every time, in "Open all day and night".
// always: false → shown only when nothing else is open (the "if nothing is open" list).
// status: optional words to use instead of "Open all day and night".
// town: only shown when the person is near that town.
// needs: talk, safer, cut-down, somewhere, family ("all" for everything).

window.HELPLINES = [
  {
    name: "Samaritans",
    what: "Free, any time, about anything. You don't have to be in crisis.",
    contact: { phone: "116 123" },
    needs: ["all"],
    always: true,
  },
  {
    name: "Shout",
    what: "Free text service, any time. A trained volunteer usually replies within 5 minutes.",
    contact: { textWord: "SHOUT", text: "85258" },
    needs: ["talk", "family", "cut-down"],
    always: true,
  },
  {
    name: "NHS 24",
    what: "Health advice from a nurse, any time. Call 111 before going to A&E, unless it's life-threatening.",
    contact: { phone: "111" },
    needs: ["talk", "safer", "cut-down"],
    always: true,
  },
  {
    name: "A&E (Accident and Emergency)",
    what: "If it's life-threatening, call 999 or go to A&E. If you're not sure, call 111 first: they can tell you where to go.",
    contact: { phone: "999" },
    needs: ["safer", "cut-down"],
    always: false,
  },
  {
    name: "Your local council",
    what: "If you have nowhere to stay tonight, your council has a legal duty to help. When the office is closed, they have an out-of-hours number on their website.",
    status: "Out-of-hours number on their website",
    contact: {},
    needs: ["somewhere"],
    always: false,
  },
  {
    // From an archived mygov.scot page (2024). Check before relying on it.
    name: "Glasgow rough sleeper helpline",
    what: "Free 24-hour helpline for people sleeping rough in Glasgow, run by a homelessness charity.",
    contact: { phone: "0800 027 7466" },
    needs: ["somewhere"],
    always: false,
    town: "Glasgow",
  },
  {
    // From an archived mygov.scot page (2024). Check before relying on it.
    name: "Edinburgh rough sleeper helpline",
    what: "Free 24-hour helpline for people sleeping rough in Edinburgh, run by a homelessness charity.",
    contact: { phone: "0808 178 2323" },
    needs: ["somewhere"],
    always: false,
    town: "Edinburgh",
  },
];
