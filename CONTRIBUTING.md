# Contributing to WINDIA

Read this fully before you start. Following these rules will save everyone from merge conflicts and broken code.

---

## 1. Fork the Repo

1. Go to the repo on GitHub and click **Fork** (top right).
2. This creates a copy under your GitHub account.

## 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/WINDIA.git
cd WINDIA
```

## 3. Set Upstream (One-Time Setup)

This links your fork to the original repo so you can pull the latest changes.

```bash
git remote add upstream https://github.com/Nehagowd06/WINDIA.git
```

Verify it:

```bash
git remote -v
```

You should see both `origin` (your fork) and `upstream` (the main repo).

## 4. Install Dependencies

```bash
cd frontend
npm install
```

## 5. Stay Updated (Do This Every Time Before You Start Working)

```bash
git checkout main
git pull upstream main
git push origin main
```

This keeps your fork in sync. **Never skip this.**

---

## Workflow Rules

### Rule 1: Always Create a Branch

Never work directly on `main`. Always create a new branch for every task.

```bash
git checkout main
git pull upstream main
git checkout -b your-branch-name
```

Use clear branch names:
- `fix/navbar-alignment`
- `feature/add-cart-page`
- `docs/update-readme`

### Rule 2: Create an Issue First

Before starting any work:

1. Go to the **Issues** tab on the main repo (not your fork).
2. Click **New Issue**.
3. Clearly describe what you're working on.
4. Wait for the issue to be **assigned to you** before opening a PR.

> You **can** start working before assignment, but **do not open a PR** until the issue is assigned to you.

### Rule 3: Build Before You Push

The frontend is deployed on Vercel. If your code doesn't build, it breaks the deployment for everyone.

**Always run the build before pushing:**

```bash
cd frontend
npm run build
```

If the build fails, **fix it before pushing**. Do not push broken code.

### Rule 4: Pull Before You Push

Every time before pushing your code:

```bash
git checkout main
git pull upstream main
git checkout your-branch-name
git merge main
```

Fix any conflicts locally if they come up, then:

```bash
git add .
git commit -m "your commit message"
git push origin your-branch-name
```

### Rule 5: Small, Clear Commits

- Commit often with meaningful messages.
- Don't dump everything into one giant commit.

```bash
git add .
git commit -m "fix: corrected header alignment on mobile"
```

Use prefixes:
- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation changes
- `style:` — CSS / formatting (no logic change)
- `refactor:` — code restructure (no feature change)

### Rule 6: Open a PR (After Assignment Only)

1. Push your branch to your fork.
2. Go to the **original repo** on GitHub.
3. Click **Compare & pull request**.
4. In the PR description:
   - Reference the issue: `Closes #issue-number`
   - Briefly describe what you changed.
5. Request a review.

### Rule 7: Never Push to Main

- Never commit directly to `main`.
- Never force push (`git push --force`). If you think you need to, ask first.

### Rule 8: Pull Again After PR is Merged

Once your PR is merged, sync your fork:

```bash
git checkout main
git pull upstream main
git push origin main
```

Then delete your old branch:

```bash
git branch -d your-branch-name
```

---

## Quick Reference

| Action | Command |
|---|---|
| Clone your fork | `git clone https://github.com/YOU/WINDIA.git` |
| Add upstream | `git remote add upstream https://github.com/OWNER/WINDIA.git` |
| Sync main | `git pull upstream main` |
| New branch | `git checkout -b branch-name` |
| Test build | `cd frontend && npm run build` |
| Stage changes | `git add .` |
| Commit | `git commit -m "message"` |
| Push branch | `git push origin branch-name` |
| Merge main into branch | `git checkout branch-name && git merge main` |
| Delete local branch | `git branch -d branch-name` |

---

## Common Mistakes to Avoid

- **Working on `main`** — always branch off.
- **Not pulling before pushing** — causes merge conflicts.
- **Not running `npm run build` before pushing** — breaks the Vercel deployment.
- **Opening a PR without an assigned issue** — it will be closed.
- **Force pushing** — don't. Ask for help instead.
- **Huge PRs with unrelated changes** — keep PRs focused on one task.

If you're stuck, ask in the group. Don't guess and push broken code.
