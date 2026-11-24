# Moodle Quiz Builder — web app installabile

## Contenuto della cartella

- `index.html` — l'applicazione
- `manifest.webmanifest` — nome, icone e colori dell'app installata
- `sw.js` — service worker: uso offline e aggiornamenti
- `icons/` — icone dell'app

I file vanno tenuti insieme in quest'ordine, nella radice del sito.

## 1. Pubblicazione su GitHub Pages (gratuita, una volta sola)

1. Crea un account su github.com, se non ce l'hai.
2. In alto a destra fai «+» → «New repository». Dai un nome, per esempio `quiz-builder`, e scegli **Public**. Con il piano gratuito GitHub Pages funziona solo sui repository pubblici. La chiave API non sta mai nei file, quindi la pubblicazione non espone niente di riservato.
3. Nel repository appena creato fai «Add file» → «Upload files». Trascina **il contenuto** di questa cartella: `index.html`, `manifest.webmanifest`, `sw.js` e la cartella `icons`. Poi premi «Commit changes».
4. Vai su «Settings» → «Pages». Alla voce «Branch» scegli `main` e la cartella `/ (root)`, poi premi «Save».
5. Dopo uno o due minuti l'app è online all'indirizzo `https://TUO-UTENTE.github.io/quiz-builder/`.

## 2. Installazione su macOS e Windows

Apri l'indirizzo con **Chrome** o **Edge**.

- Se compare il pulsante «⬇ Installa app» nell'intestazione, premilo. In alternativa usa l'icona di installazione nella barra degli indirizzi, oppure il menu ⋮ → «Trasmetti, salva e condividi» → «Installa pagina come app».
- Su **macOS** l'app finisce in Applicazioni/Launchpad e puoi tenerla nel Dock. Con **Safari** (macOS Sonoma o successivo) usa File → «Aggiungi al Dock».
- Su **Windows** l'app compare nel menu Start e si può aggiungere alla barra delle applicazioni.

L'app si apre in una finestra propria e funziona anche senza rete, tranne la generazione da paper.

## 3. Primo avvio: la chiave API

La funzione «📚 Genera da paper», compreso il rilevamento automatico del riferimento, usa l'API di Anthropic.

1. Su https://console.anthropic.com crea un account, aggiungi un metodo di pagamento e genera una chiave in «API Keys».
2. Nell'app apri «⚙ Impostazioni», incolla la chiave, premi «Verifica chiave» e poi «Salva».

La chiave resta salvata solo nel browser di quel computer e viene inviata soltanto ad `api.anthropic.com`. L'uso si paga a consumo sul Console, separatamente dall'abbonamento a Claude. Nelle impostazioni puoi scegliere il modello e quanto testo della fonte inviare: più testo significa domande su più capitoli, ma anche un costo maggiore.

## 4. Più fonti e un file per fonte (dalla versione 1.7)

1. Premi «📚 Genera da paper» e seleziona tutti i PDF insieme, fino a 30.
2. Per ogni fonte l'app legge il testo e propone il riferimento bibliografico e due-quattro parole chiave. Controllali e correggili nella tabella. Il riferimento viene citato in ogni domanda; le parole chiave formano il nome del file. Nella stessa tabella decidi quante domande generare per ciascuna fonte e in che ordine numerarle.
3. Scegli tipi e lingua e avvia: la generazione procede una fonte alla volta. Se una fonte non va a buon fine puoi riprovare solo quella.
4. Rivedi le domande e importale. Ognuna resta legata alla sua fonte, visibile come «F01 · parole chiave».
5. «⬇ Per fonte» scarica uno ZIP con un file per fonte, per esempio `01_governance-algoritmica_aiken.txt`, insieme a `00_indice-fonti.csv` con numero, riferimento e parole chiave. In AIKEN entrano solo le MCQ a risposta singola. Con GIFT o XML l'app può creare anche una categoria Moodle per ogni fonte.
6. Da «📄 Fonti» cambi l'ordine (cioè la numerazione dei file), il riferimento e le parole chiave.

## 5. Dati e aggiornamenti

- La banca domande si salva automaticamente nel browser in cui usi l'app. Per spostarla su un altro computer esportala con «⬇ JSON» e caricala con «⚙ Impostazioni» → «⬆ Importa JSON».
- Se cancelli i dati del sito dal browser, cancelli anche la banca. Per questo conviene esportare un JSON di tanto in tanto.
- Per aggiornare l'app carica sul repository il nuovo `index.html` al posto del vecchio. L'app installata riceve la nuova versione alla successiva apertura con la rete attiva. Se modifichi anche `sw.js`, cambia il valore di `VERSION` al suo interno.
