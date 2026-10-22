// The words the support companion says. Change anything here without touching the code.
// Scripted, not real AI: the companion picks a reply by spotting words in what the person says.
// Keep it kind, plain and person-first. Reading age about 9.
// 999, NHS 24 (111) and Samaritans (116 123) are real public numbers.

window.COMPANION = {
  title: "Talk it through",
  intro: "A voice to talk to, day or night. It is an AI, not a person.",
  prototypeNote: "Prototype. This companion follows a script. It is not real AI and nobody reads what you type.",

  safetyBar: {
    text: "In danger? Call 999. Want a real person? Samaritans, free, 24 hours:",
    call999: "Call 999",
    samaritans: "Call 116 123",
  },

  voice: {
    readAloud: "Read replies out loud",
    speak: "Speak",
    listening: "Listening… tap to stop",
    noMic: "Speaking isn't available in this browser. You can type instead.",
    micPrivacy: "When you speak, your browser may send your voice to its own speech service to turn it into words.",
  },

  input: {
    label: "Type a message",
    send: "Send",
  },

  you: "You",
  companion: "Companion",
  backToFind: "Back to find support",

  greeting: [
    "Hi. I'm an AI companion, not a person. I'm here to listen, any time of day or night.",
    "If anyone is in danger right now, please call 999.",
    "How are you doing right now?",
  ],

  // Buttons shown under a reply, so people don't have to type.
  quickReplies: {
    start: [
      { label: "I'm struggling", say: "I'm struggling" },
      { label: "I'm worried about someone", say: "I'm worried about someone" },
      { label: "I just want to talk", say: "I just want to talk" },
      { label: "Someone is in danger", say: "Someone is in danger" },
    ],
    next: [
      { label: "Help me calm down", say: "Help me calm down" },
      { label: "Find help that's open now", say: "Find help that's open now" },
      { label: "Talk to a real person", say: "I want to talk to a real person" },
    ],
  },

  // Checked in this order. The first topic whose words appear in the message wins.
  // "danger" always comes first, so risk is never missed.
  // again: said instead of the replies when the same topic comes up a second time, so it doesn't repeat itself.
  // notIf: skip the topic if any of these words appear too (so "not ok" isn't read as "ok").
  topics: [
    {
      id: "danger",
      words: ["danger", "overdose", "od", "not breathing", "won't wake", "wont wake", "unconscious", "collapsed",
        "kill myself", "suicide", "suicidal", "end it", "end my life", "want to die", "hurt myself", "harm myself",
        "hurt someone", "hurt them", "blue lips", "fitting", "seizure", "took too much", "taken too much", "too much"],
      replies: [
        "It sounds like someone might be in danger. I'm an AI and I can't send help.",
        "Please call 999 now and ask for an ambulance. If you're not safe, call 999 for the police.",
        "If you want to talk to a real person about how you feel, Samaritans are free on 116 123, day or night.",
      ],
      again: [
        "I'm still worried someone might be in danger. I can't send help.",
        "Please call 999 now. Don't wait.",
      ],
      showDanger: true,
    },
    {
      id: "human",
      words: ["real person", "human", "someone real", "talk to someone", "speak to someone", "counsellor"],
      replies: [
        "That's a good idea. Talking to a person can really help.",
        "Samaritans are free on 116 123, any time, day or night. They will listen without judging you.",
        "For health worries, NHS 24 is on 111, all night.",
      ],
      again: [
        "Samaritans are there for you on 116 123, any time. You can call them now.",
      ],
      showHuman: true,
    },
    {
      id: "calm",
      words: ["calm", "panic", "anxious", "anxiety", "breathe", "breathing", "scared", "shaking", "can't sleep", "cant sleep"],
      replies: [
        "Let's slow things down together. We'll breathe in for 4 and out for 6.",
      ],
      again: [
        "Let's breathe together again. In for 4, out for 6.",
      ],
      breathing: true,
    },
    {
      id: "find",
      words: ["find", "open", "service", "services", "where can i", "somewhere", "place", "near me", "help near"],
      replies: [
        "I can take you to the list of help that's open now and near you.",
      ],
      again: [
        "Here's the link to help that's open now and near you.",
      ],
      showFind: true,
    },
    {
      id: "someone",
      words: ["worried about", "someone", "my son", "my daughter", "my partner", "my friend", "my mum", "my dad",
        "my brother", "my sister", "family", "they're using", "theyre using"],
      replies: [
        "It's hard to watch someone you care about struggle. You're doing a good thing by looking for help.",
        "Are they safe right now? If not, please call 999.",
        "If they're safe, would you like to talk about how you're feeling, or find support for them or you?",
      ],
      again: [
        "You're clearly thinking a lot about them. That shows how much you care.",
        "How are you holding up yourself?",
      ],
    },
    {
      id: "alone",
      words: ["alone", "lonely", "nobody", "no one", "isolated", "just want to talk", "talk"],
      replies: [
        "I'm here, and I'm listening. You don't have to have the right words.",
        "What's on your mind tonight?",
      ],
      again: [
        "I'm still here with you.",
        "Tell me about it, if you want to. Or we can just take a moment.",
      ],
    },
    {
      // Before "struggling", so "not bad" isn't read as "bad".
      id: "notbad",
      words: ["not bad", "not too bad", "not so bad", "not that bad"],
      replies: [
        "That's good to hear.",
        "I'm here if anything changes. Is there anything you'd like to talk about?",
      ],
      again: [
        "Glad things are OK.",
        "I'm here if you want to keep talking.",
      ],
    },
    {
      id: "struggling",
      words: ["struggling", "craving", "cravings", "using", "drinking", "relapse", "slipped", "can't stop", "cant stop", "bad", "awful", "hard"],
      replies: [
        "Thank you for telling me. That takes courage.",
        "You don't have to sort everything out tonight. Let's just get through the next little while.",
        "Would it help to slow your breathing, find help that's open now, or keep talking?",
      ],
      again: [
        "It sounds like it's still really hard right now. That's OK to say.",
        "What's the hardest part at the moment?",
      ],
    },
    {
      id: "okay",
      words: ["good", "ok", "okay", "fine", "alright", "all right", "better"],
      notIf: ["not", "isn't", "isnt", "don't", "dont", "never", "no", "bad"],
      replies: [
        "I'm glad to hear that.",
        "I'm here if anything changes. Is there anything you'd like to talk about?",
      ],
      again: [
        "That's good to hear.",
        "I'm here if you want to keep talking.",
      ],
    },
    {
      id: "thanks",
      words: ["thanks", "thank you", "cheers", "bye", "goodnight", "good night"],
      replies: [
        "I'm glad we talked. You can come back any time, day or night.",
        "And remember, Samaritans are on 116 123 if you want a real person.",
      ],
      again: [
        "Take care of yourself. I'm here whenever you need to talk.",
      ],
    },
  ],

  // When nothing matches, the companion listens. It takes these in turn.
  listening: [
    ["Thank you for telling me. That sounds really hard.", "Do you want to tell me a bit more?"],
    ["I hear you. You're not on your own right now.", "What would help most in the next hour?"],
    ["That makes sense. Lots of people feel like that.", "Would it help to slow your breathing, find help that's open now, or keep talking?"],
    ["Thank you for trusting me with that.", "What's on your mind most right now?"],
    ["Take your time. There's no rush here.", "Is there anything that usually helps, even a little?"],
    ["I'm listening.", "How has tonight been for you so far?"],
  ],

  breathing: {
    in: "Breathe in… 2… 3… 4",
    out: "And out… 2… 3… 4… 5… 6",
    rounds: 3,
    done: "Well done. How do you feel now?",
  },
};
