"use strict";

/* ==========================================================
   ETHIOLANGUAGEAI — LEARNING CONTENT
   ========================================================== */
const units = {
  1: {title: "Unit 1 — ፊደል & Pronunciation", body: "Learn the Fidel families and the seven orders (ለ ሉ ሊ ላ ሌ ል ሎ). Follow the learning cycle: look → read → say → write → review. Connect each Fidel form with everyday words like ቤት, ቡና, ሻይ."},
  2: {title: "Unit 2 — Greetings & Leave‑Taking", body: "Practice essential greetings: ሰላም, ደህና, ጤና ይስጥልኝ. Learn how to greet politely, ask ‘How are you?’ and leave respectfully."},
  3: {title: "Unit 3 — Introducing Yourself", body: "Introduce yourself with name, origin, and work. Example: ስሜ ___ ነው። ከኢትዮጵያ ነኝ። Build a four-line introduction: name → country → work → one question."},
  4: {title: "Unit 4 — Introducing Others", body: "Learn family vocabulary: ቤተሰብ, አባት, እናት, ወንድም, እህት. Introduce people around you: ይህ ወንድሜ ነው።"},
  5: {title: "Unit 5 — የአማርኛ ግሶች • Verbs", body: "Focus on common Amharic verbs and basic sentence patterns. Practice present tense forms and simple questions."},
  6: {title: "Unit 6 — መግዛት • Basic Shopping", body: "Learn language for buying everyday items: prices, quantities, and simple bargaining phrases."},
  7: {title: "Unit 7 — ምግብ እና መጠጥ • Food & Drink", body: "Practice names of foods and drinks, ordering in cafés, and talking about likes and dislikes."},
  8: {title: "Unit 8 — ሰዓት • Telling Time", body: "Learn how to ask and tell the time, talk about daily routines, and arrange simple appointments."},
  9: {title: "Unit 9 — ታሪክ መናገር • Telling a Story", body: "Practice past tense forms and simple narratives about everyday events and personal experiences."},
  10: {title: "Unit 10 — መንገድ መጠየቅ • Finding Your Way", body: "Learn how to ask for directions, describe locations, and understand basic place names."},
  11: {title: "Unit 11 — ልብስ መግዛት • Shopping II", body: "Focus on clothing vocabulary, sizes, colors, and polite phrases for trying and choosing items."},
  12: {title: "Unit 12 — ወራት እና አየር ሁኔታ • Months & Weather", body: "Learn months, seasons, and weather expressions. Practice talking about climate and daily conditions."},
  13: {title: "Unit 13 — የአረፍተ ነገር አወቃቀር • Sentence Structure", body: "Explore basic Amharic sentence patterns, word order, and simple connectors for longer sentences."},
  14: {title: "Unit 14 — ቀጠሮ እና ግብዣ • Appointments & Invitations", body: "Practice making appointments, inviting others, accepting and declining politely."},
  15: {title: "Unit 15 — ድንበሮች እና እምቢ ማለት • Boundaries", body: "Learn language for setting boundaries, saying no, and responding to harassment respectfully but firmly."},
  16: {title: "Unit 16 — ጤና • Health & Wellbeing", body: "Practice basic health vocabulary, describing symptoms, and simple advice for wellbeing."},
  17: {title: "Unit 17 — ደህንነት እና አስቸኳይ ቋንቋ • Safety & Emergencies", body: "Learn key phrases for emergencies, asking for help, and describing urgent situations."},
  18: {title: "Unit 18 — ቤትን መግለጽ • Describing the Household", body: "Practice vocabulary for rooms, furniture, and household routines."},
  19: {title: "Unit 19 — የሥራ ቃላት • Job Vocabulary", body: "Learn job-related words and simple workplace phrases for everyday communication."},
  20: {title: "Unit 20 — ቀጣይ ትምህርት • Ongoing Learning", body: "Plan your continued Amharic learning: review, practice, and set personal goals."}
};

/* ==========================================================
   OFFLINE DICTIONARY 
   ========================================================== */
const DICTIONARY = {
  am: {
    "ቤት": "house", "ቡና": "coffee", "ሰላም": "peace / hello", "ጤና": "health",
    "ደህና": "fine / well", "ጤና ይስጥልኝ": "may God give you health",
    "ስም": "name", "ስሜ": "my name", "አገር": "country", "ነኝ": "I am",
    "ቤተሰብ": "family", "አባት": "father", "እናት": "mother", "ወንድም": "brother", "እህት": "sister",
    "ሕመም": "illness", "ህክምና": "treatment", "ሐኪም": "doctor",
    "እርዳታ": "help", "አደጋ": "danger", "አስቸኳይ": "emergency"
  },
  om: {
    "mana": "house", "bunaa": "coffee", "nagaa": "peace", "fayya": "health"
  },
  en: {
    "house": "ቤት", "coffee": "ቡና", "peace": "ሰላም", "health": "ጤና",
    "family": "ቤተሰብ", "father": "አባት", "mother": "እናት", "brother": "ወንድም", "sister": "እህት",
    "doctor": "ሐኪም", "help": "እርዳታ", "danger": "አደጋ", "emergency": "አስቸኳይ"
  }
};

const API_BASE_URL = "";

const $ = id => document.getElementById(id);

function setStatus(id, text) { 
  $(id).textContent = text || ""; 
}

function loadUnit() {
  const id = Number($("unitSelect").value);
  const unit = units[id];
  if (!unit) { $("unitContent").textContent = "Select a unit to begin learning."; return; }
  $("unitContent").innerHTML =
    "<h3>" + escapeHTML(unit.title) + "</h3>" +
    "<p>" + escapeHTML(unit.body) + "</p>" +
    "<p><strong>Learning cycle:</strong> look → read → say → use → write → review.</p>" +
    '<div class="learn-actions"><button type="button" id="unitSpeak">🔊 Listen to Unit</button></div>';
  $("unitSpeak").addEventListener("click", () => speak(unit.title + ". " + unit.body));
}

function buildUnitSelectors() {
  const select = $("unitSelect"), list = $("unitButtons");
  Object.entries(units).forEach(([id, u]) => {
    const option = document.createElement("option");
    option.value = id; option.textContent = u.title;
    select.appendChild(option);

    const b = document.createElement("button");
    b.type = "button"; b.textContent = "Unit " + id;
    b.dataset.id = id;
    b.addEventListener("click", () => {
      select.value = id; loadUnit();
      document.querySelectorAll("#unitButtons button").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      $("learn").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    list.appendChild(b);
  });
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m]));
}

function offlineTranslate(source, target, text) {
  if (source === target) return text;
  const dict = DICTIONARY[source] || {};
  const reverse = source === "am" ? Object.fromEntries(Object.entries(DICTIONARY.am).map(([k, v]) => [v.split(" / ")[0], k])) :
                  source === "om" ? Object.fromEntries(Object.entries(DICTIONARY.om).map(([k, v]) => [v, k])) :
                  {};
  const map = target === "am" && source === "en" ? DICTIONARY.en :
              target === "en" && source === "am" ? DICTIONARY.am :
              target === "en" && source === "om" ? DICTIONARY.om :
              target === "om" && source === "en" ? Object.fromEntries(Object.entries(DICTIONARY.om).map(([k, v]) => [v, k])) :
              target === "am" && source === "om" ? {} :
              target === "om" && source === "am" ? {} : null;

  if (!map) {
    const words = text.trim().split(/\s+/);
    const result = words.map(w => dict[w] || reverse[w] || w);
    return result.join(" ");
  }
  return text.trim().split(/(\s+)/).map(part => {
    const key = part.trim();
    return key && map[key] ? part.replace(key, map[key]) : part;
  }).join("");
}

async function callBackend(path, payload) {
  const url = (API_BASE_URL || "").replace(/\/$/, "") + path;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(res.status + " " + res.statusText);
  return res.json();
}

$("processBtn").addEventListener("click", async () => {
  const lang = $("language").value;
  const text = $("inputText").value.trim();
  if (!text) { $("outputBox").textContent = "Please enter or speak some text."; return; }
  $("outputBox").textContent = "Processing...";
  try {
    if (API_BASE_URL) {
      const data = await callBackend("/api/process-text", { language: lang, text });
      $("outputBox").textContent = data.result || "No result returned.";
      setStatus("voiceStatus", "Connected to backend.");
    } else {
      const found = DICTIONARY[lang]?.[text];
      $("outputBox").textContent = found || "Offline mode: received " + text.length + " characters. Preview: " + text.slice(0, 80);
      setStatus("voiceStatus", found ? "Offline dictionary result." : "Offline mode. Add a backend URL for full processing.");
    }
  } catch (err) {
    $("outputBox").textContent = "Offline result: " + (DICTIONARY[lang]?.[text] || text);
    setStatus("voiceStatus", "Backend unavailable; offline mode used.");
  }
});

$("onlineBtn").addEventListener("click", async () => {
  const source = $("sourceLang").value, target = $("targetLang").value, text = $("onlineText").value.trim();
  if (!text) { $("onlineOutput").textContent = "Please enter text to translate."; return; }
  if (source === target) { $("onlineOutput").textContent = text; return; }
  $("onlineOutput").textContent = "Translating...";
  const context = {
    domain: $("domain").value.trim(),
    style: $("style").value.trim(),
    glossary: [
      { source: "ፊደል", target: "Fidel (Amharic script)" },
      { source: "ሰላም", target: "hello / peace" },
      { source: "ቤተሰብ", target: "family" }
    ],
    notes: "Use terminology consistent with EthiolanguageAI learning materials. Keep sentences short and clear for learners."
  };
  try {
    if (API_BASE_URL) {
      const data = await callBackend("/api/translate", { sourceLang: source, targetLang: target, text, context });
      $("onlineOutput").textContent = data.translatedText || "No translation returned.";
      setStatus("apiStatus", "Online backend translation.");
    } else {
      $("onlineOutput").textContent = offlineTranslate(source, target, text);
      setStatus("apiStatus", "Offline dictionary mode. Connect a backend for full sentence translation.");
    }
  } catch (err) {
    $("onlineOutput").textContent = offlineTranslate(source, target, text);
    setStatus("apiStatus", "Backend unavailable; offline translation used.");
  }
});

$("swapBtn").addEventListener("click", () => {
  const a = $("sourceLang").value;
  $("sourceLang").value = $("targetLang").value;
  $("targetLang").value = a;
});

$("copyBtn").addEventListener("click", async () => {
  const text = $("outputBox").textContent.trim();
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    setStatus("voiceStatus", "Output copied.");
  } catch {
    setStatus("voiceStatus", "Copy is not available in this browser.");
  }
});

/* Browser speech synthesis */
function speak(text, langHint) {
  if (!("speechSynthesis" in window)) {
    setStatus("voiceStatus", "Text-to-speech is not supported in this browser.");
    return;
  }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const hasEthiopic = /[\u1200-\u137F]/.test(text);
  u.lang = langHint || (hasEthiopic ? "am-ET" : "en-US");
  window.speechSynthesis.speak(u);
}

$("speakBtn").addEventListener("click", () => speak($("outputBox").textContent.trim(), $("language").value === "am" ? "am-ET" : $("language").value === "om" ? "om-ET" : "en-US"));

/* Browser voice input */
let recognition = null;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.onstart = () => {
    $("voiceBtn").textContent = "🎙️ Listening...";
    $("voiceBtn").disabled = true;
    setStatus("voiceStatus", "Speak now.");
  };
  recognition.onresult = e => {
    $("inputText").value = e.results[0][0].transcript;
    setStatus("voiceStatus", "Voice input captured.");
  };
  recognition.onerror = e => setStatus("voiceStatus", "Voice error: " + e.error);
  recognition.onend = () => {
    $("voiceBtn").textContent = "🎤 Voice Input";
    $("voiceBtn").disabled = false;
  };
} else {
  $("voiceBtn").disabled = true;
  $("voiceBtn").textContent = "Voice Not Supported";
}

$("voiceBtn").addEventListener("click", () => {
  if (!recognition) return;
  const lang = $("language").value;
  recognition.lang = lang === "am" ? "am-ET" : lang === "om" ? "om-ET" : "en-US";
  recognition.start();
});

/* Initialize */
buildUnitSelectors();
$("unitSelect").value = "1";
loadUnit();
document.querySelector("#unitButtons button")?.classList.add("active");

/* PWA service worker */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(() => {}));
}