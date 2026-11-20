# Showcase notes: Squad Gusto (fuller version, for the slide deck)

> The longer version of `showcase.md`, kept for writing slides and speaker notes. `showcase.md` has the short bullets to present from. If one changes, check the other.

**Wednesday 25 November, 14:00 to 15:40, on Teams.** 10-minute slot: about 9 minutes presenting, then 1 minute for questions.
**Challenge 2: Help when it's needed.** Presenters: Bradley, David and Chay _(to confirm with them)_. We're presenting live.

**Who presents what** _(a suggestion, to agree with them)_:

| Who | Sections |
|---|---|
| **David** | The challenge and what we built (0:00–1:00); tooling, roles and the squad (4:30–7:30) |
| **Bradley** | The demo (1:00–2:30); ideas to carry forward and what Mercator can take from this (7:30–9:00) |
| **Chay** | How we worked and used Claude; what didn't go smoothly (2:30–4:30) |

> Draft by Eloise with Claude, 9 November; Chay's and David's reflections added 17 November. Lines marked **[to fill]** still need Mthoko's `/reflect` answers. Bradley's added 20 November. The deck is `Gusto showcase deck.pptx` (Chay's design).

---

## 0:00 to 1:00: The challenge and what we built

- **The problem:** Scotland has the highest drug and alcohol death rates in the UK and Europe. Most help is open 9 to 5 on weekdays, but people are most alone at night. One charity report found more than 80% of Scottish drug services are closed at weekends.
- **What we built:** *Get the support you need*, a digital first responder for anyone affected by substance use, day or night. A few questions, no name and nothing saved, then what's **open now**, what **opens in the next two hours**, and the **24-hour lines**. Nobody gets sent to a closed door.
- It works for four people: **me**, **someone I care about**, **someone I support through work**, and **someone I don't know who needs help**.

## 1:00 to 2:30: Demo: the mum at 3am

Before the call, Bradley says "get the latest and make it run for me" so the site is running on his laptop. The demo slide links to **http://localhost:8766/**: it only works on a laptop where the site is running. Set **Pretend the time is** to **Sunday 3am** first (bottom of the page). Then click, saying what she'd feel:

1. **No, not right now → Someone I care about.** *"It's 3am. Her son is 20 and hasn't come home again after Saturday night."* The app says: *"It's hard when someone you care about is using. You're not on your own."*
2. **I don't know what to do or say.** What to do tonight, and how to talk tomorrow: *"I'm worried about you", not "You always…"*. No blame, no lecture.
3. **Find help for them → Help for them to cut down or stop.** It doesn't ask where she is, because nothing nearby opens soon.
4. **The results are honest:** *"Nothing near you is open right now."* It shows what she can do now, the 24-hour lines, and **"Support for you, too"**, with the families line **opening at 10am**.

Close with: *"At 3am, help really does run out. That's what the app is honest about, and it's what the 'Where help runs out' page shows services."*

## 2:30 to 3:30: How we worked, and how we used Claude

> After the demo, the focus is how we worked together and used Claude, not the problem itself.

- **How we worked:** the merge captain drove one shared screen. Each person worked on their own branch and asked Claude to share: it committed, merged into the shared version, and the big screen refreshed. Mthoko, as product owner, recorded the decisions.
- **How we used Claude:**
  - **Research:** David asked which helplines are best for what problem. Claude researched real Scottish helplines and left out one it couldn't confirm.
  - **Build:** a first version on screen at 16:01, then small changes in plain words.
  - **Test:** Mthoko walked the prototype as *"a mother who's kept awake at night, it's 2am"*; Chay asked *"Can you test the pages"*.
  - **Share:** *"can you make sure everything is pushed, get the latest and then test everything"*.
  - **And afterwards, this presentation:** Eloise asked Claude for a structure for an 8 to 10 minute talk. It drafted the showcase from our learning logs and the git history, quoting reflections word for word, then built the slides from the Mercator template. We steered it: shorter bullets, one demo, then a focus on how we worked. People still had to fill the gaps it couldn't: Bradley's and Mthoko's reflections, and checking the slides in PowerPoint.

**The timeline:**

- **15:16** squad named, **15:41** challenge picked, then talked it through. Mthoko sketched the triage questions while Eloise built.
- **16:01** first version on the shared screen. From then on it was small, frequent shares: **57 shares between 15:00 and the hard stop**, all merged into one shared version, with the big screen refreshing as they landed.
- The last hour added the things that make it humane: a family path, a naloxone guide, advice you can act on now, a language menu, and a calmer look.

## 3:30 to 4:30: What didn't go smoothly, and why

- **Git and sharing** still got in the way for some of us, even with Claude doing it. Sign-in and signing keys needed a person to sort out.
- **Claude got things wrong** (below), and walking the journey as the person is what caught it.
- **Rushed edits** (below): change is easy with AI, and so is undoing it.

The detail, for speaker notes:

- **We nearly showed the wrong help.** Testing another journey, someone staying sober on a Friday night, as the person, the first results were drop-ins offering clean injecting equipment. It was fixed minutes before the hard stop, but only because we walked the journey as the person.
- **Open data can't answer "what's open at 2am?"** Scotland's open directory of services (ALISS) has phone numbers and addresses, but no opening hours, so every "open now" in our prototype is made up. That's a finding in itself: structured opening hours are the missing piece.
- **Too many cooks in the last ten minutes.** Between 18:30 and 18:42, the demo time options were changed seven times, adding them and rolling them back. Rushed changes on one shared file are easy with AI, and so is undoing them.

## 4:30 to 7:30: The tooling, our roles, and building as a squad

**Everyone did something outside their job:**
- **Chay (QA engineer)** built a voice companion that listens and talks back, normally a developer's job. Then he used Claude to test every screen. In his words: *"I spun up a work board which if functional, could be used to scale up this project and be used on other projects."*
- **David (content designer)** asked *"If someone chooses 'someone to talk to' then can we breakdown which helplines are best for what problem?"*. Claude offered three designs, and he chose and shipped a new question with real, sourced Scottish helplines. He also restyled the whole app.
- **Bradley (user researcher)** built the family and friends path and the "Where help runs out" page for services. **[to fill: Bradley, in your words]**
- **Mthoko (delivery manager)** walked the prototype as *"a mother who's kept awake at night, it's 2am"*, which found three gaps and became our main scenario. **[to fill: Mthoko, in your words]**
- **Eloise (software developer)** did research, accessibility checks and data, not just code, including checking sources on every real helpline.

**What surprised us:**
- David: *"building in Claude has really fleshed out some fuzzy ideas super quick and then allowed us to constantly refine"*.
- One prompt did a whole release check: *"can you make sure everything is pushed, get the latest and then test everything"*.
- Claude was careful with facts: it left out helplines it couldn't confirm, and every real service shows when it was checked.
- Chay: *"I think not be frightened of these tools and embrace the change.  Their potential to expedite manual and create new tools is only limited to the imagination which is both scary and inspiring."*

**What made working as a squad easy or hard:**
- **Easy:** the shared screen, and talking ideas through as we built.
- **Hard:** git and sharing, and time. Squad members used AI very differently before the day, from every day to hardly ever.
- **We still needed specialists**, even with AI:
  - David (often): *"If it's not the skills, it's the intuition and related interest that often makes human intervention valuable."*
  - Chay (rarely): *"When deploying live I need help with scaling and security aspects of this."*
  - Eloise (sometimes): *"I needed help with what is most useful to prioritise for a demo. Also with what areas are good to focus on for accessibility"*
- Next time: David suggests *"picking the challenge we want to solutionise and having an opportunity to do a mini-discovery before the day"*; Chay wanted *"a clearer timetable for post hackathon tasks"*; Eloise wanted *"A short break between end of coding and start of presentations"*.
- **[to fill: Bradley's and Mthoko's views, including anything sceptical. Say it straight]**

## 7:30 to 9:00: Ideas to carry forward, and what Mercator should take from this

- **Eloise:** *"I liked discussing through all our different ideas as we worked."* What she learned: *"There's so many different considerations needed for a project when you look at it from different roles."*
- **Chay:** *"I think its now taking the tools or the poc's and elevating them to be fully functional and deployed live."* Where it fits: client work where the tools are permitted. Not shared yet, but he plans to raise it with his team.
- **David:** *"Keep using AI for doing the fiddly bits for certain kinds of work, like putting together a presentation,  because it can be a massive time saver."* He tried it: he gave Claude the Mercator slide deck template and his ideas, and got *"a good starter for 10"*.
- **Eloise** tried hers *"when working with others in a claude workshop in the office"*.
- **Bradley:** *"Using claude more so that I get more used to 'thinking to use it' i'm. still in a stage where i'm not sure what i can ask/can't ask it to do... what i can delegate vs what i ought not to etc."* Where it fits: internal work, a bid, client work where the tools are permitted. Not tried yet: *"just research sessions where i'm not sure if i'm allowed to use AI - still a lot of guardrails that i'm not famliar with so its easier to err on the side of not using it"*. What he learned: *"I think it's how to use cluade as a teammate and work with others. I learned how using laude amplified what we got out as a team"*. Specialist help (rarely): *"If things in my sessions get overly technical that I can't answer credibly, I lean on tech leads for support"*.
- **[to fill: one idea from Mthoko, and where it went]**
- **For Mercator, from Bradley:** people need clear guardrails on when they can use AI, or they'll err on the side of not using it.
- **For Mercator:**
  - Mixed squads with AI build fast, and it's the mix of roles that catches the human problems (like the wrong help for someone staying sober).
  - Small, frequent shares onto one shared screen kept five people building at once without clashes.
  - AI makes it easy to change things, so you need someone keeping an eye on what's changing.

## 9:00 to 10:00: Questions

---

The checklist for getting ready is in `checklist.md`.
