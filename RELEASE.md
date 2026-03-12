# Release Workflow

Processus de release pour `house_price_admin`. Toutes les releases partent de `develop` vers `master`.

## Branches

| Branche      | Rôle                                                    |
| ------------ | ------------------------------------------------------- |
| `develop`    | Branche d'intégration — toutes les features mergent ici |
| `master`     | Branche de production — uniquement les releases         |
| `feat/*`     | Nouvelles fonctionnalités                               |
| `fix/*`      | Corrections de bugs                                     |
| `refactor/*` | Refactoring sans changement de comportement             |

---

## Processus complet

### 1. Bump de version

Sur `develop`, modifier manuellement `package.json` :

```json
{
  "version": "0.5.0"
}
```

Commit dédié :

```bash
git add package.json
git commit -m "chore(release): bump version to 0.5.0"
git push origin develop
```

### 2. Pull Request develop → master

Créer une PR sur GitHub :

- **base** : `master`
- **compare** : `develop`
- **titre** : `Release: v0.5.0 — <nom de la release>`

Merger la PR.

### 3. Tag sur master

```bash
git checkout master
git pull origin master
git tag -a v0.5.0 -m "release: v0.5.0 - <description courte>"
git push origin v0.5.0
```

### 4. Resync develop

```bash
git checkout develop
git merge master
git push origin develop
```

---

## Versioning

Format : `MAJOR.MINOR.PATCH` — [Semantic Versioning](https://semver.org/)

| Incrément | Quand                                                 |
| --------- | ----------------------------------------------------- |
| `MAJOR`   | Breaking change — incompatibilité API ou architecture |
| `MINOR`   | Nouvelle feature rétrocompatible                      |
| `PATCH`   | Bugfix rétrocompatible                                |

---

## Historique des releases

| Version  | Date     | Description                           |
| -------- | -------- | ------------------------------------- |
| `v0.3.0` | Mar 2026 | Admin Dashboard Foundation            |
| `v0.4.0` | Mar 2026 | Property Management & Offline Support |

---

## Règles

- Ne jamais commiter directement sur `master`
- Le tag est toujours créé **après** le merge sur `master`, jamais avant
- Un tag = un commit sur `master`, pas sur `develop`
- Le message du tag doit correspondre exactement à la version taguée
