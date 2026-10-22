// The words people see. Change anything here without touching the code.
// Keep it kind, plain and person-first. Reading age about 9.

window.CONTENT = {
  appName: "Find support",
  tagline: "Day or night. No judgement.",
  prototypeNote: "Prototype. The services here are made-up examples, apart from 999 and NHS 24 (111).",

  start: {
    heading: "Is anyone in danger right now?",
    intro: "For example, someone is not breathing, will not wake up, or has hurt themselves badly.",
    yes: "Yes, someone is in danger",
    no: "No, not right now",
  },

  emergency: {
    heading: "Call 999 now",
    intro: "Ask for an ambulance. Stay with the person if it is safe to.",
    callLabel: "Call 999",
    steps: [
      "Tell them where you are and what has been taken, if you know.",
      "If the person is not awake, lie them on their side.",
      "If you have naloxone and think it is an opioid overdose, use it.",
      "Do not leave them alone.",
    ],
    after: "When things are calmer, you can come back here to find support.",
    continueLabel: "Find support for later",
  },

  who: {
    heading: "Who are you looking for help for?",
    options: [
      { id: "me", label: "Me" },
      { id: "someone", label: "Someone I care about" },
      { id: "worker", label: "Someone I support through my work" },
    ],
  },

  need: {
    heading: "What would help most right now?",
    hint: "Choose one. You can come back and choose another.",
    options: [
      { id: "talk", label: "Someone to talk to" },
      { id: "safer", label: "Ways to use more safely" },
      { id: "cut-down", label: "Help to cut down or stop" },
      { id: "somewhere", label: "Somewhere safe to be tonight" },
      { id: "family", label: "Support for me as a family member or friend" },
    ],
  },

  results: {
    heading: "Here is who can help",
    openNow: "Open now",
    closedNow: "Closed now",
    opensAt: "Opens",
    laterHeading: "Closed now, but you can contact them later",
    noneOpen: "Nobody on this list is open right now. NHS 24 on 111 is open all night if you need to talk to someone about your health.",
    startAgain: "Start again",
    lowData: "Works with low data",
    ways: { phone: "Call", text: "Text", chat: "Web chat", visit: "Drop in" },
  },

  back: "Back",
  timeControl: "Pretend the time is",
};
