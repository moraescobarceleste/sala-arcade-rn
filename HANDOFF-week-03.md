git config user.name "Tu Nombre"
git config user.email "tu-correo-de-github@ejemplo.com"
git status

git add src/navigation src/screens/HomeScreen.tsx src/components/ItemCard.tsx src/utils/format.ts App.tsx
git commit -m "feat(navigation): add typed tab and nested stack navigators"

git add src/screens/DetailScreen.tsx
git commit -m "feat(machines): add detail screen with typed route params"

git add src/screens/FavoritesScreen.tsx
git commit -m "feat(favorites): add favorites screen with static items"

git add HANDOFF-week-03.md
git commit -m "docs: add HANDOFF-week-03"

git status
git log --oneline -6
