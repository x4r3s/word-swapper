const sourceText = document.getElementById("sourceText");
const fromWord = document.getElementById("fromWord");
const toWord = document.getElementById("toWord");
const resultText = document.getElementById("resultText");
const replaceBtn = document.getElementById("replaceBtn");
const clearBtn = document.getElementById("clearBtn");
const msg = document.getElementById("msg");

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&");
}

function setMessage(text, type = "info") {
  if (type === "ok") {
    msg.textContent = "✅ " + text;
    return;
  }

  if (type === "warn") {
    msg.textContent = "⚠️ " + text;
    return;
  }

  msg.textContent = text;
}

function replaceEverywhere() {
  const text = sourceText.value;
  const from = fromWord.value.trim();
  const to = toWord.value;

  if (!text) {
    setMessage("Please paste text to process", "warn");
    resultText.value = "";
    return;
  }

  if (!from) {
    setMessage("Enter the word you want to replace", "warn");
    resultText.value = text;
    return;
  }

  const regex = new RegExp(escapeRegExp(from), "g");
  const matches = text.match(regex);
  const count = matches ? matches.length : 0;

  resultText.value = text.replace(regex, to);
  setMessage("Done. Replacements: " + count, "ok");
}

function clearAll() {
  sourceText.value = "";
  fromWord.value = "";
  toWord.value = "";
  resultText.value = "";
  setMessage("Fields cleared");
  sourceText.focus();
}

replaceBtn.addEventListener("click", replaceEverywhere);
clearBtn.addEventListener("click", clearAll);
