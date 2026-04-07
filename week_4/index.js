/*
========================================================
LIVE CODING – JAVASCRIPT
Themen:
1. Functions Advanced – Callbacks
2. Data Types in JS – Arrays
3. Array methods – sort() und reverse()
4. Array methods – map(), filter() und reduce()

Alle Erklärungen stehen direkt in den Kommentaren.
========================================================
*/


/*
========================================================
1) FUNCTIONS ADVANCED – CALLBACKS
========================================================
*/

/*
Ein Callback ist eine Funktion, die wir an eine andere
Funktion übergeben, damit sie später ausgeführt wird.

Das ist in JavaScript extrem wichtig, weil viele Dinge
mit Funktionen arbeiten:
- Events
- Timer
- Array-Methoden
- asynchroner Code
*/

// Eine normale Funktion
function begruessen(name) {
  console.log("Hallo " + name);
}

/*
Diese Funktion bekommt eine andere Funktion als Parameter.
Der Parameter heißt hier "callback".
Das bedeutet:
- Wir erwarten keine Zahl
- Wir erwarten keinen String
- Wir erwarten eine Funktion
*/
function verarbeiten(callback) {
  const name = "Max";

  // Hier wird die übergebene Funktion ausgeführt.
  // "callback(name)" bedeutet:
  // Rufe die Funktion auf und gib "name" hinein.
  callback(name);
}

// Wir übergeben NICHT begruessen()
// sondern begruessen
// Warum?
// - begruessen     = Funktion selbst übergeben
// - begruessen()   = Funktion sofort ausführen
verarbeiten(begruessen);


/*
----------------------------
Callback direkt inline
----------------------------
Wir müssen nicht vorher eine extra Funktion definieren.
Wir können auch direkt eine Funktion beim Aufruf schreiben.
*/
verarbeiten(function(name) {
  console.log("Inline Callback sagt: Hallo " + name);
});


/*
----------------------------
Arrow Function als Callback
----------------------------
Das ist die moderne und sehr häufig verwendete Schreibweise.
*/
verarbeiten((name) => {
  console.log("Arrow Callback sagt: Hi " + name);
});


/*
----------------------------
Praktisches Callback-Beispiel:
Eine Rechenfunktion
----------------------------
Die Funktion "rechne" bekommt:
- a
- b
- operation (also eine Funktion)

Je nachdem, welche Funktion wir als "operation" übergeben,
wird anders gerechnet.
*/
function rechne(a, b, operation) {
  return operation(a, b);
}

// Addition
const summe = rechne(5, 3, (x, y) => x + y);
console.log("Summe:", summe);

// Multiplikation
const produkt = rechne(5, 3, (x, y) => x * y);
console.log("Produkt:", produkt);

// Subtraktion
const differenz = rechne(5, 3, (x, y) => x - y);
console.log("Differenz:", differenz);


/*
Merke:
Callbacks machen Code flexibel.
Wir schreiben eine allgemeine Funktion
und entscheiden erst später, was genau passieren soll.
*/


/*
========================================================
2) DATA TYPES IN JS – ARRAYS
========================================================
*/

/*
Ein Array ist eine geordnete Liste von Werten.

Wichtig:
- Ein Array kann Zahlen enthalten
- Strings
- Booleans
- Objekte
- sogar andere Arrays
*/

const zahlen = [10, 20, 30, 40];
const namen = ["Anna", "Ben", "Clara"];
const gemischt = [1, "Hallo", true, null];

console.log("zahlen:", zahlen);
console.log("namen:", namen);
console.log("gemischt:", gemischt);


/*
----------------------------
Zugriff auf Elemente
----------------------------
Arrays starten bei Index 0.
Das erste Element hat also Index 0.
*/
console.log("Erstes Element in zahlen:", zahlen[0]); // 10
console.log("Zweites Element in namen:", namen[1]); // Ben


/*
----------------------------
Länge eines Arrays
----------------------------
Mit .length bekommen wir die Anzahl der Elemente.
*/
console.log("Anzahl Elemente in zahlen:", zahlen.length);


/*
----------------------------
Elemente hinzufügen
----------------------------
push() fügt hinten ein Element hinzu.
*/
zahlen.push(50);
console.log("Nach push(50):", zahlen);


/*
unshift() fügt vorne ein Element hinzu.
*/
zahlen.unshift(5);
console.log("Nach unshift(5):", zahlen);


/*
----------------------------
Elemente entfernen
----------------------------
pop() entfernt das letzte Element.
*/
zahlen.pop();
console.log("Nach pop():", zahlen);

/*
shift() entfernt das erste Element.
*/
zahlen.shift();
console.log("Nach shift():", zahlen);


/*
----------------------------
Array mit Schleife durchlaufen
----------------------------
Klassische for-Schleife:
- i startet bei 0
- läuft solange i kleiner als zahlen.length ist
- i++ erhöht i bei jedem Durchlauf um 1
*/
for (let i = 0; i < zahlen.length; i++) {
  console.log("for-Schleife, aktuelles Element:", zahlen[i]);
}


/*
----------------------------
forEach()
----------------------------
forEach() führt für jedes Element im Array
eine Funktion aus.

Das ist oft lesbarer als eine klassische Schleife.
*/
zahlen.forEach((zahl) => {
  console.log("forEach, aktuelle Zahl:", zahl);
});


/*
forEach() kann auch den Index liefern.
*/
namen.forEach((name, index) => {
  console.log("Index:", index, "Name:", name);
});


/*
----------------------------
Praktische Mini-Übung:
Alle Zahlen verdoppeln ausgeben
----------------------------
Wichtig:
Hier verändern wir das Original-Array nicht.
Wir geben nur doppelte Werte aus.
*/
const kleineZahlen = [1, 2, 3, 4, 5];

kleineZahlen.forEach((zahl) => {
  console.log("Verdoppelt:", zahl * 2);
});


/*
========================================================
3) ARRAY METHODS – sort() und reverse()
========================================================
*/

/*
sort() sortiert ein Array.

ACHTUNG:
Ohne Vergleichsfunktion sortiert JavaScript oft
alphabetisch bzw. wie Strings.

Das führt bei Zahlen oft zu falschen Ergebnissen.
*/
const unsortierteZahlen = [10, 5, 2, 20, 1];

console.log("Vor sort():", unsortierteZahlen);

// Falscher / überraschender Standardfall bei Zahlen
unsortierteZahlen.sort();
console.log("Nach sort() ohne Vergleichsfunktion:", unsortierteZahlen);


/*
Warum ist das problematisch?
Weil JavaScript standardmäßig Elemente in Strings umwandeln kann.
Dann wird z. B. "20" mit "5" verglichen,
nicht mathematisch als Zahl.
*/


/*
----------------------------
Korrekte Sortierung von Zahlen
----------------------------
Wir geben eine Vergleichsfunktion an.

(a, b) => a - b

Bedeutung:
- Wenn Ergebnis negativ ist, kommt a vor b
- Wenn Ergebnis positiv ist, kommt b vor a
- Wenn Ergebnis 0 ist, bleiben sie gleichwertig
*/
const zahlen2 = [10, 5, 2, 20, 1];

zahlen2.sort((a, b) => a - b);
console.log("Aufsteigend sortiert:", zahlen2);


/*
Absteigend sortieren:
Wenn b - a verwendet wird,
kommt die größere Zahl zuerst.
*/
const zahlen3 = [10, 5, 2, 20, 1];

zahlen3.sort((a, b) => b - a);
console.log("Absteigend sortiert:", zahlen3);


/*
----------------------------
Strings sortieren
----------------------------
Bei einfachen Strings funktioniert sort() oft direkt gut.
*/
const staedte = ["Berlin", "Hamburg", "Köln", "Aachen"];

staedte.sort();
console.log("Alphabetisch sortierte Städte:", staedte);


/*
----------------------------
reverse()
----------------------------
reverse() dreht die aktuelle Reihenfolge um.

Wichtig:
reverse() verändert das Original-Array.
*/
const buchstaben = ["a", "b", "c", "d"];

console.log("Vor reverse():", buchstaben);
buchstaben.reverse();
console.log("Nach reverse():", buchstaben);


/*
Kombination:
Erst sortieren, dann reverse()
Dann bekommt man oft eine absteigende Reihenfolge.
*/
const zahlen4 = [3, 8, 1, 9, 2];

zahlen4.sort((a, b) => a - b); // zuerst aufsteigend
zahlen4.reverse();             // dann umdrehen
console.log("Sortiert und dann reverse():", zahlen4);


/*
Hinweis:
Oft ist es klarer, direkt so zu sortieren:
(a, b) => b - a
anstatt erst sort() und dann reverse() zu machen.
*/


/*
========================================================
4) ARRAY METHODS – map(), filter(), reduce()
========================================================
*/

/*
Diese drei Methoden gehören zu den wichtigsten Methoden
für moderne JavaScript-Programmierung.

Sie werden sehr oft in:
- Frontend-Entwicklung
- React
- Datenverarbeitung
- API-Daten
verwendet.
*/


/*
--------------------------------------------------------
4.1) map()
--------------------------------------------------------
map() erstellt ein neues Array.

Jedes Element aus dem Original-Array wird
mit einer Funktion verarbeitet.

Wichtig:
- Länge bleibt normalerweise gleich
- Werte werden transformiert
*/

const basisZahlen = [1, 2, 3, 4];

/*
Hier wird jedes Element verdoppelt.
x ist jeweils das aktuelle Element.
*/
const verdoppelt = basisZahlen.map((x) => {
  return x * 2;
});

console.log("Original:", basisZahlen);
console.log("Verdoppelt mit map():", verdoppelt);


/*
Noch ein Beispiel mit Strings:
Wir machen alle Namen groß.
*/
const kleineNamen = ["anna", "max", "tom"];

const grosseNamen = kleineNamen.map((name) => {
  return name.toUpperCase();
});

console.log("Große Namen:", grosseNamen);


/*
map() mit Objekten:
Wir holen nur bestimmte Informationen heraus.
*/
const users = [
  { name: "Anna", age: 22 },
  { name: "Max", age: 17 },
  { name: "Tom", age: 30 }
];

const nurNamen = users.map((user) => {
  return user.name;
});

console.log("Nur Namen:", nurNamen);


/*
--------------------------------------------------------
4.2) filter()
--------------------------------------------------------
filter() erstellt ebenfalls ein neues Array.

Aber:
Es werden nur die Elemente übernommen,
die eine Bedingung erfüllen.

Die Callback-Funktion muss true oder false liefern.
- true  -> Element bleibt
- false -> Element wird entfernt
*/

const zahlenFilter = [1, 2, 3, 4, 5, 6];

const geradeZahlen = zahlenFilter.filter((zahl) => {
  return zahl % 2 === 0;
});

console.log("Gerade Zahlen:", geradeZahlen);


/*
Beispiel mit Personen:
Nur Erwachsene behalten
*/
const erwachsene = users.filter((user) => {
  return user.age >= 18;
});

console.log("Erwachsene:", erwachsene);


/*
filter() verändert das Original nicht.
Es entsteht ein neues Array.
*/
console.log("Original users bleibt erhalten:", users);


/*
--------------------------------------------------------
4.3) reduce()
--------------------------------------------------------
reduce() reduziert ein Array auf genau einen Wert.

Das kann sein:
- eine Summe
- ein Produkt
- ein Objekt
- ein String
- ein neues komplexes Ergebnis

Syntax:
array.reduce((acc, curr) => { ... }, startwert)

acc   = Akkumulator / Zwischenergebnis
curr  = aktuelles Element
startwert = Anfangswert
*/

const zahlenReduce = [1, 2, 3, 4, 5];

const gesamtSumme = zahlenReduce.reduce((acc, curr) => {
  // Bei jedem Schritt addieren wir das aktuelle Element
  // auf das bisherige Zwischenergebnis.
  return acc + curr;
}, 0);

console.log("Summe mit reduce():", gesamtSumme);


/*
Beispiel:
Produkt aller Zahlen
*/
const produktAller = zahlenReduce.reduce((acc, curr) => {
  return acc * curr;
}, 1);

console.log("Produkt aller Zahlen:", produktAller);


/*
Beispiel mit Objekten:
Warenkorb zusammenrechnen
*/
const warenkorb = [
  { name: "Apfel", preis: 2 },
  { name: "Brot", preis: 3 },
  { name: "Milch", preis: 4 }
];

const gesamtPreis = warenkorb.reduce((summe, artikel) => {
  return summe + artikel.preis;
}, 0);

console.log("Gesamtpreis:", gesamtPreis);


/*
========================================================
5) KOMBINATION VON map(), filter(), reduce()
========================================================
*/

/*
Jetzt verbinden wir die Methoden.

Gegeben:
- mehrere Benutzer
Ziel:
1. Nur Erwachsene filtern
2. Danach nur Namen holen
3. Anzahl der Erwachsenen berechnen
*/

const personen = [
  { name: "Anna", age: 22 },
  { name: "Max", age: 17 },
  { name: "Tom", age: 30 },
  { name: "Lisa", age: 15 },
  { name: "John", age: 19 }
];


/*
Schritt 1:
Nur Erwachsene
*/
const nurErwachsene = personen.filter((person) => {
  return person.age >= 18;
});

console.log("Nur Erwachsene:", nurErwachsene);


/*
Schritt 2:
Aus den Erwachsenen nur die Namen holen
*/
const erwachsenenNamen = nurErwachsene.map((person) => {
  return person.name;
});

console.log("Namen der Erwachsenen:", erwachsenenNamen);


/*
Schritt 3:
Anzahl der Erwachsenen berechnen
Hier könnte man auch einfach .length nehmen.
Aber reduce() ist gut zum Üben.
*/
const anzahlErwachsene = nurErwachsene.reduce((acc, curr) => {
  return acc + 1;
}, 0);

console.log("Anzahl Erwachsene:", anzahlErwachsene);


/*
Direkte Verkettung:
Mehrere Methoden hintereinander.
Das ist sehr typisch in modernem JavaScript.
*/
const namenErwachsenerDirekt = personen
  .filter((person) => person.age >= 18)
  .map((person) => person.name);

console.log("Direkt verkettet:", namenErwachsenerDirekt);


/*
========================================================
6) MINI-CHALLENGES ZUM SELBST CODEN
========================================================
*/

/*
AUFGABE 1:
Schreibe eine Funktion "benutzeCallback",
die einen Text und einen Callback bekommt.
Der Callback soll den Text verändern.
Beispiel:
- Text: "hallo"
- Callback macht daraus "HALLO"
*/

// Musterlösung:
function benutzeCallback(text, callback) {
  return callback(text);
}

const ergebnis1 = benutzeCallback("hallo", (txt) => txt.toUpperCase());
console.log("Challenge 1:", ergebnis1);


/*
AUFGABE 2:
Nimm dieses Array und gib alle Werte mal 3 aus.
*/
const challengeZahlen = [2, 4, 6, 8];

// Musterlösung mit map():
const malDrei = challengeZahlen.map((zahl) => {
  return zahl * 3;
});
console.log("Challenge 2:", malDrei);


/*
AUFGABE 3:
Filtere aus diesem Array nur Wörter mit mehr als 4 Buchstaben.
*/
const woerter = ["Haus", "Banane", "Auto", "Programmierung", "Hund"];

// Musterlösung:
const langeWoerter = woerter.filter((wort) => {
  return wort.length > 4;
});
console.log("Challenge 3:", langeWoerter);


/*
AUFGABE 4:
Berechne die Summe aller Zahlen.
*/
const summenArray = [5, 10, 15, 20];

// Musterlösung:
const challengeSumme = summenArray.reduce((acc, curr) => {
  return acc + curr;
}, 0);
console.log("Challenge 4:", challengeSumme);


/*
========================================================
7) ZUSAMMENFASSUNG
========================================================
*/

/*
Callbacks:
- Funktionen können an andere Funktionen übergeben werden
- Das macht den Code flexibel

Arrays:
- Geordnete Listen von Werten
- Zugriff über Index
- Häufige Methoden: push, pop, shift, unshift, forEach

sort():
- Sortiert Arrays
- Bei Zahlen fast immer Vergleichsfunktion angeben

reverse():
- Dreht die Reihenfolge um

map():
- Verändert jedes Element
- Neues Array

filter():
- Behält nur passende Elemente
- Neues Array

reduce():
- Macht aus vielen Werten einen Wert
- Sehr nützlich für Summen, Statistiken, Gruppierungen
*/