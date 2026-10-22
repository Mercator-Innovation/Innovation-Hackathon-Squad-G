// Draws the services' "Where help runs out" page from data/gaps.js.

(function () {
  var G = window.GAPS;

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") node.textContent = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function sum(list) { return list.reduce(function (a, b) { return a + b; }, 0); }

  // ---- Headline numbers ----
  var bandTotals = G.bands.map(function (_, i) { return sum(G.areas.map(function (a) { return a.counts[i]; })); });
  var total = sum(bandTotals);
  var busiestBand = G.bands[bandTotals.indexOf(Math.max.apply(null, bandTotals))];
  var byArea = G.areas.map(function (a) { return { area: a.area, total: sum(a.counts) }; })
    .sort(function (a, b) { return b.total - a.total; });

  document.getElementById("tiles").append(
    tile(total, "times nothing was open (" + G.period.toLowerCase() + ")"),
    tile(busiestBand, "the time it happens most"),
    tile(byArea[0].area, "the area it happens most")
  );

  function tile(value, label) {
    return el("div", { class: "tile" }, [
      el("span", { class: "value", text: String(value) }),
      el("span", { class: "label", text: label }),
    ]);
  }

  // ---- When and where: shaded table ----
  // One hue, light to dark. Text flips to white on the darker cells so it stays readable.
  var max = Math.max.apply(null, G.areas.map(function (a) { return Math.max.apply(null, a.counts); }));
  var shades = ["#e8eff6", "#c9dbec", "#9dbedc", "#5f93c2", "#2d5f8b"];

  function shade(n) {
    var step = Math.min(shades.length - 1, Math.floor((n / max) * shades.length));
    return { bg: shades[step], fg: step >= 4 ? "#ffffff" : "#1f2328" };   // dark text on the lighter blues, for contrast
  }

  var head = el("tr", {}, [el("th", { scope: "col", text: "Area" })]
    .concat(G.bands.map(function (b) { return el("th", { scope: "col", text: b }); }))
    .concat([el("th", { scope: "col", text: "Total" })]));

  var rows = G.areas.map(function (a) {
    var cells = a.counts.map(function (n, i) {
      var s = shade(n);
      var td = el("td", { text: String(n), title: a.area + ", " + G.bands[i] + ": " + n });
      td.style.background = s.bg;
      td.style.color = s.fg;
      return td;
    });
    return el("tr", {}, [el("th", { scope: "row", text: a.area })]
      .concat(cells)
      .concat([el("td", { class: "total", text: String(sum(a.counts)) })]));
  });

  // The table can scroll sideways on a phone, so keyboard users need to be able to reach it.
  var gridWrap = document.getElementById("grid");
  gridWrap.setAttribute("tabindex", "0");
  gridWrap.setAttribute("role", "region");
  gridWrap.setAttribute("aria-labelledby", "grid-heading");
  gridWrap.append(el("table", { class: "grid", "aria-labelledby": "grid-heading" }, [
    el("thead", {}, [head]),
    el("tbody", {}, rows),
  ]));

  // ---- Bars ----
  function bars(items, labelKey) {
    var top = Math.max.apply(null, items.map(function (i) { return i.count; }));
    return el("ul", { class: "bars" }, items.map(function (i) {
      var bar = el("div", { class: "bar" });
      bar.style.width = Math.round((i.count / top) * 100) + "%";
      return el("li", {}, [
        el("span", { text: i[labelKey] }),
        el("div", { class: "bar-track", "aria-hidden": "true" }, [bar]),
        el("span", { class: "bar-value", text: String(i.count) }),
      ]);
    }));
  }

  document.getElementById("needs").append(bars(G.needs, "need"));
  document.getElementById("who").append(bars(G.who, "who"));
})();
