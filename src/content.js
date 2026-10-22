// The words people see. Change anything here without touching the code.
// Keep it kind, plain and person-first. Reading age about 9.

window.CONTENT = {
  appName: "Get the support you need",
  tagline: "Day or night. Whoever you are.",
  prototypeNote: "Prototype. Services marked (example) are made up. The others are real, but check them before you rely on them.",

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

  where: {
    heading: "Where are you?",
    intro: "So we can show places you can get to.",
    useLocation: "Use my location",
    useLocationWhy: "We use this only to find places near you. We don't save it.",
    finding: "Finding where you are…",
    locationFailed: "We couldn't get your location. You can type a town or postcode instead.",
    typeLabel: "Type a town or postcode",
    typeHint: "For example, Greenock or PA15",
    typeButton: "Find places near here",
    notFound: "We couldn't find that place. Try a nearby town, or skip this.",
    skip: "Skip this. Show me phone and online help",
  },

  results: {
    heading: "Here is who can help",
    openNow: "Open now",
    closedNow: "Closed now",
    opensAt: "Opens",
    openHeading: "Open now",
    soonHeading: "Opening in the next 2 hours",
    opensIn: "in",
    showLater: "Show places that are closed for longer",
    noneOpen: "Nothing near you is open right now. These can help at any time:",
    allDayHeading: "Open all day and night",
    allDay: "Open all day and night",
    textWordTo: "to",
    startAgain: "Start again",
    lowData: "Works with low data",
    near: "Near",
    milesAway: "miles away",
    lessThanAMile: "Less than a mile away",
    tooFarNote: "Places more than 30 miles away are not shown.",
    changeLocation: "Change where you are",
    ways: { phone: "Call", text: "Text", chat: "Web chat", visit: "Drop in" },
  },

  back: "Back",
  timeControl: "Pretend the time is",
};
