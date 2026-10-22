# Triage questions: draft

Drafted by Mthoko with Claude, 22 October. Builds on Eloise's first version (`src/content.js`).
Goal: **never send someone to a closed door.** Show what's open now first, then what opens in the next two hours, and always show the 24-hour lines.

Reading age about 9. Person-first. One question a screen.

## The questions

**1. Is anyone in danger right now?** (already in the first version)
- Yes, someone is in danger → Call 999 screen
- No, not right now

**2. Who are you looking for help for?** (already in the first version)
- Me
- Someone I care about
- Someone I support through my work
- *New:* Someone I don't know, who needs help

**3. What would help most right now?** (already in the first version)
- Someone to talk to
- Ways to use more safely
- Help to cut down or stop
- Somewhere safe to be tonight
- Support for me as a family member or friend
- *New:* I'm not sure. Show me everything that's open

**4. When do you need help?** *(new)*
- Right now
- In the next couple of hours
- Tomorrow is fine

**5. Where are you?** *(new)*
- Use my location
  - Say why first: "We use this only to find places near you. We don't save it."
- Type a town or postcode
- Skip this. Show me phone and online help

## How the results are ordered

1. **Open now, nearest first.** Show how far away it is and when it closes.
2. **Opens in the next 2 hours.** Show "Opens at 7am, in 1 hour 20 minutes".
3. **Open all day and night.** Phone, text and chat lines, always shown at the bottom.
4. Closed for longer: hide these by default, behind "Show places that are closed".

Never show a closed place without saying when it opens.

## 24-hour lines to show every time

- 999: emergency
- NHS 24, 111: health advice
- Samaritans, 116 123: free, any time, about anything
- **To check with `/find-out` before adding:** Scotland's drug and alcohol helpline (Know the Score), Breathing Space, and the Shout text line. Check their numbers and hours first.

## Notes for the team

- **Location is sensitive.** Ask first, explain why, offer a typed town instead, and don't store it.
- **The "AI agent that replies in real time"** can be faked in the prototype: a chat-style screen that asks these same questions in order. That shows the idea without building a real AI.
- Ideas for later: "Text me this list", and "Remind me when it opens".
