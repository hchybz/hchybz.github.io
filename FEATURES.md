# Fonctionnalités du Site ChybzArt

Ce document décrit les principales fonctionnalités interactives du site.

## 🎨 Barre Latérale Redimensionnable

### Comment utiliser

La barre latérale (sidebar) peut être redimensionnée sur les écrans de bureau (desktop) :

1. **Redimensionner** : 
   - Placez votre curseur sur le bord droit de la sidebar
   - Vous verrez une barre verticale grise qui devient bleue au survol
   - Cliquez et maintenez, puis glissez vers la gauche ou la droite
   - La largeur est limitée entre 200px et 600px

2. **Réinitialiser** :
   - Double-cliquez sur la poignée de redimensionnement pour revenir à la largeur par défaut (256px)

3. **Persistance** :
   - La largeur que vous choisissez est automatiquement sauvegardée dans votre navigateur
   - Elle sera restaurée lors de votre prochaine visite

### Caractéristiques techniques

- **Largeur minimale** : 200px
- **Largeur maximale** : 600px
- **Largeur par défaut** : 256px (équivalent à `w-64` en Tailwind)
- **Stockage** : localStorage du navigateur
- **Responsive** : Désactivé sur mobile (< 768px)

## 📱 Menu Mobile

Sur les petits écrans (< 768px), la sidebar se transforme en menu mobile :

- Cliquez sur l'icône hamburger (☰) pour ouvrir/fermer
- Un overlay semi-transparent apparaît en arrière-plan
- Cliquez sur l'overlay ou un lien pour fermer le menu

## 📂 Navigation par Catégories

### Catégories disponibles

1. **IT** - Articles techniques et informatiques
2. **Non IT** - Projets de menuiserie et bricolage
3. **Projects / Projets** - Projets spéciaux

### Fonctionnement

- Cliquez sur une catégorie pour l'étendre/réduire
- La catégorie de l'article actuel est automatiquement ouverte
- L'article actuel est mis en surbrillance en bleu

## 📅 Navigation par Dates

La section "Par Dates" / "By Date" permet de parcourir les articles chronologiquement :

- **Groupement par année** : Les articles sont regroupés par année
- **Tri décroissant** : Les articles les plus récents en premier
- **Date affichée** : Format MM/DD devant chaque titre
- **Badges de catégorie** : Chaque article affiche sa catégorie en badge coloré

### Couleurs des badges

Les couleurs sont configurables dans `hugo.toml` :

```toml
[params.categoryColors]
  [params.categoryColors.IT]
    bg = "bg-blue-100"
    text = "text-blue-700"
  [params.categoryColors.NonIT]
    bg = "bg-green-100"
    text = "text-green-700"
  [params.categoryColors.Projects]
    bg = "bg-purple-100"
    text = "text-purple-700"
```

## 🌐 Multilingue

Le site est disponible en deux langues :

- **Français** (fr) - Langue par défaut
- **English** (en)

### Changement de langue

- Utilisez le sélecteur de langue dans le header
- Chaque article peut avoir une traduction liée via `translationKey` dans le front matter
- Les menus et l'interface s'adaptent automatiquement à la langue

## 🎠 Carrousel d'Images

Sur les pages d'articles, un carrousel permet de naviguer entre plusieurs images :

- **Navigation** : Boutons précédent/suivant
- **Indicateurs** : Points cliquables pour accéder directement à une image
- **Clavier** : Flèches gauche/droite pour naviguer
- **Transitions** : Animations fluides entre les images

## 📊 Analytics

Le site utilise GoatCounter pour l'analyse de trafic :

- Configuration dans `hugo.toml` : `params.goatcounter = 'chybzart'`
- Respecte la vie privée des utilisateurs
- Pas de cookies invasifs

## 🎨 Thème et Styles

- **Framework CSS** : Tailwind CSS
- **Typographie** : Classe `.prose` personnalisée pour le contenu
- **Responsive** : Design adaptatif pour mobile, tablette et desktop
- **Scrollbar** : Scrollbar personnalisée pour la sidebar

## ⚙️ Configuration

### Fichiers principaux

- `hugo.toml` - Configuration du site
- `themes/chybz/assets/js/main.js` - JavaScript pour interactivité
- `themes/chybz/assets/css/main.css` - Styles personnalisés
- `i18n/fr.toml` et `i18n/en.toml` - Traductions de l'interface

### Structure de contenu

```
content/
├── fr/
│   ├── posts/        # Articles en français
│   └── about/        # Page À propos
└── en/
    ├── posts/        # Articles en anglais
    └── about/        # About page
```

## 🔧 Développement

### Tester localement

```bash
hugo server --buildDrafts
```

### Build de production

```bash
hugo --minify
```

### Déploiement

Le site est déployé automatiquement sur GitHub Pages via GitHub Actions lors d'un push sur la branche principale.

---

**Note** : Ce document sera mis à jour au fur et à mesure de l'ajout de nouvelles fonctionnalités.