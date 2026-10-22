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
      { id: "stranger", label: "Someone I don't know, who needs help" },
    ],
  },

  // Family and friends: shown when "Someone I care about" is picked, before anything else.
  family: {
    heading: "What's happening?",
    intro: "It's hard when someone you care about is using. You're not on your own.",
    options: [
      { id: "overdose", label: "I'm worried they might overdose" },
      { id: "tonight", label: "I don't know what to do or say" },
      { id: "for-me", label: "I need support for me" },
      { id: "for-them", label: "Find help for them" },
    ],
  },

  // Signs and steps from NHS Scotland overdose advice (NHS Borders leaflet, East Ayrshire
  // naloxone campaign) and Public Health Scotland. Checked 22 October 2026: check again before relying on it.
  overdose: {
    heading: "Signs of an overdose",
    intro: "If you see any of these, call 999 straight away. Don't wait to be sure.",
    signs: [
      "They won't wake up, or you can't get a response.",
      "Their breathing is slow, shallow or stops.",
      "They're snoring or making gurgling sounds.",
      "Their lips or skin look blue, grey or pale.",
      "Their pupils are very small, like pinpoints.",
    ],
    callLabel: "Call 999",
    doHeading: "While you wait for the ambulance",
    // The steps are the same as the emergency screen (emergency.steps), so they always match.
    dontHeading: "Don't",
    donts: [
      "Don't leave them on their own.",
      "Don't walk them around or put them in a cold bath.",
      "Don't give them other drugs or alcohol to bring them round.",
    ],
    naloxoneHeading: "Get naloxone, just in case",
    naloxone: "Naloxone can reverse an opioid overdose for a short time. It won't harm someone who hasn't taken opioids. Scottish Families can post you a kit, and many pharmacies have them. Ask how to use it.",
    next: "Find support for me",
  },

  // General advice for family and friends. Not yet checked by a specialist:
  // check it with Scottish Families Affected by Alcohol and Drugs before relying on it.
  tonight: {
    heading: "What you can do tonight",
    intro: "There's no perfect thing to say. These can help.",
    steps: [
      "If you're worried about their safety, check the signs of an overdose.",
      "Try to stay calm. Arguing while they're using rarely helps.",
      "Keep them, and you, safe. It's OK to step away if you need to.",
      "Talk properly tomorrow, when you're both calmer.",
      "Look after yourself tonight too. Eat, rest and talk to someone.",
    ],
    tomorrowHeading: "When you talk tomorrow",
    tomorrow: [
      "Pick a calm time, when they're not using.",
      "Say how you feel, for example \"I'm worried about you\", not \"You always…\".",
      "Listen more than you talk. You don't have to fix it all at once.",
    ],
    checkNote: "This is general advice. Scottish Families can talk it through with you.",
    overdoseLink: "Signs of an overdose",
    forMe: "Find support for me",
    forThem: "Find help for them",
  },

  // The question and options change to match who the help is for (me, someone, worker).
  need: {
    hint: "Pick what fits. You can change it.",
    me: {
      heading: "What do you need right now?",
      options: [
        { id: "talk", label: "Someone to talk to" },
        { id: "safer", label: "Ways to use more safely" },
        { id: "cut-down", label: "Help to cut down or stop" },
        { id: "somewhere", label: "Somewhere safe to be tonight" },
        { id: "family", label: "Support for my family or friends" },
        { id: "any", label: "I'm not sure. Show me everything that's open" },
      ],
    },
    someone: {
      heading: "What would help most right now?",
      options: [
        { id: "talk", label: "Someone for them to talk to" },
        { id: "safer", label: "Ways for them to use more safely" },
        { id: "cut-down", label: "Help for them to cut down or stop" },
        { id: "somewhere", label: "Somewhere safe for them tonight" },
        { id: "family", label: "Support for me, as their family or friend" },
        { id: "any", label: "I'm not sure. Show me everything that's open" },
      ],
    },
    stranger: {
      heading: "What does the person need right now?",
      hint: "Thank you for stopping to help. If they're unwell or won't wake up, call 999.",
      options: [
        { id: "talk", label: "Someone for them to talk to" },
        { id: "safer", label: "Ways for them to use more safely" },
        { id: "cut-down", label: "Help for them to cut down or stop" },
        { id: "somewhere", label: "Somewhere safe for them tonight" },
        { id: "any", label: "I'm not sure. Show me everything that's open" },
      ],
    },
    worker: {
      heading: "What does the person you support need right now?",
      options: [
        { id: "talk", label: "Someone for them to talk to" },
        { id: "safer", label: "Ways for them to use more safely" },
        { id: "cut-down", label: "Help for them to cut down or stop" },
        { id: "somewhere", label: "Somewhere safe for them tonight" },
        { id: "family", label: "Support for their family or friends" },
        { id: "any", label: "I'm not sure. Show me everything that's open" },
      ],
    },
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
    familyHeading: "Support for you, too",
    familyIntro: "Caring about someone who uses drugs or alcohol is hard. These are just for family and friends.",
    allDay: "Open all day and night",
    textWordTo: "to",
    companionHeading: "Want to talk it through?",
    companionText: "Our voice companion listens, day or night. It's an AI, not a person.",
    companionLink: "Talk to the companion",
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

  // Low battery mode: dark, text only, nothing that needs data.
  lite: {
    toggle: "Low battery mode",
    on: "On",
    off: "Off",
    numbersButton: "Just show me the numbers",
    numbersHeading: "Numbers to keep",
    numbersIntro: "Save these now, in case your battery or signal runs out.",
    emergency: "Emergency",
    copy: "Copy these numbers",
    copied: "Copied. Paste them into your notes.",
    copyFailed: "Couldn't copy. You can write them down instead.",
    textMyself: "Text them to myself",
    hiddenNote: "Low battery mode is on, so web chats and online-only help are hidden.",
  },

  back: "Back",
  timeControl: "Pretend the time is",
};
