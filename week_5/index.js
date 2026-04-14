
// =============================
// DOM Basics - JavaScript Teil
// Alle Kommentare sind auf Deutsch,
// damit du sie direkt im Unterricht erklären kannst.
// =============================

// ---------------------------------
// 1. Ein Element über seine ID auswählen
// document.getElementById("...") sucht genau ein Element
// ---------------------------------
const introText = document.getElementById("intro-text");
const changeTextBtn = document.getElementById("change-text-btn");

// addEventListener hört auf ein Ereignis, hier: "click"
changeTextBtn.addEventListener("click", function () {
  // textContent ändert den reinen Textinhalt eines Elements
  introText.textContent = "Das DOM erlaubt es JavaScript, HTML dynamisch zu verändern.";
});

// ---------------------------------
// 2. Mehrere Elemente über eine Klasse auswählen
// querySelectorAll liefert eine NodeList zurück
// ---------------------------------
const highlightBtn = document.getElementById("highlight-btn");
const demoTexts = document.querySelectorAll(".demo-text");

highlightBtn.addEventListener("click", function () {
  // Wir gehen durch alle gefundenen Elemente
  demoTexts.forEach(function (paragraph) {
    // classList.add fügt eine CSS-Klasse hinzu
    paragraph.classList.add("highlight");
  });
});

// ---------------------------------
// 3. Neue Elemente erstellen und einfügen
// createElement erzeugt ein neues HTML-Element
// appendChild hängt es an ein anderes Element an
// ---------------------------------
const topicList = document.getElementById("topic-list");
const addItemBtn = document.getElementById("add-item-btn");

addItemBtn.addEventListener("click", function () {
  const newListItem = document.createElement("li");
  newListItem.textContent = "JavaScript";
  topicList.appendChild(newListItem);
});

// ---------------------------------
// 4. Events behandeln
// Hier reagieren wir auf einen Button-Klick
// ---------------------------------
const eventBtn = document.getElementById("event-btn");
const eventOutput = document.getElementById("event-output");

eventBtn.addEventListener("click", function () {
  eventOutput.textContent = "Button wurde geklickt! Das ist ein Click-Event.";
});

// ---------------------------------
// 5. Attribute verändern
// setAttribute setzt den Wert eines HTML-Attributs
// ---------------------------------
const demoImage = document.getElementById("demo-image");
const changeImageBtn = document.getElementById("change-image-btn");

changeImageBtn.addEventListener("click", function () {
  demoImage.setAttribute(
    "src",
    "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
  );

  demoImage.setAttribute("alt", "Geändertes Beispielbild");
});

// ---------------------------------
// Zusätzlicher Hinweis für den Unterricht:
// Du kannst hier auch weitere Themen ergänzen, z. B.:
// - innerHTML
// - style ändern
// - remove()
// - toggle() mit classList
// - Formulareingaben lesen
// ---------------------------------
