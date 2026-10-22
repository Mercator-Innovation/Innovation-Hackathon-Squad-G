// Behaviour: the journey from "is anyone in danger?" to "here is who can help".
// The words live in content.js and the services in data/services.js.

(function () {
  var C = window.CONTENT;   // the words on screen; changes when someone picks a language
  var services = window.DATA.services;
  var main = document.getElementById("main");
  var pretendSelect = document.getElementById("pretend-time");

  // What the person has chosen so far, and the screens they have seen (for Back).
  var answers = { who: null, need: null, topic: null, where: null };
  var MAX_MILES = 30;
  var SOON_MINUTES = 120;   // "Opening in the next 2 hours"
  var history = [];

  // ---- Time: real or pretend ----

  function currentTime() {
    var choice = window.DATA.pretendTimes.find(function (t) { return t.id === pretendSelect.value; });
    if (!choice || choice.id === "now") {
      var d = new Date();
      return { day: d.getDay(), hour: d.getHours() + d.getMinutes() / 60 };
    }
    return { day: choice.day, hour: choice.hour };
  }

  // Open if today's hours cover now, or yesterday's overnight hours run past midnight.
  function isOpen(service, t) {
    var yesterday = (t.day + 6) % 7;
    return service.hours.some(function (h) {
      var today = h.days.indexOf(t.day) !== -1 && t.hour >= h.from && t.hour < h.to;
      var overnight = h.days.indexOf(yesterday) !== -1 && h.to > 24 && t.hour + 24 < h.to;
      return today || overnight;
    });
  }

  // When a closed service next opens: words like "tomorrow at 9am", and minutes from now.
  function nextOpening(service, t) {
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for (var offset = 0; offset < 8; offset++) {
      var day = (t.day + offset) % 7;
      var starts = service.hours
        .filter(function (h) { return h.days.indexOf(day) !== -1 && (offset > 0 || h.from > t.hour); })
        .map(function (h) { return h.from; })
        .sort(function (a, b) { return a - b; });
      if (starts.length) {
        var when = offset === 0 ? "today" : offset === 1 ? "tomorrow" : dayNames[day];
        return {
          words: when + " at " + formatHour(starts[0]),
          minutes: Math.round((offset * 24 + starts[0] - t.hour) * 60),
        };
      }
    }
    return { words: "", minutes: Infinity };
  }

  // 80 minutes as "1 hour 20 minutes".
  function formatWait(minutes) {
    var h = Math.floor(minutes / 60), m = minutes % 60;
    var parts = [];
    if (h) parts.push(h + (h === 1 ? " hour" : " hours"));
    if (m) parts.push(m + (m === 1 ? " minute" : " minutes"));
    return parts.join(" ");
  }

  function formatHour(h) {
    if (h === 0) return "midnight";
    if (h === 12) return "midday";
    return h < 12 ? h + "am" : (h - 12) + "pm";
  }

  // ---- Location: worked out on this device, never saved ----

  function milesBetween(a, b) {
    var rad = Math.PI / 180;
    var dLat = (b.lat - a.lat) * rad;
    var dLng = (b.lng - a.lng) * rad;
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 3959 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  }

  function nearestTown(point) {
    var best = null;
    Object.keys(window.PLACES.towns).forEach(function (name) {
      var d = milesBetween(point, window.PLACES.towns[name]);
      if (!best || d < best.d) best = { name: name, d: d };
    });
    return best.name;
  }

  // A town name ("greenock") or postcode ("PA15 1AB", "PA15", "G1") to a place, or null.
  function findPlace(typed) {
    var towns = window.PLACES.towns;
    var text = typed.trim().toLowerCase();
    var townName = Object.keys(towns).find(function (n) { return n.toLowerCase() === text; });
    if (!townName) {
      var code = typed.toUpperCase().replace(/\s+/g, "");
      if (/^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/.test(code)) code = code.slice(0, -3); // drop the last part
      if (/^[A-Z]{1,2}\d[A-Z\d]?$/.test(code) || /^[A-Z]{1,2}$/.test(code)) {
        var letters = code.match(/^[A-Z]+/)[0];
        townName = window.PLACES.postcodes[code] || window.PLACES.postcodes[letters];
      }
    }
    if (!townName) return null;
    return { name: townName, lat: towns[townName].lat, lng: towns[townName].lng };
  }

  // Is there an in-person place (with a town) for this person's situation that's open now
  // or opens within 2 hours? If not, there's no point asking where they are.
  // Does this service suit who the help is for? For someone they don't know, show what that
  // person could use themselves, or with a friend's help. Not family-only or workers-only support.
  function whoFits(s) {
    if (!s.who) return true;
    if (answers.who === "stranger") return !s.forFamily && (s.who.indexOf("me") !== -1 || s.who.indexOf("someone") !== -1);
    return s.who.indexOf(answers.who) !== -1;
  }

  // Does it suit what they need? "I'm not sure" means everything.
  function needFits(s) {
    var need = answers.need === "any" || s.needs.indexOf("all") !== -1 || s.needs.indexOf(answers.need) !== -1;
    return need && topicFits(s);
  }

  // "Someone to talk to": does it suit what's on their mind? Services with no topics suit anything.
  function topicFits(s) {
    if (answers.need !== "talk" || !answers.topic || answers.topic === "unsure" || !s.topics) return true;
    return s.topics.indexOf(answers.topic) !== -1;
  }

  function hasPlacesToVisit() {
    var t = currentTime();
    return services.concat(window.HELPLINES).some(function (s) {
      if (!s.town) return false;
      if (!whoFits(s)) return false;
      var forThem = s.forFamily && answers.who === "someone";
      if (!forThem && !needFits(s)) return false;
      if (!s.hours) return true;                     // helplines never close
      return isOpen(s, t) || nextOpening(s, t).minutes <= SOON_MINUTES;
    });
  }

  function distanceTo(service) {
    if (!service.town || !answers.where) return null;
    return milesBetween(answers.where, window.PLACES.towns[service.town]);
  }

  // ---- Drawing screens ----

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") node.textContent = attrs[k];
      else if (k === "onclick") node.addEventListener("click", attrs[k]);
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  // Draw a screen. The page title names the step, and focus moves to the new heading
  // so screen readers announce the question (not on first load, or when the time control changes).
  function show(screen, remember, moveFocus) {
    if (remember !== false && history[history.length - 1] !== screen) history.push(screen);
    main.innerHTML = "";
    screens[screen]();
    var heading = main.querySelector("h1");
    document.title = heading.textContent + " – " + C.appName;
    if (moveFocus !== false) {
      heading.setAttribute("tabindex", "-1");
      heading.focus();
    }
  }

  function backButton() {
    if (history.length < 2) return null;
    return el("button", {
      class: "back", type: "button", text: "‹ " + C.back,
      onclick: function () { history.pop(); show(history[history.length - 1], false); },
    });
  }

  function choiceList(options, onPick) {
    return el("ul", { class: "choices" }, options.map(function (o) {
      return el("li", {}, [el("button", {
        class: "button", type: "button", text: o.label,
        onclick: function () { onPick(o.id); },
      })]);
    }));
  }

  // Once we know what they need: only ask where they are if there's somewhere to go in person for this.
  function pickNeed(id) {
    answers.need = id;
    answers.topic = null;
    if (id === "talk") { show("topic"); return; }   // ask what's on their mind first
    afterNeed();
  }

  function afterNeed() {
    if (hasPlacesToVisit()) { show("where"); } else { answers.where = null; show("results"); }
  }

  // ---- Low battery mode: kept in memory only, never saved ----

  var lite = false;
  var liteButton = document.getElementById("lite-toggle");

  function drawLiteButton() {
    liteButton.textContent = C.lite.toggle;
    liteButton.append(el("span", { "aria-hidden": "true", text: ": " + (lite ? C.lite.on : C.lite.off) }));
    liteButton.setAttribute("aria-pressed", String(lite));
    document.body.classList.toggle("lite", lite);
  }

  // Phone and text only: web chat needs data.
  function usableInLite(s) {
    return s.lowData !== false && (s.contact.phone || s.contact.text || s.contact.visit);
  }

  // One line per service: "Samaritans: call 116 123".
  function numberLine(s) {
    var c = s.contact, parts = [];
    if (c.phone) parts.push(C.results.ways.phone.toLowerCase() + " " + c.phone);
    if (c.text) parts.push(C.results.ways.text.toLowerCase() + " " + (c.textWord ? c.textWord + " " + C.results.textWordTo + " " : "") + c.text);
    return parts.length ? s.name + ": " + parts.join(", ") : null;
  }

  function numbersText(list) {
    return [C.lite.emergency + ": call 999"].concat(list.map(numberLine).filter(Boolean)).join("\n");
  }

  // "Copy these numbers" and "Text them to myself".
  function saveNumbers(list) {
    var text = numbersText(list);
    var note = el("p", { class: "message", role: "status" });
    return el("div", { class: "save-numbers" }, [
      el("button", {
        class: "button", type: "button", text: C.lite.copy,
        onclick: function () {
          if (!navigator.clipboard) { note.textContent = C.lite.copyFailed; return; }
          navigator.clipboard.writeText(text).then(
            function () { note.textContent = C.lite.copied; },
            function () { note.textContent = C.lite.copyFailed; });
        },
      }),
      el("a", { class: "button", href: "sms:?&body=" + encodeURIComponent(text), text: C.lite.textMyself }),
      note,
    ]);
  }

  var screens = {
    numbers: function () {
      var t = currentTime();
      var always = window.HELPLINES.filter(function (h) { return h.always; });
      var openNow = services.filter(function (s) { return !s.town && isOpen(s, t) && usableInLite(s); });
      var list = always.concat(openNow);
      main.append(
        backButton(),
        el("h1", { text: C.lite.numbersHeading }),
        el("p", { text: C.lite.numbersIntro }),
        el("ul", { class: "numbers" }, [el("li", {}, [el("a", { href: "tel:999", text: C.lite.emergency + ": 999" })])].concat(
          list.map(function (s) {
            var tel = s.contact.phone ? "tel:" + s.contact.phone.replace(/\s/g, "") : "sms:" + s.contact.text;
            return el("li", {}, [el("a", { href: tel, text: numberLine(s) })]);
          }))),
        saveNumbers(list)
      );
    },

    start: function () {
      main.append(
        el("h1", { text: C.start.heading }),
        el("p", { text: C.start.intro }),
        el("p", { class: "meta", text: C.start.examples }),
        el("ul", { class: "choices" }, [
          el("li", {}, [el("button", { class: "button danger", type: "button", text: C.start.yes, onclick: function () { show("emergency"); } })]),
          el("li", {}, [el("button", { class: "button", type: "button", text: C.start.no, onclick: function () { show("who"); } })]),
          lite ? el("li", {}, [el("button", { class: "button", type: "button", text: C.lite.numbersButton, onclick: function () { show("numbers"); } })]) : null,
        ]),
        el("section", { class: "privacy", "aria-labelledby": "privacy-heading" }, [
          el("h2", { id: "privacy-heading", text: C.privacy.heading }),
          el("ul", {}, C.privacy.points.map(function (p) { return el("li", { text: p }); })),
        ])
      );
    },

    emergency: function () {
      main.append(
        backButton(),
        el("h1", { text: C.emergency.heading }),
        el("p", { text: C.emergency.intro }),
        el("a", { class: "button danger", href: "tel:999", text: C.emergency.callLabel }),
        el("ol", { class: "steps" }, C.emergency.steps.map(function (s) { return el("li", { text: s }); })),
        el("p", { text: C.emergency.after }),
        el("button", { class: "button", type: "button", text: C.emergency.continueLabel, onclick: function () { show("who"); } })
      );
    },

    who: function () {
      main.append(
        backButton(),
        el("h1", { text: C.who.heading }),
        choiceList(C.who.options, function (id) {
          answers.who = id;
          show(id === "someone" ? "family" : "need");   // family and friends get their own first step
        })
      );
    },

    // Family and friends: what's going on for them, before the usual "what do you need?".
    family: function () {
      main.append(
        backButton(),
        el("h1", { text: C.family.heading }),
        el("p", { text: C.family.intro }),
        choiceList(C.family.options, function (id) {
          if (id === "overdose") show("overdose");
          else if (id === "tonight") show("tonight");
          else if (id === "for-me") pickNeed("family");
          else show("need");
        })
      );
    },

    overdose: function () {
      main.append(
        backButton(),
        el("h1", { text: C.overdose.heading }),
        el("p", { text: C.overdose.intro }),
        el("ul", {}, C.overdose.signs.map(function (s) { return el("li", { text: s }); })),
        el("a", { class: "button danger", href: "tel:999", text: C.overdose.callLabel }),
        el("h2", { text: C.overdose.doHeading }),
        el("ol", { class: "steps" }, C.emergency.steps.map(function (s) { return el("li", { text: s }); })),
        el("h2", { text: C.overdose.dontHeading }),
        el("ul", {}, C.overdose.donts.map(function (s) { return el("li", { text: s }); })),
        el("h2", { text: C.overdose.naloxoneHeading }),
        el("p", { text: C.overdose.naloxone }),
        el("button", { class: "button", type: "button", text: C.overdose.next, onclick: function () { pickNeed("family"); } })
      );
    },

    tonight: function () {
      main.append(
        backButton(),
        el("h1", { text: C.tonight.heading }),
        el("p", { text: C.tonight.intro }),
        el("ol", { class: "steps" }, C.tonight.steps.map(function (s) { return el("li", { text: s }); })),
        el("button", { class: "back", type: "button", text: C.tonight.overdoseLink, onclick: function () { show("overdose"); } }),
        el("h2", { text: C.tonight.tomorrowHeading }),
        el("ul", {}, C.tonight.tomorrow.map(function (s) { return el("li", { text: s }); })),
        el("p", { class: "meta", text: C.tonight.checkNote }),
        el("ul", { class: "choices" }, [
          el("li", {}, [el("button", { class: "button primary", type: "button", text: C.tonight.forMe, onclick: function () { pickNeed("family"); } })]),
          el("li", {}, [el("button", { class: "button", type: "button", text: C.tonight.forThem, onclick: function () { show("need"); } })]),
        ])
      );
    },

    need: function () {
      main.append(
        backButton(),
        el("h1", { text: C.need[answers.who].heading }),
        el("p", { class: "meta", text: C.need[answers.who].hint || C.need.hint }),
        choiceList(C.need[answers.who].options, pickNeed)
      );
    },

    // After "Someone to talk to": what's on their mind, so we show the right helplines.
    topic: function () {
      var words = answers.who === "me" ? C.topic.me : C.topic.them;
      main.append(
        backButton(),
        el("h1", { text: words.heading }),
        el("p", { class: "meta", text: C.topic.hint }),
        choiceList(words.options, function (id) { answers.topic = id; afterNeed(); })
      );
    },

    where: function () {
      var message = el("p", { class: "message", role: "status" });
      var useButton = el("button", {
        class: "button", type: "button", text: C.where.useLocation,
        onclick: function () {
          if (!navigator.geolocation) { message.textContent = C.where.locationFailed; return; }
          message.textContent = C.where.finding;
          navigator.geolocation.getCurrentPosition(function (pos) {
            var point = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            answers.where = { name: nearestTown(point), lat: point.lat, lng: point.lng };
            show("results");
          }, function () {
            message.textContent = C.where.locationFailed;
            input.focus();
          }, { timeout: 10000, maximumAge: 600000 });
        },
      });

      var input = el("input", { id: "where-input", type: "text", autocomplete: "postal-code", "aria-describedby": "where-hint" });
      var error = el("p", { id: "where-error", class: "field-error" });
      var form = el("form", { class: "where-form", novalidate: "" }, [
        el("label", { for: "where-input", text: C.where.typeLabel }),
        el("p", { id: "where-hint", class: "meta", text: C.where.typeHint }),
        error,
        input,
        el("button", { class: "button primary", type: "submit", text: C.where.typeButton }),
      ]);
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var place = findPlace(input.value);
        if (!place) {
          error.textContent = C.where.notFound;
          input.setAttribute("aria-invalid", "true");
          input.setAttribute("aria-describedby", "where-hint where-error");
          input.focus();
          return;
        }
        answers.where = place;
        show("results");
      });

      main.append(
        backButton(),
        el("h1", { text: C.where.heading }),
        el("p", { text: C.where.intro }),
        useButton,
        el("p", { class: "meta", text: C.where.useLocationWhy }),
        message,
        form,
        el("button", {
          class: "button", type: "button", text: C.where.skip,
          onclick: function () { answers.where = null; show("results"); },
        })
      );
    },

    results: function () {
      var t = currentTime();
      var matches = services.filter(function (s) {
        if (!whoFits(s) || !needFits(s)) return false;
        if (lite && !usableInLite(s)) return false;    // low battery: no web chat
        if (!s.town) return true;                      // phone and online: anywhere
        var d = distanceTo(s);
        return d !== null && d <= MAX_MILES;           // in person: only if near enough
      });
      // Places you can walk into come first, nearest first; then phone and online.
      matches.sort(function (a, b) {
        var da = distanceTo(a), db = distanceTo(b);
        if (da === null && db === null) return 0;
        if (da === null) return 1;
        if (db === null) return -1;
        return da - db;
      });
      var open = matches.filter(function (s) { return isOpen(s, t); });
      var closed = matches.filter(function (s) { return !isOpen(s, t); });
      var soon = closed.filter(function (s) { return nextOpening(s, t).minutes <= SOON_MINUTES; });
      var later = closed.filter(function (s) { return soon.indexOf(s) === -1; });

      // Help that never closes. If nothing else is open, show the fuller list (A&E, the council…).
      var anyTime = window.HELPLINES.filter(function (h) {
        if (!needFits(h)) return false;
        if (!h.always && open.length) return false;
        if (!h.town) return true;
        var d = distanceTo(h);
        return d !== null && d <= MAX_MILES;
      });

      main.append(backButton(), el("h1", { text: C.results.heading }), el("p", { text: C.results.intro }));
      if (answers.where) {
        main.append(el("p", { class: "meta" }, [
          document.createTextNode(C.results.near + " " + answers.where.name + ". " + C.results.tooFarNote + " "),
          el("button", { class: "back", type: "button", text: C.results.changeLocation, onclick: function () { show("where"); } }),
        ]));
      }
      // Low battery: offer to save the numbers first, while there's still charge.
      if (lite) {
        main.append(el("p", { class: "meta", text: C.lite.hiddenNote }),
          saveNumbers(open.concat(soon, anyTime)));
      }
      // Steps people can take themselves, for "use more safely" and "cut down or stop".
      var advice = C.advice[answers.need];
      if (advice) {
        var steps = advice[answers.who === "me" ? "me" : "them"];
        var SHOWN = 4;
        var stepItem = function (text) { return el("li", { text: text }); };
        main.append(el("section", { class: "advice", "aria-labelledby": "advice-heading" }, [
          el("h2", { id: "advice-heading", text: C.advice.heading }),
          el("ol", {}, steps.slice(0, SHOWN).map(stepItem)),
          steps.length > SHOWN ? el("details", {}, [
            el("summary", { text: C.advice.more }),
            el("ol", { start: String(SHOWN + 1) }, steps.slice(SHOWN).map(stepItem)),
          ]) : null,
          el("p", { class: "advice-sources" }, [document.createTextNode(C.advice.sourcesLabel + " ")].concat(
            advice.sources.reduce(function (list, src, i) {
              if (i) list.push(document.createTextNode(", "));
              list.push(el("a", { href: src.url, text: src.label }));
              return list;
            }, []))),
        ]));
      }

      main.append(el("h2", { text: C.results.openHeading }));
      if (open.length) {
        open.forEach(function (s) { main.append(serviceCard(s, "open", t)); });
      } else {
        main.append(el("p", { text: C.results.noneOpen }));
        anyTime.forEach(function (h) { main.append(serviceCard(h, "allday", t)); });
        countGap(t);
      }
      if (soon.length) {
        main.append(el("h2", { text: C.results.soonHeading }));
        soon.forEach(function (s) { main.append(serviceCard(s, "soon", t)); });
      }
      // Family and friends get their own support too, whatever they picked.
      if (answers.who === "someone") {
        var family = services.filter(function (s) {
          if (!s.forFamily || matches.indexOf(s) !== -1) return false;
          if (lite && !usableInLite(s)) return false;
          if (!s.town) return true;
          var d = distanceTo(s);
          return d !== null && d <= MAX_MILES;
        });
        if (family.length) {
          main.append(el("h2", { text: C.results.familyHeading }), el("p", { text: C.results.familyIntro }));
          family
            .map(function (s) { return { s: s, open: isOpen(s, t), wait: nextOpening(s, t).minutes }; })
            .sort(function (a, b) { return (b.open - a.open) || (a.wait - b.wait); })
            .forEach(function (f) {
              var state = f.open ? "open" : f.wait <= SOON_MINUTES ? "soon" : "later";
              main.append(serviceCard(f.s, state, t));
            });
        }
      }
      // Always end with the lines that never close (already shown above if nothing was open).
      if (open.length && anyTime.length) {
        main.append(el("h2", { text: C.results.allDayHeading }));
        anyTime.forEach(function (h) { main.append(serviceCard(h, "allday", t)); });
      }
      // Closed for longer: hidden until someone asks, so the list stays short.
      if (later.length) {
        main.append(el("details", { class: "later" }, [
          el("summary", { text: C.results.showLater + " (" + later.length + ")" }),
        ].concat(later.map(function (s) { return serviceCard(s, "later", t); }))));
      }
      // A voice to talk to while you wait (companion.html). Not in low battery mode: it needs data.
      if (!lite) main.append(el("div", { class: "service" }, [
        el("h2", { text: C.results.companionHeading }),
        el("p", { text: C.results.companionText }),
        el("a", { class: "button", href: "companion.html", text: C.results.companionLink }),
      ]));
      main.append(el("button", {
        class: "button primary", type: "button", text: C.results.startAgain,
        onclick: function () { answers = { who: null, need: null, topic: null, where: null }; history = []; show("start"); },
      }));
    },
  };

  function serviceCard(s, state, t) {
    var next = s.hours ? nextOpening(s, t) : null;
    var status;
    if (state === "allday") status = el("p", { class: "status open", text: s.status || C.results.allDay });
    else if (state === "open") status = el("p", { class: "status open", text: C.results.openNow });
    else if (state === "soon") status = el("p", { class: "status soon", text: C.results.opensAt + " " + next.words.replace("today at ", "") + ", " + C.results.opensIn + " " + formatWait(next.minutes) + "." });
    else status = el("p", { class: "status closed", text: C.results.closedNow + ". " + C.results.opensAt + " " + next.words + "." });

    var ways = Object.keys(s.contact).filter(function (way) { return way !== "textWord"; }).map(function (way) {
      var label = C.results.ways[way];
      var value = s.contact[way];
      if (way === "phone") return el("a", { href: "tel:" + value.replace(/\s/g, ""), text: label + " " + value });
      if (way === "text" && s.contact.textWord) {
        return el("a", { href: "sms:" + value + "?&body=" + s.contact.textWord, text: label + " " + s.contact.textWord + " " + C.results.textWordTo + " " + value });
      }
      if (way === "text") return el("a", { href: "sms:" + value, text: label + " " + value });
      if (way === "chat") return lite ? null : el("a", { href: value, text: label });
      return el("span", { text: label + ": " + value });
    }).filter(Boolean);

    return el("section", { class: "service", "aria-label": s.name }, [
      el("h3", { text: s.name }),
      status,
      s.anonymous ? el("p", { class: "no-name", text: C.results.noName }) : null,
      el("p", { text: s.what }),
      placeText(s) ? el("p", { class: "meta", text: placeText(s) + (s.lowData ? " · " + C.results.lowData : "") }) : null,
      ways.length ? el("div", { class: "ways" }, ways) : null,
      // Real services say when we checked them and where the details come from.
      s.checked ? el("p", { class: "checked" }, [
        document.createTextNode(C.results.checked + " " + s.checked + (s.checkedNote ? " (" + s.checkedNote + ")" : "") + ". "),
        el("a", { href: s.source, text: C.results.source }),
      ]) : null,
    ]);
  }

  function placeText(s) {
    if (!s.town) return s.area || "";
    var d = distanceTo(s);
    if (d === null) return s.town;
    return s.town + ", " + (d < 1 ? C.results.lessThanAMile.toLowerCase() : Math.round(d) + " " + C.results.milesAway);
  }

  // ---- Gaps: counting when nothing is open, for services (gaps.html) ----
  // A real service would send this anonymous count to a shared store: area, day, time band, need.
  // No names, no exact location. The prototype sends and saves nothing: it only logs it here.

  function timeBand(t) {
    var h = t.hour;
    if (h >= 18 && h < 22) return "6pm to 10pm";
    if (h >= 22 || h < 2) return "10pm to 2am";
    if (h < 6) return "2am to 6am";
    return (t.day === 0 || t.day === 6) ? "Weekend daytime" : "Weekday daytime";
  }

  function countGap(t) {
    var gap = {
      area: answers.where ? answers.where.name : "Not given",
      day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][t.day],
      band: timeBand(t),
      who: answers.who,
      need: answers.need,
    };
    console.info("Gap counted (prototype: not sent or saved)", gap);
  }

  // ---- Languages: English underneath, with any translated words on top ----

  function mergeWords(english, translated) {
    if (translated === undefined) return english;
    if (typeof english !== "object" || english === null || Array.isArray(english)) return translated;
    var out = {};
    Object.keys(english).forEach(function (k) { out[k] = mergeWords(english[k], translated[k]); });
    return out;
  }

  var languageSelect = document.getElementById("language");
  var languageNote = document.getElementById("language-note");

  function drawHeader() {
    document.getElementById("app-name").textContent = C.appName;
    document.getElementById("tagline").textContent = C.tagline;
    document.getElementById("prototype-note").textContent = C.prototypeNote;
    document.getElementById("pretend-label").textContent = C.timeControl;
    document.getElementById("language-label").textContent = C.language.label;
  }

  function setLanguage(code) {
    var info = window.LANGUAGES.find(function (l) { return l.code === code; });
    var words = window.TRANSLATIONS[code];
    var translated = code === "en" || (words && Object.keys(words).length > 0);
    C = code === "en" ? window.CONTENT : mergeWords(window.CONTENT, words || {});
    // Only say the page is in Scots or Gaelic once there are real translations.
    document.documentElement.lang = translated ? info.lang : "en-GB";
    languageNote.textContent = translated ? "" : C.language.notYet;
    drawHeader();
    drawLiteButton();
  }

  window.LANGUAGES.forEach(function (l) {
    languageSelect.append(el("option", { value: l.code, lang: l.lang, text: l.name }));
  });
  languageSelect.addEventListener("change", function () {
    setLanguage(languageSelect.value);
    show(history[history.length - 1] || "start", false, false);
  });

  // ---- Start up ----

  drawHeader();
  window.DATA.pretendTimes.forEach(function (t) {
    pretendSelect.append(el("option", { value: t.id, text: t.label }));
  });
  pretendSelect.addEventListener("change", function () {
    if (history[history.length - 1] === "results") show("results", false, false);
  });

  liteButton.addEventListener("click", function () {
    lite = !lite;
    drawLiteButton();
    show(history[history.length - 1] || "start", false, false);
  });
  drawLiteButton();

  show("start", true, false);
})();
