// Behaviour: the support companion. A scripted conversation that can talk and listen.
// The words live in data/companion.js. Nothing is saved or sent anywhere by this page.

(function () {
  var C = window.COMPANION;
  var chat = document.getElementById("chat");
  var quick = document.getElementById("quick-replies");
  var form = document.getElementById("chat-form");
  var input = document.getElementById("message");
  var readAloud = document.getElementById("read-aloud");
  var micButton = document.getElementById("mic");
  var micNote = document.getElementById("mic-note");

  var listenTurn = 0;
  var breathingTimer = null;

  // ---- Fill in the words ----

  function setText(id, text) { document.getElementById(id).textContent = text; }
  setText("prototype-note", C.prototypeNote);
  setText("safety-text", C.safetyBar.text);
  setText("safety-999", C.safetyBar.call999);
  setText("safety-sam", C.safetyBar.samaritans);
  setText("back-link", C.backToFind);
  setText("title", C.title);
  setText("intro", C.intro);
  setText("read-aloud-label", C.voice.readAloud);
  setText("message-label", C.input.label);
  setText("send", C.input.send);

  // ---- Small helper to build elements ----

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (key) {
      if (key === "text") node.textContent = attrs[key];
      else node.setAttribute(key, attrs[key]);
    });
    (children || []).forEach(function (child) { node.appendChild(child); });
    return node;
  }

  // ---- Talking: the browser's own voice ----

  var canSpeak = "speechSynthesis" in window;
  if (!canSpeak) readAloud.parentNode.hidden = true;

  function speak(text) {
    if (!canSpeak || !readAloud.checked) return;
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "en-GB";
    u.rate = 0.9; // a little slower, to feel calm
    window.speechSynthesis.speak(u);
  }

  function stopSpeaking() {
    if (canSpeak) window.speechSynthesis.cancel();
  }

  readAloud.addEventListener("change", function () { if (!readAloud.checked) stopSpeaking(); });

  // ---- The conversation ----

  function addBubble(who, text, extraClass) {
    var bubble = el("p", { class: "bubble " + who + (extraClass ? " " + extraClass : "") }, [
      el("span", { class: "who", text: who === "you" ? C.you : C.companion }),
      document.createTextNode(text),
    ]);
    chat.appendChild(bubble);
    bubble.scrollIntoView({ block: "nearest" });
    return bubble;
  }

  function say(lines) {
    lines.forEach(function (line) {
      addBubble("companion", line);
      speak(line);
    });
  }

  function addActions(links) {
    var row = el("div", { class: "bubble-actions" }, links.map(function (l) {
      return el("a", { class: "button " + (l.style || ""), href: l.href, text: l.text });
    }));
    chat.appendChild(row);
  }

  function showQuickReplies(options) {
    quick.innerHTML = "";
    options.forEach(function (o) {
      var b = el("button", { type: "button", text: o.label });
      b.addEventListener("click", function () { handle(o.say); });
      quick.appendChild(b);
    });
  }

  // Whole words only, so "od" doesn't match "good".
  function mentions(text, word) {
    var escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp("(^|\\W)" + escaped + "(\\W|$)").test(text);
  }

  function findTopic(text) {
    var lower = " " + text.toLowerCase().replace(/[’']/g, "'") + " ";
    return C.topics.find(function (t) {
      if ((t.notIf || []).some(function (w) { return mentions(lower, w); })) return false;
      return t.words.some(function (w) { return mentions(lower, w); });
    });
  }

  function handle(text) {
    text = text.trim();
    if (!text) return;
    stopSpeaking();
    stopBreathing();
    addBubble("you", text);
    quick.innerHTML = "";

    var topic = findTopic(text);
    if (!topic) {
      say(C.listening[listenTurn % C.listening.length]);
      listenTurn++;
      showQuickReplies(C.quickReplies.next);
      return;
    }

    say(topic.replies);
    if (topic.showDanger) {
      addActions([
        { href: "tel:999", text: C.safetyBar.call999, style: "danger" },
        { href: "tel:116123", text: C.safetyBar.samaritans },
      ]);
    }
    if (topic.showHuman) {
      addActions([
        { href: "tel:116123", text: "Call Samaritans: 116 123", style: "primary" },
        { href: "tel:111", text: "Call NHS 24: 111" },
      ]);
    }
    if (topic.showFind) {
      addActions([{ href: "index.html", text: C.backToFind, style: "primary" }]);
    }
    if (topic.breathing) {
      startBreathing();
      return;
    }
    showQuickReplies(C.quickReplies.next);
  }

  // ---- Breathing together: in for 4, out for 6 ----

  function startBreathing() {
    var B = C.breathing;
    var bubble = addBubble("companion", "", "breathing");
    var text = document.createTextNode("");
    bubble.appendChild(text);
    var round = 0;

    function breatheIn() {
      text.textContent = B.in;
      speak(B.in);
      breathingTimer = setTimeout(breatheOut, 5000);
    }
    function breatheOut() {
      text.textContent = B.out;
      speak(B.out);
      round++;
      breathingTimer = setTimeout(round < B.rounds ? breatheIn : finish, 7000);
    }
    function finish() {
      breathingTimer = null;
      say([B.done]);
      showQuickReplies(C.quickReplies.next);
    }
    breatheIn();
  }

  function stopBreathing() {
    if (breathingTimer) clearTimeout(breathingTimer);
    breathingTimer = null;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    handle(input.value);
    input.value = "";
    input.focus();
  });

  // ---- Listening: the browser's own speech-to-text, where it has one ----

  var Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recogniser = null;

  if (!Recognition) {
    micButton.hidden = true;
    micNote.textContent = C.voice.noMic;
  } else {
    micButton.textContent = C.voice.speak;
    micNote.textContent = C.voice.micPrivacy;
    recogniser = new Recognition();
    recogniser.lang = "en-GB";
    recogniser.interimResults = false;

    recogniser.onresult = function (e) { handle(e.results[0][0].transcript); };
    recogniser.onend = function () {
      micButton.setAttribute("aria-pressed", "false");
      micButton.textContent = C.voice.speak;
    };
    recogniser.onerror = function () { micNote.textContent = C.voice.noMic; };

    micButton.addEventListener("click", function () {
      if (micButton.getAttribute("aria-pressed") === "true") { recogniser.stop(); return; }
      stopSpeaking();
      micButton.setAttribute("aria-pressed", "true");
      micButton.textContent = C.voice.listening;
      recogniser.start();
    });
  }

  // ---- Start ----

  C.greeting.forEach(function (line) { addBubble("companion", line); });
  showQuickReplies(C.quickReplies.start);
  // Browsers only allow talking after the person has tapped something, so the greeting is read once they do.
})();
