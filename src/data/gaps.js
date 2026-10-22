// Made-up numbers for the services' "Where help runs out" page (gaps.html). Not real data.
// Each count is a moment when someone used the app and nothing near them was open.
// In a real service the app would count these anonymously: area, day, time band and need.
// No names, no exact location, nothing that could identify a person.

window.GAPS = {
  period: "Last 4 weeks",

  // Time bands, in the order they're shown.
  bands: ["6pm to 10pm", "10pm to 2am", "2am to 6am", "Weekend daytime"],

  // counts: one number per band, in the same order as bands.
  areas: [
    { area: "Glasgow",      counts: [14, 31, 22,  9] },
    { area: "Greenock",     counts: [11, 24, 17,  8] },
    { area: "Kilmarnock",   counts: [ 9, 19, 15,  7] },
    { area: "Dundee",       counts: [12, 27, 21, 10] },
    { area: "Aberdeen",     counts: [ 8, 18, 13,  6] },
    { area: "Inverness",    counts: [10, 16, 12,  9] },
    { area: "Fort William", counts: [ 7, 11,  9,  6] },
    { area: "Oban",         counts: [ 6, 10,  8,  5] },
    { area: "Stornoway",    counts: [ 5,  9,  7,  4] },
    { area: "Dumfries",     counts: [ 9, 15, 12,  7] },
  ],

  // What people were looking for when nothing was open.
  needs: [
    { need: "Someone to talk to",           count: 168 },
    { need: "Somewhere safe to be tonight", count: 121 },
    { need: "Ways to use more safely",      count: 74 },
    { need: "Support as family or a friend", count: 63 },
    { need: "Help to cut down or stop",     count: 41 },
  ],

  // Who the help was for.
  who: [
    { who: "Themselves",                count: 279 },
    { who: "Someone they care about",   count: 151 },
    { who: "Someone they support at work", count: 37 },
  ],
};
