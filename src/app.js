// Behaviour: the journey from "is anyone in danger?" to "here is who can help".
// The words live in content.js and the services in data/services.js.

(function () {
  var C = window.CONTENT;
  var services = window.DATA.services;
  var main = document.getElementById("main");
  var pretendSelect = document.getElementById("pretend-time");

  // What the person has chosen so far, and the screens they have seen (for Back).
  var answers = { who: null, need: null };
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

  // The next time a closed service opens, as words like "Monday 9am".
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
        return when + " at " + formatHour(starts[0]);
      }
    }
    return "";
  }

  function formatHour(h) {
    if (h === 0) return "midnight";
    if (h === 12) return "midday";
    return h < 12 ? h + "am" : (h - 12) + "pm";
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

  function show(screen, remember) {
    if (remember !== false && history[history.length - 1] !== screen) history.push(screen);
    main.innerHTML = "";
    screens[screen]();
    main.focus();
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

  var screens = {
    start: function () {
      main.append(
        el("h1", { text: C.start.heading }),
        el("p", { text: C.start.intro }),
        el("ul", { class: "choices" }, [
          el("li", {}, [el("button", { class: "button danger", type: "button", text: C.start.yes, onclick: function () { show("emergency"); } })]),
          el("li", {}, [el("button", { class: "button", type: "button", text: C.start.no, onclick: function () { show("who"); } })]),
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
        choiceList(C.who.options, function (id) { answers.who = id; show("need"); })
      );
    },

    need: function () {
      main.append(
        backButton(),
        el("h1", { text: C.need.heading }),
        el("p", { class: "meta", text: C.need.hint }),
        choiceList(C.need.options, function (id) { answers.need = id; show("results"); })
      );
    },

    results: function () {
      var t = currentTime();
      var matches = services.filter(function (s) {
        return s.who.indexOf(answers.who) !== -1 && s.needs.indexOf(answers.need) !== -1;
      });
      var open = matches.filter(function (s) { return isOpen(s, t); });
      var closed = matches.filter(function (s) { return !isOpen(s, t); });

      main.append(backButton(), el("h1", { text: C.results.heading }));
      if (!open.length) main.append(el("p", { text: C.results.noneOpen }));
      open.forEach(function (s) { main.append(serviceCard(s, true, t)); });
      if (closed.length) {
        main.append(el("h2", { text: C.results.laterHeading }));
        closed.forEach(function (s) { main.append(serviceCard(s, false, t)); });
      }
      main.append(el("button", {
        class: "button primary", type: "button", text: C.results.startAgain,
        onclick: function () { answers = { who: null, need: null }; history = []; show("start"); },
      }));
    },
  };

  function serviceCard(s, open, t) {
    var status = open
      ? el("p", { class: "status open", text: C.results.openNow })
      : el("p", { class: "status closed", text: C.results.closedNow + ". " + C.results.opensAt + " " + nextOpening(s, t) + "." });

    var ways = Object.keys(s.contact).map(function (way) {
      var label = C.results.ways[way];
      var value = s.contact[way];
      if (way === "phone") return el("a", { href: "tel:" + value.replace(/\s/g, ""), text: label + " " + value });
      if (way === "text") return el("a", { href: "sms:" + value, text: label + " " + value });
      if (way === "chat") return el("a", { href: value, text: label });
      return el("span", { text: label + ": " + value });
    });

    return el("section", { class: "service", "aria-label": s.name }, [
      el("h3", { text: s.name }),
      status,
      el("p", { text: s.what }),
      el("p", { class: "meta", text: s.area + (s.lowData ? " · " + C.results.lowData : "") }),
      el("div", { class: "ways" }, ways),
    ]);
  }

  // ---- Start up ----

  document.getElementById("app-name").textContent = C.appName;
  document.getElementById("tagline").textContent = C.tagline;
  document.getElementById("prototype-note").textContent = C.prototypeNote;
  document.getElementById("pretend-label").textContent = C.timeControl;
  window.DATA.pretendTimes.forEach(function (t) {
    pretendSelect.append(el("option", { value: t.id, text: t.label }));
  });
  pretendSelect.addEventListener("change", function () {
    if (history[history.length - 1] === "results") show("results", false);
  });

  show("start");
})();
