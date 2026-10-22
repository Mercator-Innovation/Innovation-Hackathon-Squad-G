// Behaviour: the journey from "is anyone in danger?" to "here is who can help".
// The words live in content.js and the services in data/services.js.

(function () {
  var C = window.CONTENT;
  var services = window.DATA.services;
  var main = document.getElementById("main");
  var pretendSelect = document.getElementById("pretend-time");

  // What the person has chosen so far, and the screens they have seen (for Back).
  var answers = { who: null, need: null, where: null };
  var MAX_MILES = 30;
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

  // When a closed service next opens: which day (0 = today) and what hour.
  function nextOpeningTime(service, t) {
    for (var offset = 0; offset < 8; offset++) {
      var day = (t.day + offset) % 7;
      var starts = service.hours
        .filter(function (h) { return h.days.indexOf(day) !== -1 && (offset > 0 || h.from > t.hour); })
        .map(function (h) { return h.from; })
        .sort(function (a, b) { return a - b; });
      if (starts.length) return { offset: offset, day: day, hour: starts[0] };
    }
    return null;
  }

  // The next time a closed service opens, as words like "Monday 9am".
  function nextOpening(service, t) {
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var next = nextOpeningTime(service, t);
    if (!next) return "";
    var when = next.offset === 0 ? "today" : next.offset === 1 ? "tomorrow" : dayNames[next.day];
    return when + " at " + formatHour(next.hour);
  }

  // How many hours until a closed service opens, or null if we don't know.
  function hoursUntilOpen(service, t) {
    var next = nextOpeningTime(service, t);
    return next ? next.offset * 24 + next.hour - t.hour : null;
  }

  function isOpeningSoon(service, t) {
    var h = hoursUntilOpen(service, t);
    return h !== null && h <= C.results.soonWithinHours;
  }

  // A wait as words like "40 minutes" or "1 hour 30 minutes", rounded up to 5 minutes.
  function formatWait(hours) {
    var mins = Math.max(5, Math.ceil(Math.round(hours * 60) / 5) * 5);
    var h = Math.floor(mins / 60), m = mins % 60;
    var parts = [];
    if (h) parts.push(h + " " + (h === 1 ? C.results.hour : C.results.hours));
    if (m) parts.push(m + " " + C.results.minutes);
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
        choiceList(C.need.options, function (id) { answers.need = id; show("where"); })
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
      var form = el("form", { class: "where-form" }, [
        el("label", { for: "where-input", text: C.where.typeLabel }),
        el("p", { id: "where-hint", class: "meta", text: C.where.typeHint }),
        input,
        el("button", { class: "button primary", type: "submit", text: C.where.typeButton }),
      ]);
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var place = findPlace(input.value);
        if (!place) { message.textContent = C.where.notFound; input.focus(); return; }
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
        if (s.who.indexOf(answers.who) === -1 || s.needs.indexOf(answers.need) === -1) return false;
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
      var soon = matches.filter(function (s) { return !isOpen(s, t) && isOpeningSoon(s, t); });
      var closed = matches.filter(function (s) { return !isOpen(s, t) && !isOpeningSoon(s, t); });

      main.append(backButton(), el("h1", { text: C.results.heading }));
      if (answers.where) {
        main.append(el("p", { class: "meta" }, [
          document.createTextNode(C.results.near + " " + answers.where.name + ". " + C.results.tooFarNote + " "),
          el("button", { class: "back", type: "button", text: C.results.changeLocation, onclick: function () { show("where"); } }),
        ]));
      }
      if (!open.length) main.append(el("p", { text: C.results.noneOpen }));
      open.forEach(function (s) { main.append(serviceCard(s, true, t)); });
      if (soon.length) {
        main.append(el("h2", { text: C.results.soonHeading }));
        soon.forEach(function (s) { main.append(serviceCard(s, false, t)); });
      }
      if (closed.length) {
        main.append(el("h2", { text: C.results.laterHeading }));
        closed.forEach(function (s) { main.append(serviceCard(s, false, t)); });
      }
      main.append(el("button", {
        class: "button primary", type: "button", text: C.results.startAgain,
        onclick: function () { answers = { who: null, need: null, where: null }; history = []; show("start"); },
      }));
    },
  };

  function serviceCard(s, open, t) {
    var status = open
      ? el("p", { class: "status open", text: C.results.openNow })
      : isOpeningSoon(s, t)
        ? el("p", { class: "status closed", text: C.results.opensIn + " " + formatWait(hoursUntilOpen(s, t)) + ", " + nextOpening(s, t) + "." })
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
      el("p", { class: "meta", text: placeText(s) + (s.lowData ? " · " + C.results.lowData : "") }),
      el("div", { class: "ways" }, ways),
    ]);
  }

  function placeText(s) {
    if (!s.town) return s.area;
    var d = distanceTo(s);
    if (d === null) return s.town;
    return s.town + ", " + (d < 1 ? C.results.lessThanAMile.toLowerCase() : Math.round(d) + " " + C.results.milesAway);
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
