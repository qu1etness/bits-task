# Bits Task — Dashboard

This adds a `Dashboard` page with filters, actions, add/update modals, delete confirmation, and a card grid.

Quick start (Windows PowerShell):

1. Install dependencies

```powershell
npm install
```

2. Run json-server (optional but recommended) from project root:

```powershell
npx json-server --watch db.json --port 3000
```

This serves the fake API at `http://localhost:3000/wishes`.

3. Start dev server

```powershell
npm run dev
```

Open `http://localhost:5173/dashboard` (port may vary).

Notes:
- The Dashboard uses `src/lib/wishes-api.ts` to call the fake API. If json-server isn't running the app will still work but POST/PUT/DELETE will fail.
- Components added in `src/components/dashboard/`.

