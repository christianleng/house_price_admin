# House Price Admin 🏠⚙️

Interface d'administration de la plateforme House Price.

> Ce module admin est volontairement découplé du frontend principal. Il s'agit d'une opportunité d'approfondir des patterns d'ingénierie complémentaires — en particulier l'**Architecture Hexagonale**, une culture **Design System** poussée via Storybook, et une séparation stricte entre **server state** (React Query) et **client state** (MobX).

---

## 🏗️ Architecture

L'admin repose sur deux principes combinés : **Architecture Hexagonale** (Ports & Adapters) et **Feature-Based Organization**. Le premier garantit que la logique métier ne dépend jamais d'un framework. Le second garantit que chaque fonctionnalité est autonome et navigable sans connaître le reste du projet.

### Pourquoi ces deux ensemble ?

L'architecture hexagonale seule donne une structure en couches (domain → adapters → infrastructure) mais ne dit rien sur comment organiser les features entre elles. Le feature-based seul groupe bien les fonctionnalités mais ne protège pas la logique métier des frameworks. Combinés, on obtient à la fois la protection du domaine et la navigation par contexte fonctionnel.

---

## 📁 Structure

```
src/
├── 00-domain/
├── 01-adapters/
├── 02-infrastructure/
├── app/
├── features/
├── shared/
└── stories/
```

---

### `00-domain/`

**Le cœur métier. Zéro dépendance externe — pas de React, pas de fetch, pas de cookies.**

C'est la couche la plus précieuse du projet. Elle peut tourner dans un worker Node.js, un test unitaire, ou une autre app sans rien installer. Si ce dossier importe quoi que ce soit depuis l'extérieur, c'est un bug d'architecture.

```
00-domain/
├── entities/     ← Types métier en camelCase (jamais de snake_case venu de l'API)
├── ports/        ← Interfaces abstraites que les adapters doivent respecter
└── use-cases/    ← Règles métier pures (validation, permissions, logique d'approbation)
```

**`entities/`** — Les modèles du domaine. `User`, `Property`, `LoginCredentials`. Jamais de DTO ici — si un type a du `snake_case`, c'est qu'il est trop proche de l'API et doit être dans un adapter.

**`ports/`** — Les contrats. `IAuthService`, `ITokenStorage`, `IPropertyRepository`. Le domaine définit _ce dont il a besoin_, pas _comment c'est implémenté_. C'est la clé de l'hexagonale : les adapters dépendent du domaine, jamais l'inverse.

**`use-cases/`** — La logique applicative pure. Des fonctions sans effet de bord qui expriment ce que l'app fait métier. Exemple : une propriété ne peut pas être publiée sans photo. Cette règle ne vit ni dans un composant React ni dans un endpoint API — elle vit ici.

---

### `01-adapters/`

**Les implémentations concrètes des ports. Tout ce qui touche au réseau, aux cookies, au localStorage vit ici.**

Le numéro `01` signifie qu'il dépend de `00-domain` et de rien d'autre. Un adapter n'importe jamais depuis `02-infrastructure` ou `features/`.

```
01-adapters/
└── http/
    ├── ApiClient.ts          ← Client HTTP générique avec injection du token
    ├── ApiError.ts           ← Erreurs HTTP typées
    ├── endpoints.ts          ← Centralisation des URLs
    ├── HttpAuthAdapter.ts    ← Implémente IAuthService + mapping DTO → entité
    └── TokenStorageAdapter.ts ← Implémente ITokenStorage via js-cookie
```

**Pourquoi `ApiClient` injecte le token plutôt que d'importer `tokenStorage` directement ?** Parce que le client HTTP ne devrait pas décider comment obtenir le token. On lui passe un getter `() => string | undefined` au moment de l'instanciation. Si demain on change de `js-cookie` vers `httpOnly cookies`, seul `TokenStorageAdapter` change — `ApiClient` ne sait pas.

**Pourquoi les DTOs restent dans les adapters ?** `AuthTokenDto` avec `access_token` en snake_case reflète ce que l'API FastAPI retourne. Ce format n'a rien à faire dans le domaine. L'adapter reçoit le DTO, fait le mapping, et expose une entité propre en camelCase vers le reste de l'app.

---

### `02-infrastructure/`

**La glue entre les frameworks et le domaine. React Query, le router, les providers React.**

Le numéro `02` signifie qu'il dépend de `00-domain` et de `01-adapters`. C'est ici que les frameworks "touchent" le domaine — mais de façon contrôlée.

```
02-infrastructure/
├── auth/          ← AuthProvider : React Context qui orchestre l'état de session
├── react-query/   ← Hooks React Query par domaine fonctionnel + config QueryClient
└── router/        ← createBrowserRouter, guards, loaders
```

**Pourquoi `auth/` et non `mobx/` ?** Le projet utilise actuellement React Context + React Query pour gérer la session. Nommer le dossier `mobx/` alors qu'il n'y a pas encore de MobX était trompeur. Le dossier porte le nom de la responsabilité (`auth`), pas de la technologie.

**Pourquoi `react-query/` dans `infrastructure/` et non dans `features/` ?** Les hooks React Query (`useCurrentUser`, `useLoginMutation`) ne sont pas des composants — ils n'ont pas d'opinion sur l'UI. Ils vivent dans l'infrastructure et sont consommés par les features. Si demain on remplace React Query par SWR, on ne touche qu'à ce dossier.

**Pourquoi un `router/` dans l'infrastructure ?** Le router dépend de React Router, connaît toutes les features, et orchestre les guards d'auth. C'est de la configuration de framework — pas de la logique feature, pas du domaine. L'infrastructure est le seul endroit cohérent.

---

### `app/`

**Le point d'entrée et le shell de l'application. Tout ce qui est global sans être métier.**

```
app/
├── config/      ← Variables d'environnement (VITE_API_URL, VITE_APP_NAME)
├── layouts/     ← RootLayout + composants du shell (Sidebar, Header, Nav)
└── providers/   ← Composition des providers React (QueryProvider, AppProviders)
```

**Pourquoi `layouts/` dans `app/` et non dans `features/` ?** `AppSidebar`, `SiteHeader`, `NavMain` sont des composants du shell applicatif — ils font partie du layout global, pas d'une feature métier. Ils ne seraient pas réutilisables dans un autre projet. `features/` accueille ce qui est fonctionnel et potentiellement partageable entre projets. Le shell appartient à _cette app_.

**Pourquoi `QueryProvider` et `AppProviders` coexistent-ils ?** `QueryProvider` encapsule tout ce qui concerne React Query — le client et les DevTools. `AppProviders` compose tous les providers de l'app. La séparation permet de modifier la config React Query sans toucher à l'orchestration générale des providers.

---

### `features/`

**Organisation par domaine fonctionnel, pas par type technique.**

Chaque feature est un module autonome. Elle contient ses composants, ses hooks locaux, et ses stores si besoin. Une feature peut être supprimée en supprimant son dossier — sans chercher ses morceaux dans cinq dossiers différents.

```
features/
├── auth/           ← Login, protection des routes, session UI
├── dashboard/      ← Page d'accueil admin avec métriques
└── properties/     ← CRUD propriétés, filtres, pagination
```

**Pourquoi la feature `auth/` contient `ProtectedLayout` ?** Parce que protéger une route est une responsabilité de l'authentification. `ProtectedLayout` vérifie si l'utilisateur est connecté — c'est de la logique auth, pas de la logique layout.

---

### `shared/`

**Ce qui est transversal à toutes les features. Zéro opinion métier.**

La règle pour décider si quelque chose va dans `shared/` : peut-on l'utiliser dans n'importe quelle feature sans contexte ? Un `Button`, un `Badge`, un `cn()` — oui. Un `PropertyCard` — non, c'est spécifique à une feature.

```
shared/
├── hooks/    ← Hooks utilitaires (use-mobile, use-debounce...)
├── pages/    ← Pages sans feature (NotFoundPage, RootErrorBoundary)
├── ui/       ← Primitives shadcn/ui uniquement
└── utils/    ← cn(), formatters, helpers purs
```

**Pourquoi `NotFoundPage` et `RootErrorBoundary` sont dans `shared/pages/` et non dans `shared/ui/` ?** `shared/ui/` contient des primitives UI réutilisables — des briques de construction. `NotFoundPage` et `RootErrorBoundary` sont des pages complètes. Mélanger des pages avec des boutons dans le même dossier casse la clarté du dossier `ui/`.

---

### `stories/`

**Documentation vivante des composants via Storybook.**

Chaque composant de `shared/ui/` est documenté et testé dans Storybook avant intégration. Storybook joue trois rôles : catalogue visuel de tous les états d'un composant, contrat de design pour valider les tokens, et tests d'interaction via `@storybook/addon-interactions`.

---

## 🔄 Règle de dépendances

```
00-domain        ← ne dépend de RIEN
01-adapters      ← dépend de 00-domain seulement
02-infrastructure ← dépend de 00-domain + 01-adapters + frameworks
features/        ← dépend de 02-infrastructure + types de 00-domain
app/             ← dépend de tout (point d'entrée)
shared/          ← ne dépend d'aucune feature
```

**Une flèche dans l'autre sens = bug d'architecture.** Si `00-domain` importe depuis `01-adapters`, si `shared/` importe depuis `features/`, ou si `01-adapters` importe depuis `02-infrastructure` — c'est une violation à corriger immédiatement.

---

## 🔀 Server State vs Client State

```
React Query  → données serveur   (propriétés, users, stats)
MobX/Context → état client       (session, sidebar, toasts, thème)
```

La règle : si la donnée vient du serveur et peut devenir stale, c'est React Query. Si c'est un état UI qui ne nécessite pas de réseau pour être vrai, c'est MobX ou Context.

---

_Développé par Christian.L — Architecture & Design System comme disciplines de fond._
