// The words people see. Change anything here without touching the code.
// Tone: peer and plain. Down to earth, like someone who's been there. No judgement, no lectures.
// Person-first. Short sentences. Reading age about 9.

window.CONTENT = {
  appName: "Get the support you need",
  tagline: "Day or night. Whoever you are.",
  prototypeNote: "Prototype. Services marked (example) are made up. The others are real, but check them before you rely on them.",

  // Shown on the first screen. Only promise what's true: this page asks no names and saves nothing.
  privacy: {
    heading: "This is private",
    points: [
      "You don't need to give your name.",
      "Nothing you pick here is saved.",
      "You can close this page at any time.",
    ],
  },

  start: {
    heading: "Is anyone in danger right now?",
    intro: "No judgement here. We just want to point you to the right help.",
    examples: "For example, someone isn't breathing, won't wake up, or is badly hurt.",
    yes: "Yes, someone needs help now",
    no: "No, not right now",
  },

  emergency: {
    heading: "Call 999 now",
    intro: "Ask for an ambulance. They're there to help. Stay with the person if it's safe.",
    callLabel: "Call 999",
    steps: [
      "Say where you are. If you know what they've taken, tell them.",
      "If the person isn't awake, lie them on their side.",
      "If you have naloxone and think it's an opioid overdose, use it.",
      "Stay with them.",
    ],
    after: "You did the right thing. When things are calmer, come back here for support.",
    continueLabel: "Find support for later",
  },

  who: {
    heading: "Who's the help for?",
    options: [
      { id: "me", label: "Me" },
      { id: "someone", label: "Someone I care about" },
      { id: "worker", label: "Someone I support through my work" },
    ],
  },

  need: {
    heading: "What do you need right now?",
    hint: "Pick what fits. You can change it.",
    options: [
      { id: "talk", label: "Someone to talk to" },
      { id: "safer", label: "Ways to use more safely" },
      { id: "cut-down", label: "Help to cut down or stop" },
      { id: "somewhere", label: "Somewhere safe to be tonight" },
      { id: "family", label: "Support for me, as family or a friend" },
    ],
  },

  where: {
    heading: "Where are you?",
    intro: "So we can show places you can get to. You don't have to tell us.",
    useLocation: "Use my location",
    useLocationWhy: "We only use this to find places near you. We don't save it.",
    finding: "Finding where you are…",
    locationFailed: "We couldn't get your location. That's fine: type a town or postcode instead.",
    typeLabel: "Type a town or postcode",
    typeHint: "For example, Greenock or PA15",
    typeButton: "Find places near here",
    notFound: "We couldn't find that place. Try a nearby town, or skip this.",
    skip: "Skip this. Show me phone and online help",
  },

  results: {
    heading: "Here's who can help",
    intro: "These people get it. They won't lecture you.",
    openNow: "Open now",
    closedNow: "Closed now",
    opensAt: "Opens",
    openHeading: "Open now",
    soonHeading: "Opening in the next 2 hours",
    opensIn: "in",
    showLater: "Show places that are closed for longer",
    noneOpen: "Nothing near you is open right now. These are there for you at any time:",
    allDayHeading: "Open all day and night",
    allDay: "Open all day and night",
    textWordTo: "to",
    startAgain: "Start again",
    lowData: "Works with low data",
    noName: "No name needed",
    near: "Near",
    milesAway: "miles away",
    lessThanAMile: "Less than a mile away",
    tooFarNote: "Places more than 30 miles away aren't shown.",
    changeLocation: "Change where you are",
    ways: { phone: "Call", text: "Text", chat: "Web chat", visit: "Drop in" },
  },

  back: "Back",
  timeControl: "Pretend the time is",
};
