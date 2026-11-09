# Showcase notes: Squad Gusto (fuller version, for the slide deck)

> The longer version of `showcase.md`, kept for writing slides and speaker notes. `showcase.md` has the short bullets to present from. If one changes, check the other.

**Wednesday 11 November, 14:00 to 15:40, on Teams.** 10-minute slot: about 9 minutes presenting, then 1 minute for questions.
**Challenge 2: Help when it's needed.** Presenters: _(to confirm)_. Recording, if we send one: to Sheldon Gold by Tuesday 10 November.

> Draft by Eloise with Claude, 9 November. Lines marked **[to fill]** need the squad: most of them come from everyone's `/reflect`, which only Eloise has started so far.

---

## 0:00 to 1:00: The challenge and what we built

- **The problem:** Scotland has the highest drug and alcohol death rates in the UK and Europe. Most help is open 9 to 5 on weekdays, but people are most alone at night. One charity report found more than 80% of Scottish drug services are closed at weekends.
- **What we built:** *Get the support you need*, a digital first responder for anyone affected by substance use, day or night. A few questions, no name and nothing saved, then what's **open now**, what **opens in the next two hours**, and the **24-hour lines**. Nobody gets sent to a closed door.
- It works for four people: **me**, **someone I care about**, **someone I support through work**, and **someone I don't know who needs help**.

## 1:00 to 2:30: Demo: the mum at 3am

Set **Pretend the time is** to **Sunday 3am** first (bottom of the page). Then click, saying what she'd feel:

1. **No, not right now → Someone I care about.** *"It's 3am. Her son is 20 and hasn't come home again after Saturday night."* The app says: *"It's hard when someone you care about is using. You're not on your own."*
2. **I don't know what to do or say.** What to do tonight, and how to talk tomorrow: *"I'm worried about you", not "You always…"*. No blame, no lecture.
3. **Find help for them → Help for them to cut down or stop.** It doesn't ask where she is, because nothing nearby opens soon.
4. **The results are honest:** *"Nothing near you is open right now."* It shows what she can do now, the 24-hour lines, and **"Support for you, too"**, with the families line **opening at 10am**.

Close with: *"At 3am, help really does run out. That's what the app is honest about, and it's what the 'Where help runs out' page shows services."*

## 2:30 to 3:30: How the afternoon actually went

- **15:16** squad named, **15:41** challenge picked, then talked it through. Mthoko sketched the triage questions while Eloise built.
- **16:01** first version on the shared screen. From then on it was small, frequent shares: **57 shares between 15:00 and the hard stop**, all merged into one shared version, with the big screen refreshing as they landed.
- **At the look together:** **[to fill: what was working, what was confusing, what was missing. The notes in TEAM.md are empty, so the squad needs to remember]**.
- The last hour added the things that make it humane: a family path, a naloxone guide, advice you can act on now, a language menu, and a calmer look.

## 3:30 to 4:30: What didn't work, and why

- **We nearly showed the wrong help.** Testing another journey, someone staying sober on a Friday night, as the person, the first results were drop-ins offering clean injecting equipment. It was fixed minutes before the hard stop, but only because we walked the journey as the person.
- **Open data can't answer "what's open at 2am?"** Scotland's open directory of services (ALISS) has phone numbers and addresses, but no opening hours, so every "open now" in our prototype is made up. That's a finding in itself: structured opening hours are the missing piece.
- **Too many cooks in the last ten minutes.** Between 18:30 and 18:42, the demo time options were changed seven times, adding them and rolling them back. Rushed changes on one shared file are easy with AI, and so is undoing them.

## 4:30 to 7:30: The tooling, our roles, and building as a squad

**Everyone did something outside their job:**
- **Chay (QA engineer)** built a voice companion that listens and talks back, normally a developer's job. Then he used Claude to test every screen.
- **David (content designer)** asked *"If someone chooses 'someone to talk to' then can we breakdown which helplines are best for what problem?"*. Claude offered three designs, and he chose and shipped a new question with real, sourced Scottish helplines. He also restyled the whole app.
- **Bradley (user researcher)** built the family and friends path and the "Where help runs out" page for services. **[to fill: Bradley, in your words]**
- **Mthoko (delivery manager)** walked the prototype as *"a mother who's kept awake at night, it's 2am"*, which found three gaps and became our main scenario. **[to fill: Mthoko, in your words]**
- **Eloise (software developer)** did research, accessibility checks and data, not just code, including checking sources on every real helpline.

**What surprised us:**
- David: *"building in Claude has really fleshed out some fuzzy ideas super quick and then allowed us to constantly refine"*.
- One prompt did a whole release check: *"can you make sure everything is pushed, get the latest and then test everything"*.
- Claude was careful with facts: it left out helplines it couldn't confirm, and every real service shows when it was checked.

**What made working as a squad easy or hard:**
- **Easy:** the shared screen, and talking ideas through as we built.
- **Hard:** git and sharing, and time. Squad members used AI very differently before the day, from every day to hardly ever. **[to fill: anything sceptical or frustrating from the reflections. Say it straight]**

## 7:30 to 9:00: Ideas to carry forward, and what Mercator should take from this

- **Eloise:** *"I liked discussing through all our different ideas as we worked."* What she learned: *"There's so many different considerations needed for a project when you look at it from different roles."*
- **[to fill: one idea each from Chay, David, Bradley and Mthoko, and where it went]**
- **For Mercator:**
  - Mixed squads with AI build fast, and it's the mix of roles that catches the human problems (like the wrong help for someone staying sober).
  - Small, frequent shares onto one shared screen kept five people building at once without clashes.
  - AI makes it easy to change things, so you need someone keeping an eye on what's changing.

## 9:00 to 10:00: Questions

---

## Before Wednesday

- [ ] Everyone runs `/reflect` (about 5 minutes), so the **[to fill]** lines can be filled in
- [ ] Agree who presents, and whether we go live or send a recording (by Tuesday 10 November)
- [ ] Presenters: say "get the latest and make it run for me", then rehearse the demo once
- [ ] Time a run-through: if it's over 9 minutes, trim "How the afternoon went" first
