// Real Scottish towns with rough map positions, so "Where are you?" works without the internet.
// Postcodes: the first part of a postcode (like PA15) or its letters (like PA) point to a town.

window.PLACES = {
  towns: {
    "Glasgow":      { lat: 55.8642, lng: -4.2518 },
    "Edinburgh":    { lat: 55.9533, lng: -3.1883 },
    "Greenock":     { lat: 55.9486, lng: -4.7617 },
    "Port Glasgow": { lat: 55.9344, lng: -4.6891 },
    "Paisley":      { lat: 55.8456, lng: -4.4239 },
    "Kilmarnock":   { lat: 55.6117, lng: -4.4957 },
    "Ayr":          { lat: 55.4586, lng: -4.6292 },
    "Stirling":     { lat: 56.1165, lng: -3.9369 },
    "Perth":        { lat: 56.3950, lng: -3.4308 },
    "Dundee":       { lat: 56.4620, lng: -2.9707 },
    "Aberdeen":     { lat: 57.1497, lng: -2.0943 },
    "Inverness":    { lat: 57.4778, lng: -4.2247 },
    "Fort William": { lat: 56.8198, lng: -5.1052 },
    "Oban":         { lat: 56.4150, lng: -5.4710 },
    "Dumfries":     { lat: 55.0700, lng: -3.6050 },
    "Stornoway":    { lat: 58.2090, lng: -6.3870 },
    "Kirkwall":     { lat: 58.9810, lng: -2.9605 },
    "Lerwick":      { lat: 60.1546, lng: -1.1494 },
  },

  // Most specific first: the full first part of a postcode, then just its letters.
  postcodes: {
    "PA15": "Greenock", "PA16": "Greenock", "PA14": "Port Glasgow",
    "PA34": "Oban", "PH33": "Fort William",
    "PH1": "Perth", "PH2": "Perth",
    "KA7": "Ayr", "KA8": "Ayr",
    "G": "Glasgow", "EH": "Edinburgh", "PA": "Paisley", "KA": "Kilmarnock",
    "FK": "Stirling", "PH": "Perth", "DD": "Dundee", "AB": "Aberdeen",
    "IV": "Inverness", "DG": "Dumfries", "HS": "Stornoway", "KW": "Kirkwall", "ZE": "Lerwick",
  },
};
