# House Price Admin 🏠⚙️

Interface d'administration de la plateforme House Price, conçue comme un projet à part entière avec ses propres exigences architecturales et qualitatives.

> **Note :** Ce module admin est volontairement découplé du frontend principal. Il s'agit d'une opportunité d'approfondir des patterns d'ingénierie complémentaires, en particulier l'**Architecture Hexagonale**, l'**Atomic Design** et une culture **Design System** poussée via Storybook.

---

## 🎯 Philosophie du Projet Admin

Là où le frontend principal illustre des stratégies de performance et de routage avancées, le module admin met l'accent sur :

- **La maintenabilité à long terme** via une séparation stricte des responsabilités (Architecture Hexagonale).
- **La cohérence visuelle** grâce à un Design System basé sur des tokens et structuré selon l'Atomic Design.
- **La documentation vivante** avec Storybook comme source de vérité des composants.

---

## 🏗️ Architecture Hexagonale

Le cœur de l'admin repose sur l'**Architecture Hexagonale** (aussi appelée _Ports & Adapters_). L'idée centrale : isoler la logique métier de toute dépendance technique (UI, API, base de données).

```
admin/
├── domain/           # Pure business logic — zero external dependencies
│   ├── entities/     # Business models (Property, User, Stats...)
│   ├── ports/        # Interfaces (contracts) for expected services
│   └── use-cases/    # Application logic (e.g. approveProperty.ts)
│
├── infrastructure/   # Concrete implementations of ports
│   ├── api/          # HTTP adapters (FastAPI)
│   └── repositories/ # Data access layer
│
└── presentation/     # UI layer (React)
    ├── components/   # Components structured with Atomic Design
    └── pages/        # View composition per route
```

**Pourquoi ce choix ?** Dans un contexte admin, la logique métier est dense (validations, règles d'approbation, gestion des droits). L'architecture hexagonale garantit que cette logique reste **testable, portable et indépendante** du framework UI ou de l'implémentation API.

---

## 🎨 Design System : Design Tokens + Atomic Design

### Tokens-First

Comme le frontend principal, l'admin s'appuie sur un système de **Design Tokens OKLCH** via Tailwind CSS v4. Les tokens sont partagés pour garantir une cohérence visuelle entre les deux surfaces.

### Atomic Design

Les composants UI suivent la méthodologie **Atomic Design** de Brad Frost :

| Niveau        | Description                               | Exemples                          |
| ------------- | ----------------------------------------- | --------------------------------- |
| **Atoms**     | Éléments UI indivisibles                  | Button, Badge, Input, Icon        |
| **Molecules** | Combinaisons d'atomes avec un rôle précis | SearchField, StatCard, FormGroup  |
| **Organisms** | Sections complexes et autonomes           | DataTable, PropertyForm, Sidebar  |
| **Templates** | Structures de page sans données réelles   | DashboardLayout, ListPageTemplate |
| **Pages**     | Templates hydratés avec de vraies données | PropertiesPage, UsersPage         |

---

## 📖 Storybook — La Documentation Vivante

Chaque composant (du niveau **Atom** à **Organism**) est documenté et testé dans **Storybook** avant d'être intégré en page.

Storybook joue ici plusieurs rôles :

- **Catalogue visuel** : visualiser chaque composant dans tous ses états (default, loading, error, disabled...).
- **Contrat de design** : valider avec Storybook que les tokens sont correctement appliqués.
- **Tests d'interaction** : via `@storybook/addon-interactions` pour simuler des comportements utilisateur.
- **Documentation auto-générée** : les props TypeScript alimentent directement les `ArgTypes` Storybook.

---

_Développé par Christian.L — Architecture & Design System comme disciplines de fond._
