const textarea = document.getElementById('text-input');
const wordCount = document.getElementById('word-count');
const charCount = document.getElementById('char-count');
const sentenceCount = document.getElementById('sentence-count');
const paragraphCount = document.getElementById('paragraph-count');

const btnSpeak = document.getElementById('btn-speak');
const btnStop = document.getElementById('btn-stop');
const btnTranslate = document.getElementById('btn-translate');
const targetLang = document.getElementById('target-lang');

const dictionary = {
    "hola": { en: "hello", fr: "bonjour" },
    "mundo": { en: "world", fr: "monde" },
    "estudiante": { en: "student", fr: "étudiant" },
    "profesional": { en: "professional", fr: "professionnel" },
    "buenos dias": { en: "good morning", fr: "bonjour" },
    "gracias": { en: "thank you", fr: "merci" },
    "tarea": { en: "homework", fr: "devoirs" },
    "libro": { en: "book", fr: "livre" },
    "escuela": { en: "school", fr: "école" },
    "universidad": { en: "university", fr: "université" },
    "educacion": { en: "education", fr: "éducation" },
    "proyecto": { en: "project", fr: "projet" },
    "trabajo": { en: "work", fr: "travail" },
    "escribir": { en: "write", fr: "écrire" },
    "leer": { en: "read", fr: "lire" }
};

function updateCounters() {
    const text = textarea.value;
    charCount.textContent = text.length;
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    wordCount.textContent = words.length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    sentenceCount.textContent = sentences.length;
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0);
    paragraphCount.textContent = paragraphs.length;
}

textarea.addEventListener('input', updateCounters);

let currentVoiceLang = 'es-ES';
btnSpeak.addEventListener('click', () => {
    window.speechSynthesis.cancel();
    if (textarea.value.trim() === "") {
        alert("Por favor, escribe algo para poder escucharlo.");
        return;
    }
    const utterance = new SpeechSynthesisUtterance(textarea.value);
    utterance.lang = currentVoiceLang;
    window.speechSynthesis.speak(utterance);
});

btnStop.addEventListener('click', () => {
    window.speechSynthesis.cancel();
});

btnTranslate.addEventListener('click', () => {
    let text = textarea.value.trim();
    if (text === "") {
        alert("Escribe o pega un texto para poder traducirlo.");
        return;
    }

    const target = targetLang.value;
    
    if (target === 'es') {
        currentVoiceLang = 'es-ES';
        alert("Texto mantenido en su base original.");
        return;
    }

    currentVoiceLang = target === 'en' ? 'en-US' : 'fr-FR';

    let wordsArray = text.split(/(\s+)/); 
    let translatedArray = wordsArray.map(item => {
        let cleanWord = item.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"");
        if (dictionary[cleanWord] && dictionary[cleanWord][target]) {
            return dictionary[cleanWord][target];
        }
        return item;
    });

    textarea.value = translatedArray.join("");
    updateCounters();
});
