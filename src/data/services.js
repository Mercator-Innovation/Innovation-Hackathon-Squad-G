// Synthetic, made-up services for the prototype. Not real organisations.
// 999 and NHS 24 (111) are real public numbers.
// hours: list of { days: [0-6, Sunday is 0], from: hour, to: hour }.
// "to" can go past 24 for overnight, e.g. from 20 to 30 means 8pm to 6am.
// who: me, someone, worker. needs: talk, safer, cut-down, somewhere, family.

window.DATA = {
  services: [
    {
      name: "NHS 24",
      what: "Health advice from a nurse, any time. Not for emergencies.",
      contact: { phone: "111" },
      hours: [{ days: [0, 1, 2, 3, 4, 5, 6], from: 0, to: 24 }],
      who: ["me", "someone", "worker"],
      needs: ["talk", "safer"],
      lowData: true,
      area: "All of Scotland",
    },
    {
      name: "Nightline Peer Support (example)",
      what: "Talk to someone who has been through it. They will listen, not lecture.",
      contact: { phone: "0808 157 0101", text: "07700 900101" },
      hours: [{ days: [0, 1, 2, 3, 4, 5, 6], from: 20, to: 30 }],
      who: ["me"],
      needs: ["talk", "cut-down"],
      lowData: true,
      area: "All of Scotland",
    },
    {
      name: "Circle Families Line (example)",
      what: "For family and friends. Talk through what is happening and what you can do.",
      contact: { phone: "0808 157 0202", chat: "#" },
      hours: [
        { days: [1, 2, 3, 4, 5], from: 9, to: 23 },
        { days: [0, 6], from: 10, to: 16 },
      ],
      who: ["someone"],
      needs: ["talk", "family"],
      lowData: false,
      area: "All of Scotland",
    },
    {
      name: "Harbour Drop-in (example)",
      what: "Clean equipment, naloxone, a hot drink and a chat. No appointment.",
      contact: { visit: "12 Example Street, city centre" },
      hours: [{ days: [0, 5, 6], from: 18, to: 24 }],
      who: ["me", "someone", "worker"],
      needs: ["safer", "somewhere", "talk"],
      lowData: true,
      area: "City centre only",
    },
    {
      name: "Local Recovery Service (example)",
      what: "Start treatment, sometimes the same day. You can refer yourself.",
      contact: { phone: "0306 999 0303", visit: "Health Centre, Example Road" },
      hours: [{ days: [1, 2, 3, 4, 5], from: 9, to: 17 }],
      who: ["me", "someone", "worker"],
      needs: ["cut-down", "safer"],
      lowData: true,
      area: "Your local area",
    },
    {
      name: "Safe Stay Night Shelter (example)",
      what: "A warm, safe place to be overnight. Staff are there all night.",
      contact: { phone: "0306 999 0404", visit: "Ask staff at the Harbour Drop-in" },
      hours: [{ days: [0, 1, 2, 3, 4, 5, 6], from: 21, to: 32 }],
      who: ["me", "worker"],
      needs: ["somewhere"],
      lowData: true,
      area: "City centre only",
    },
    {
      name: "Reach Out Web Chat (example)",
      what: "Chat online with a trained volunteer. You do not have to give your name.",
      contact: { chat: "#" },
      hours: [{ days: [0, 1, 2, 3, 4, 5, 6], from: 18, to: 26 }],
      who: ["me", "someone"],
      needs: ["talk", "family", "cut-down"],
      lowData: false,
      area: "All of Scotland",
    },
    {
      name: "Workers' Advice Line (example)",
      what: "For support workers. Advice on how to help the person you support tonight.",
      contact: { phone: "0306 999 0505" },
      hours: [{ days: [0, 1, 2, 3, 4, 5, 6], from: 17, to: 33 }],
      who: ["worker"],
      needs: ["talk", "safer", "somewhere", "cut-down", "family"],
      lowData: true,
      area: "All of Scotland",
    },
  ],

  // Times for the "pretend the time is" control. day: 0-6 (Sunday is 0).
  pretendTimes: [
    { id: "now", label: "Now (real time)" },
    { id: "tue-11", label: "Tuesday 11am", day: 2, hour: 11 },
    { id: "fri-23", label: "Friday 11pm", day: 5, hour: 23 },
    { id: "sun-03", label: "Sunday 3am", day: 0, hour: 3 },
  ],
};
