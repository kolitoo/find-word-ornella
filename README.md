# 🌊 ORNELUSH - Jeu de Mots Maritime

Un jeu de type TUSMO avec une thématique maritime ! Devinez les mots en 6 essais maximum.

## 🎮 Mots à découvrir

1. MOUSSAILLON (11 lettres)
2. MATELOT (7 lettres)
3. BÂBORD (6 lettres)
4. NAVIGUER (8 lettres)

## 🎯 Comment jouer

- La première lettre du mot est révélée
- Tapez un mot et validez avec Entrée
- Les lettres sont colorées selon leur position :
  - 🟥 **Rouge** : Lettre bien placée
  - 🟧 **Orange** : Lettre présente mais mal placée
  - ⬛ **Gris** : Lettre absente du mot
- Vous avez 6 essais pour trouver chaque mot
- Une fois un mot trouvé, passez au suivant !

## 🚀 Déploiement sur GitHub Pages

### Étape 1 : Créer un repository GitHub

1. Allez sur [GitHub](https://github.com) et connectez-vous
2. Cliquez sur le bouton **"New"** pour créer un nouveau repository
3. Donnez un nom à votre repository (ex: `ornelush`)
4. Laissez-le public
5. Cliquez sur **"Create repository"**

### Étape 2 : Pousser le code

Dans votre terminal, depuis le dossier du projet :

```bash
# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Premier commit - Jeu Ornelush"

# Ajouter le repository distant (remplacez USERNAME et REPO par vos valeurs)
git remote add origin https://github.com/USERNAME/REPO.git

# Pousser le code
git branch -M main
git push -u origin main
```

### Étape 3 : Activer GitHub Pages

1. Sur votre repository GitHub, allez dans **Settings** (Paramètres)
2. Dans le menu de gauche, cliquez sur **Pages**
3. Dans la section **Source**, sélectionnez **"main"** comme branche
4. Cliquez sur **Save**
5. Attendez quelques minutes, votre site sera disponible à l'adresse : `https://USERNAME.github.io/REPO/`

## 📁 Structure du projet

```
ornelush/
│
├── index.html      # Structure HTML du jeu
├── style.css       # Styles et design
├── script.js       # Logique du jeu
└── README.md       # Ce fichier
```

## 🛠️ Technologies utilisées

- **HTML5** - Structure
- **CSS3** - Design et animations
- **JavaScript** - Logique du jeu
- Aucune dépendance externe - 100% vanilla !

## ✨ Fonctionnalités

- ✅ Interface inspirée de TUSMO
- ✅ Clavier virtuel AZERTY
- ✅ Support du clavier physique
- ✅ Animations fluides
- ✅ Design responsive (mobile & desktop)
- ✅ Gestion des caractères accentués (â, é, etc.)
- ✅ Progression sur 4 mots

## 📱 Compatibilité

- ✅ Chrome, Firefox, Safari, Edge
- ✅ Mobile et tablette
- ✅ Pas besoin de serveur backend

## 🎨 Personnalisation

Pour modifier les mots du jeu, éditez le fichier `script.js` :

```javascript
const WORDS = ['MOUSSAILLON', 'MATELOT', 'BÂBORD', 'NAVIGUER'];
```

Vous pouvez ajouter autant de mots que vous voulez !

## 📝 Licence

Projet libre - Utilisez-le comme bon vous semble ! 🎉

---

Créé avec ❤️ pour Ornella

