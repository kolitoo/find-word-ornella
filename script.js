// Liste des mots à deviner
const WORDS = ['MOUSSAILLON', 'MATELOT', 'BÂBORD', 'NAVIGUER'];
const MAX_ATTEMPTS = 6;

// État du jeu
let currentWordIndex = 0;
let currentAttempt = 0;
let currentGuess = '';
let gameActive = false;
let keyboardState = {};

// Clavier AZERTY
const KEYBOARD_LAYOUT = [
    ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
    ['⌫', 'W', 'X', 'C', 'V', 'B', 'N', '↵']
];

// Normalisation des caractères pour la comparaison
function normalizeChar(char) {
    return char.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
}

function normalizeWord(word) {
    return word.split('').map(char => normalizeChar(char)).join('');
}

// Initialisation du jeu
function init() {
    document.getElementById('btn-word-of-day').addEventListener('click', startGame);
    document.getElementById('home-btn').addEventListener('click', goHome);
    document.getElementById('restart-btn').addEventListener('click', restartGame);
    
    // Écouter le clavier physique
    document.addEventListener('keydown', handlePhysicalKeyboard);
}

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    currentWordIndex = 0;
    loadWord();
}

function loadWord() {
    if (currentWordIndex >= WORDS.length) {
        showVictory();
        return;
    }
    
    currentAttempt = 0;
    currentGuess = '';
    gameActive = true;
    keyboardState = {};
    
    document.getElementById('current-word-number').textContent = currentWordIndex + 1;
    document.getElementById('message').textContent = '';
    
    createGrid();
    createKeyboard();
    updateAttemptsInfo();
}

function updateAttemptsInfo() {
    let attemptsInfo = document.getElementById('attempts-info');
    if (!attemptsInfo) {
        attemptsInfo = document.createElement('div');
        attemptsInfo.id = 'attempts-info';
        document.getElementById('progress-info').after(attemptsInfo);
    }
    attemptsInfo.innerHTML = `<p>Tentative ${currentAttempt + 1}/${MAX_ATTEMPTS}</p>`;
}

function createGrid() {
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';
    
    const currentWord = WORDS[currentWordIndex];
    const wordLength = currentWord.length;
    
    // Créer UNE SEULE ligne pour la tentative actuelle
    const row = document.createElement('div');
    row.className = 'grid-row';
    row.id = 'current-row';
    
    for (let j = 0; j < wordLength; j++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.id = `cell-${j}`;
        
        // Afficher la première lettre
        if (j === 0) {
            cell.textContent = currentWord[0];
            cell.classList.add('first-letter');
        }
        
        row.appendChild(cell);
    }
    
    gridContainer.appendChild(row);
}

function createKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';
    
    KEYBOARD_LAYOUT.forEach(row => {
        const keyboardRow = document.createElement('div');
        keyboardRow.className = 'keyboard-row';
        
        row.forEach(key => {
            const keyButton = document.createElement('button');
            keyButton.className = 'key';
            keyButton.textContent = key;
            
            if (key === '⌫' || key === '↵') {
                keyButton.classList.add('wide');
            }
            
            if (keyboardState[normalizeChar(key)]) {
                keyButton.classList.add(keyboardState[normalizeChar(key)]);
            }
            
            keyButton.addEventListener('click', () => handleKeyPress(key));
            keyboardRow.appendChild(keyButton);
        });
        
        keyboard.appendChild(keyboardRow);
    });
}

function handlePhysicalKeyboard(event) {
    if (!gameActive) return;
    
    const key = event.key.toUpperCase();
    
    if (key === 'BACKSPACE') {
        handleKeyPress('⌫');
    } else if (key === 'ENTER') {
        handleKeyPress('↵');
    } else if (/^[A-Z]$/.test(key)) {
        handleKeyPress(key);
    }
}

function handleKeyPress(key) {
    if (!gameActive) return;
    
    const currentWord = WORDS[currentWordIndex];
    const wordLength = currentWord.length;
    
    if (key === '⌫') {
        // Effacer la dernière lettre (sauf la première)
        if (currentGuess.length > 1) {
            currentGuess = currentGuess.slice(0, -1);
            updateCurrentRow();
        }
    } else if (key === '↵') {
        // Valider le mot
        if (currentGuess.length === wordLength) {
            submitGuess();
        } else {
            showMessage('Mot incomplet !', 'error');
        }
    } else {
        // Ajouter une lettre
        if (currentGuess.length < wordLength) {
            if (currentGuess.length === 0) {
                currentGuess = currentWord[0]; // Garder la première lettre
            }
            currentGuess += key;
            updateCurrentRow();
        }
    }
}

function updateCurrentRow() {
    const currentWord = WORDS[currentWordIndex];
    const wordLength = currentWord.length;
    
    for (let i = 0; i < wordLength; i++) {
        const cell = document.getElementById(`cell-${i}`);
        if (i < currentGuess.length) {
            cell.textContent = currentGuess[i];
            cell.classList.add('filled');
        } else {
            if (i === 0) {
                cell.textContent = currentWord[0];
                cell.classList.add('first-letter');
            } else {
                cell.textContent = '';
                cell.classList.remove('filled');
            }
        }
    }
}

function submitGuess() {
    const currentWord = WORDS[currentWordIndex];
    const normalizedGuess = normalizeWord(currentGuess);
    const normalizedWord = normalizeWord(currentWord);
    
    // Vérifier chaque lettre
    const letterCount = {};
    const result = new Array(currentWord.length).fill('absent');
    
    // D'abord, compter les lettres du mot cible (normalisées)
    for (let i = 0; i < normalizedWord.length; i++) {
        letterCount[normalizedWord[i]] = (letterCount[normalizedWord[i]] || 0) + 1;
    }
    
    // Marquer les lettres correctes
    for (let i = 0; i < currentGuess.length; i++) {
        if (normalizedGuess[i] === normalizedWord[i]) {
            result[i] = 'correct';
            letterCount[normalizedGuess[i]]--;
        }
    }
    
    // Marquer les lettres présentes mais mal placées
    for (let i = 0; i < currentGuess.length; i++) {
        if (result[i] === 'absent' && letterCount[normalizedGuess[i]] > 0) {
            result[i] = 'present';
            letterCount[normalizedGuess[i]]--;
        }
    }
    
    // Appliquer les couleurs aux cellules
    for (let i = 0; i < currentGuess.length; i++) {
        const cell = document.getElementById(`cell-${i}`);
        setTimeout(() => {
            cell.className = 'grid-cell'; // Reset classes
            cell.classList.add(result[i]);
        }, i * 150);
        
        // Mettre à jour l'état du clavier
        const normalizedChar = normalizeChar(currentGuess[i]);
        if (!keyboardState[normalizedChar] || 
            (keyboardState[normalizedChar] === 'absent' && result[i] !== 'absent') ||
            (keyboardState[normalizedChar] === 'present' && result[i] === 'correct')) {
            keyboardState[normalizedChar] = result[i];
        }
    }
    
    // Vérifier si le mot est trouvé
    if (normalizedGuess === normalizedWord) {
        setTimeout(() => {
            showMessage('Parfait ! 🎉✨', 'success');
            gameActive = false;
            setTimeout(() => {
                currentWordIndex++;
                loadWord();
            }, 2000);
        }, currentGuess.length * 150);
    } else {
        currentAttempt++;
        if (currentAttempt >= MAX_ATTEMPTS) {
            gameActive = false;
            setTimeout(() => {
                showMessage(`Dommage ! C'était : ${currentWord} 😔`, 'error');
                setTimeout(() => {
                    currentWordIndex++;
                    loadWord();
                }, 3000);
            }, currentGuess.length * 150);
        } else {
            // Réinitialiser pour la prochaine tentative
            setTimeout(() => {
                currentGuess = '';
                updateAttemptsInfo();
                createGrid(); // Recréer la grille vide
                currentGuess = currentWord[0]; // Ajouter la première lettre
                updateCurrentRow();
            }, currentGuess.length * 150 + 500);
        }
    }
    
    setTimeout(() => {
        createKeyboard(); // Mettre à jour le clavier avec les nouvelles couleurs
    }, currentGuess.length * 150);
}

function showMessage(text, type) {
    const message = document.getElementById('message');
    message.textContent = text;
    message.className = `message ${type}`;
    
    setTimeout(() => {
        if (message.textContent === text) { // Ne clear que si c'est toujours le même message
            message.textContent = '';
            message.className = 'message';
        }
    }, 3000);
}

function showVictory() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('victory-screen').style.display = 'block';
}

function goHome() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('victory-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'flex';
    gameActive = false;
}

function restartGame() {
    document.getElementById('victory-screen').style.display = 'none';
    currentWordIndex = 0;
    startGame();
}

// Démarrer l'application
init();
