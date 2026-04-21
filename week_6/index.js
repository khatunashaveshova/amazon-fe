/*
=========================================================
THEMA: Arbeiten mit APIs, Promises, Fetch und async/await
BEISPIEL-API: JSONPlaceholder
URL: https://jsonplaceholder.typicode.com/posts
=========================================================

Diese Datei ist absichtlich sehr ausführlich kommentiert,
damit sie im Unterricht verwendet werden kann.

INHALT:
1. Was ist asynchrones JavaScript?
2. Was ist ein Promise?
3. Wie funktioniert fetch()?
4. Wie funktioniert async/await?
5. Wie arbeiten wir mit JSON-Daten?
6. Daten von JSONPlaceholder laden und anzeigen
=========================================================
*/

/*
---------------------------------------------------------
1) WICHTIGE GRUNDIDEE: SYNCHRON VS. ASYNCHRON
---------------------------------------------------------

SYNCHRON:
JavaScript arbeitet normalerweise Zeile für Zeile.
Erst wenn eine Zeile fertig ist, wird die nächste ausgeführt.

ASYNCHRON:
Manche Aufgaben dauern länger, zum Beispiel:
- Daten aus dem Internet laden
- auf einen Timer warten
- Dateien laden
- Benutzeraktionen abwarten

Diese Aufgaben blockieren nicht immer den gesamten Ablauf,
sondern werden "im Hintergrund" bearbeitet.

Beispiel:
console.log("A");
setTimeout(() => {
  console.log("B");
}, 2000);
console.log("C");

Ausgabe:
A
C
B

Warum?
Weil setTimeout asynchron arbeitet.
---------------------------------------------------------
*/


/*
---------------------------------------------------------
2) HTML-ELEMENTE AUSWÄHLEN
---------------------------------------------------------

Damit wir Inhalte auf der Webseite anzeigen können,
müssen wir zuerst passende HTML-Elemente auswählen.

ERWARTETE HTML-Elemente:
- Ein Button mit id="loadBtn"
- Ein Bereich für Statusmeldungen mit id="status"
- Ein Bereich für die Ausgabe mit id="output"

Beispiel in HTML:
<button id="loadBtn">Beiträge laden</button>
<div id="status"></div>
<div id="output"></div>
---------------------------------------------------------
*/

const loadBtn = document.getElementById("loadBtn");
const statusBox = document.getElementById("status");
const outputBox = document.getElementById("output");


/*
---------------------------------------------------------
3) KLEINE HILFSFUNKTION: STATUS ANZEIGEN
---------------------------------------------------------

Diese Funktion zeigt eine Nachricht im Statusbereich an.
So kann der Benutzer sehen, was gerade passiert.

Beispiele:
- "Daten werden geladen..."
- "Daten erfolgreich geladen."
- "Fehler beim Laden."
---------------------------------------------------------
*/
function setStatus(message) {
  statusBox.textContent = message;
}


/*
---------------------------------------------------------
4) KLEINE HILFSFUNKTION: AUSGABEBEREICH LEEREN
---------------------------------------------------------

Bevor neue Daten angezeigt werden, löschen wir alte Inhalte.
So vermeiden wir doppelte oder veraltete Anzeigen.
---------------------------------------------------------
*/
function clearOutput() {
  outputBox.innerHTML = "";
}


/*
---------------------------------------------------------
5) FUNKTION ZUM ANZEIGEN VON BEITRÄGEN
---------------------------------------------------------

Die API liefert uns viele Beiträge als Array zurück.

Ein Array ist eine Liste von Werten.
Beispiel:
[
  { id: 1, title: "...", body: "..." },
  { id: 2, title: "...", body: "..." }
]

Jeder Beitrag ist ein Objekt mit Eigenschaften:
- userId
- id
- title
- body

Diese Funktion bekommt ein Array von Beiträgen
und zeigt sie im HTML an.
---------------------------------------------------------
*/
function showPosts(posts) {
  // Zuerst den Ausgabebereich leeren
  clearOutput();

  /*
  Wir verwenden slice(0, 5), damit im Unterricht
  nur die ersten 5 Beiträge angezeigt werden.
  Sonst wären es 100 Beiträge und die Seite wäre sehr lang.
  */
  const firstFivePosts = posts.slice(0, 5);

  /*
  forEach durchläuft jeden Eintrag im Array.
  Für jeden Beitrag erstellen wir ein neues HTML-Element.
  */
  firstFivePosts.forEach((post) => {
    // Neues div-Element erstellen
    const postCard = document.createElement("div");

    // CSS-Klasse setzen, damit wir es gestalten können
    postCard.classList.add("post-card");

    /*
    innerHTML fügt HTML-Inhalt in das Element ein.

    Wir zeigen:
    - die ID des Beitrags
    - den Titel
    - den Text
    */
    postCard.innerHTML = `
      <h2>Beitrag #${post.id}</h2>
      <h3>${post.title}</h3>
      <p>${post.body}</p>
    `;

    // Das neue Element wird in den Ausgabebereich eingefügt
    outputBox.appendChild(postCard);
  });
}


/*
---------------------------------------------------------
6) ASYNCHRONE FUNKTION MIT async/await
---------------------------------------------------------

Diese Funktion lädt Daten von JSONPlaceholder.

WICHTIG:
Das Schlüsselwort "async" vor einer Funktion bedeutet,
dass die Funktion asynchron arbeitet.

In einer async-Funktion dürfen wir "await" benutzen.

"await" bedeutet:
"Warte, bis das Ergebnis fertig ist."

Das macht den Code oft viel lesbarer als lange .then()-Ketten.
---------------------------------------------------------
*/
async function loadPosts() {
  // Statusmeldung anzeigen
  setStatus("Daten werden geladen ...");

  // Alte Inhalte löschen
  clearOutput();

  try {
    /*
    -----------------------------------------------------
    1. SCHRITT: Anfrage an die API senden
    -----------------------------------------------------

    fetch(URL) schickt eine HTTP-Anfrage an die angegebene Adresse.

    fetch() liefert NICHT sofort die fertigen Daten zurück.
    Stattdessen liefert es ein Promise.

    Ein Promise ist ein Objekt, das ein zukünftiges Ergebnis
    repräsentiert.

    Ein Promise kann 3 Zustände haben:
    - pending   -> wartet noch
    - fulfilled -> erfolgreich abgeschlossen
    - rejected  -> Fehler

    Mit "await" warten wir, bis das Promise erfüllt ist.
    */
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    /*
    -----------------------------------------------------
    2. SCHRITT: Antwort prüfen
    -----------------------------------------------------

    response.ok ist true, wenn die Anfrage erfolgreich war.
    Zum Beispiel bei Statuscode 200.

    Wenn etwas schiefgeht, werfen wir selbst einen Fehler.
    Dieser wird dann im catch-Block behandelt.
    */
    if (!response.ok) {
      throw new Error("Die Daten konnten nicht geladen werden.");
    }

    /*
    -----------------------------------------------------
    3. SCHRITT: Antwort in JSON umwandeln
    -----------------------------------------------------

    Die Serverantwort muss oft zuerst umgewandelt werden.

    response.json() liest den Antwortinhalt und wandelt ihn
    in ein JavaScript-Objekt bzw. Array um.

    Auch response.json() ist asynchron und liefert wieder
    ein Promise zurück.

    Deshalb benutzen wir erneut await.
    */
    const data = await response.json();

    /*
    -----------------------------------------------------
    4. SCHRITT: Geladene Daten in der Konsole prüfen
    -----------------------------------------------------

    Für den Unterricht sehr nützlich:
    Hier kann man im Browser in die Entwicklerkonsole schauen
    und das gesamte Array sehen.
    */
    console.log("Geladene Daten:", data);

    /*
    -----------------------------------------------------
    5. SCHRITT: Status aktualisieren
    -----------------------------------------------------
    */
    setStatus("Daten erfolgreich geladen.");

    /*
    -----------------------------------------------------
    6. SCHRITT: Beiträge auf der Webseite anzeigen
    -----------------------------------------------------
    */
    showPosts(data);

  } catch (error) {
    /*
    -----------------------------------------------------
    FEHLERBEHANDLUNG
    -----------------------------------------------------

    Wenn irgendwo im try-Block ein Fehler entsteht,
    springt JavaScript in den catch-Block.

    Mögliche Fehler:
    - Keine Internetverbindung
    - Falsche URL
    - Serverproblem
    - Fehler beim Umwandeln der Daten

    error.message enthält die Fehlermeldung.
    */
    console.error("Fehler:", error);
    setStatus("Fehler: " + error.message);
  }
}


/*
---------------------------------------------------------
7) EVENT LISTENER
---------------------------------------------------------

Ein Event Listener wartet auf ein Ereignis.

Hier warten wir auf einen Klick auf den Button.

Sobald der Benutzer klickt, wird loadPosts() aufgerufen.
---------------------------------------------------------
*/
loadBtn.addEventListener("click", loadPosts);


/*
---------------------------------------------------------
8) ZUSATZERKLÄRUNG: WIE WÜRDE DAS MIT .then() AUSSEHEN?
---------------------------------------------------------

Bevor async/await sehr beliebt wurde, hat man Promises
oft mit .then() und .catch() geschrieben.

Das funktioniert genauso, ist aber für Anfänger oft
etwas schwerer zu lesen.

BEISPIEL:
---------------------------------------------------------
*/

function loadPostsWithThen() {
  setStatus("Daten werden geladen mit .then() ...");
  clearOutput();

  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      /*
      Auch hier prüfen wir die Antwort.
      Wenn response.ok false ist, erzeugen wir einen Fehler.
      */
      if (!response.ok) {
        throw new Error("Die Daten konnten nicht geladen werden.");
      }

      /*
      response.json() liefert wieder ein Promise zurück.
      Dieses Promise wird an die nächste .then()-Stufe übergeben.
      */
      return response.json();
    })
    .then((data) => {
      console.log("Geladene Daten mit .then():", data);
      setStatus("Daten erfolgreich geladen mit .then().");
      showPosts(data);
    })
    .catch((error) => {
      console.error("Fehler mit .then():", error);
      setStatus("Fehler: " + error.message);
    });
}

/*
Hinweis:
Diese Funktion wird hier nicht automatisch benutzt.
Sie dient nur dem Vergleich im Unterricht.
Du kannst statt loadPosts auch loadPostsWithThen aufrufen.
*/


/*
---------------------------------------------------------
9) ERKLÄRUNG ZUR JSONPLACEHOLDER-API
---------------------------------------------------------

JSONPlaceholder ist eine kostenlose Test-API.

Sie ist besonders gut für den Unterricht geeignet,
weil man damit typische API-Anfragen üben kann.

Beispiele:

1. Alle Beiträge laden
https://jsonplaceholder.typicode.com/posts

2. Einen einzelnen Beitrag laden
https://jsonplaceholder.typicode.com/posts/1

3. Alle Benutzer laden
https://jsonplaceholder.typicode.com/users

4. Alle Kommentare laden
https://jsonplaceholder.typicode.com/comments

Die Daten sind nicht "echt", sondern nur Testdaten.
Das ist ideal zum Lernen.
---------------------------------------------------------
*/


/*
---------------------------------------------------------
10) EIN EINZELNES OBJEKT LADEN
---------------------------------------------------------

Hier zeigen wir zusätzlich, wie man nur einen einzelnen
Beitrag laden könnte.

Diese Funktion ist optional und dient als Lehrbeispiel.
---------------------------------------------------------
*/
async function loadSinglePost() {
  try {
    setStatus("Ein einzelner Beitrag wird geladen ...");
    clearOutput();

    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

    if (!response.ok) {
      throw new Error("Einzelner Beitrag konnte nicht geladen werden.");
    }

    const post = await response.json();

    console.log("Einzelner Beitrag:", post);

    const singleCard = document.createElement("div");
    singleCard.classList.add("post-card");

    singleCard.innerHTML = `
      <h2>Einzelner Beitrag #${post.id}</h2>
      <h3>${post.title}</h3>
      <p>${post.body}</p>
    `;

    outputBox.appendChild(singleCard);
    setStatus("Ein einzelner Beitrag wurde geladen.");
  } catch (error) {
    console.error(error);
    setStatus("Fehler: " + error.message);
  }
}


/*
---------------------------------------------------------
11) WAS PASSIERT TECHNISCH BEI fetch()?
---------------------------------------------------------

Wenn wir fetch("https://...") ausführen, passiert vereinfacht:

1. Der Browser sendet eine Anfrage an den Server
2. Der Server antwortet
3. Die Antwort kommt zurück
4. JavaScript verarbeitet die Antwort weiter

Die Antwort ist ein Response-Objekt.
Darin stehen zum Beispiel:
- status
- ok
- headers
- body

Wir müssen den Inhalt dann oft noch umwandeln:
- response.json()  -> für JSON-Daten
- response.text()  -> für Text
---------------------------------------------------------
*/


/*
---------------------------------------------------------
12) WARUM BRAUCHEN WIR try/catch?
---------------------------------------------------------

Bei asynchronem Code können Fehler auftreten.

Wenn wir Fehler nicht behandeln, kann das Programm
unerwartet abbrechen oder der Benutzer sieht nicht,
was schiefgelaufen ist.

Darum ist try/catch sehr wichtig.

AUFBAU:
try {
  // Code, der fehlschlagen könnte
} catch (error) {
  // Was tun wir im Fehlerfall?
}
---------------------------------------------------------
*/


/*
---------------------------------------------------------
13) UNTERRICHTSFRAGEN FÜR SCHÜLER
---------------------------------------------------------

Hier ein paar gute Fragen für den Unterricht:

1. Was ist der Unterschied zwischen synchron und asynchron?
2. Warum liefert fetch() nicht sofort die Daten zurück?
3. Was ist ein Promise?
4. Was macht await?
5. Warum brauchen wir response.json()?
6. Warum verwenden wir try/catch?
7. Was macht posts.slice(0, 5)?
8. Was passiert bei einem Klick auf den Button?

Diese Fragen helfen den Schülern,
den Ablauf besser zu verstehen.
---------------------------------------------------------
*/


/*
---------------------------------------------------------
14) ZUSAMMENFASSUNG
---------------------------------------------------------

- Eine API liefert Daten.
- JSON ist ein häufiges Datenformat.
- fetch() holt Daten von einer URL.
- fetch() liefert ein Promise zurück.
- async/await macht asynchronen Code lesbarer.
- try/catch fängt Fehler ab.
- Mit DOM-Manipulation zeigen wir die Daten auf der Webseite an.

WICHTIGER MERKSATZ:
"Asynchron bedeutet: Das Ergebnis kommt später."
---------------------------------------------------------
*/


/*
---------------------------------------------------------
15) OPTIONALER TEST FÜR DIE KONSOLE
---------------------------------------------------------

Du kannst diese Zeilen einzeln im Unterricht aktivieren,
um kleine Konzepte direkt zu demonstrieren.
---------------------------------------------------------
*/

// Beispiel für asynchrones Verhalten:
/*
console.log("Start");

setTimeout(() => {
  console.log("Dieser Text erscheint später.");
}, 2000);

console.log("Ende");
*/


// Beispiel: Promise von fetch anschauen
/*
const promiseExample = fetch("https://jsonplaceholder.typicode.com/posts");
console.log("fetch() liefert ein Promise zurück:", promiseExample);
*/


// Beispiel: Daten direkt laden, wenn die Seite öffnet
// loadPosts();
// const loadBtn = document.getElementById("loadBtn");
const statusDiv = document.getElementById("status");
const postsDiv = document.getElementById("posts");

// Funktion zum Anzeigen der Beiträge
function showPosts(posts) {
  postsDiv.innerHTML = "";

  posts.slice(0, 5).forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");

    postElement.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
    `;

    postsDiv.appendChild(postElement);
  });
}

// Async/Await Beispiel
async function loadPosts() {
  statusDiv.textContent = "Daten werden geladen...";
  postsDiv.innerHTML = "";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!response.ok) {
      throw new Error("Fehler beim Laden der Daten.");
    }

    const data = await response.json();

    statusDiv.textContent = "Daten erfolgreich geladen.";
    showPosts(data);
  } catch (error) {
    statusDiv.textContent = "Fehler: " + error.message;
  }
}

loadBtn.addEventListener("click", loadPosts);