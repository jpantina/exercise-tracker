# Free public hosting

This app is a static site: the browser downloads `index.html`, `styles.css`, and `app.js`, then saves workout entries in that browser's `localStorage`. Because there is no database or server-side account system, each device/browser has its own saved log.

## First: make sure these files are pushed to GitHub

If GitHub still shows **0 Pull Requests**, no recent commits, or no workflow runs under **Actions**, then the changes from this coding workspace have not been pushed to your GitHub repository yet. This workspace can create commits, but you still need to push them to GitHub from a terminal that has access to your repository.

From this project folder, run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/exercise-tracker.git
git branch -M main
git push -u origin main
```

If `origin` already exists, use this instead:

```bash
git push origin main
```

After that, refresh GitHub. You should see the new files, including `DEPLOYMENT.md`, `netlify.toml`, `vercel.json`, and `.github/workflows/deploy-github-pages.yml`.

## Recommended free option: GitHub Pages

Use this if you are okay making the repository public and want a free public URL like `https://YOUR_USERNAME.github.io/exercise-tracker/`.

> Important: on GitHub Free, a repository usually needs to be public for a public GitHub Pages site. Your screenshot shows the repository is currently **Private**, so GitHub Pages may not publish publicly until you make the repository public or use a paid plan. If you want to keep the repo private while using a free public URL, use Netlify or Vercel instead.

### Option A: match the Pages screen in your screenshot

Your screenshot shows **Source: Deploy from a branch**, **Branch: main**, and **Folder: /(root)**. This repository now supports that setup.

1. Push this repository to GitHub.
2. If you are using GitHub Pages on the free plan, make the repository public from **Settings > General > Danger Zone > Change repository visibility**.
3. In GitHub, open **Settings > Pages**.
4. Under **Build and deployment**, keep **Source** as **Deploy from a branch**.
5. Set **Branch** to `main` and **Folder** to `/(root)`.
6. Click **Save** if the button is enabled.
7. Wait a minute or two, then open `https://YOUR_USERNAME.github.io/exercise-tracker/` on your phone.

The root `index.html` redirects visitors to the real app in `public/`, so this branch-based setup works even though the app files remain organized under `public/`.

### Option B: use the included GitHub Actions workflow

1. Push this repository to GitHub.
2. If you are using GitHub Pages on the free plan, make the repository public from **Settings > General > Danger Zone > Change repository visibility**.
3. In GitHub, open **Settings > Pages**.
4. Under **Build and deployment**, change **Source** to **GitHub Actions**.
5. Push to the `main` branch, or open the **Actions** tab and manually run **Deploy static app to GitHub Pages**.
6. When the workflow finishes, open the URL shown in the workflow summary or in **Settings > Pages**.

The workflow in `.github/workflows/deploy-github-pages.yml` publishes the `public/` folder directly, so there is no build step.

## Also free: Netlify

Use this if you want the simplest drag-and-drop or Git-connected deployment.

### Drag and drop

1. Go to `https://app.netlify.com/drop`.
2. Drag the `public/` folder onto the page.
3. Netlify gives you a public URL.

### Git-connected Netlify site

1. Create a new Netlify site from this Git repository.
2. Use these settings:
   - **Build command:** leave blank
   - **Publish directory:** `public`
3. Deploy.

The included `netlify.toml` already sets `public` as the publish directory.

## Also free: Vercel

Use this if you already prefer Vercel.

1. Import this Git repository in Vercel.
2. Keep the framework preset as **Other** if asked.
3. Use these settings:
   - **Build command:** leave blank
   - **Output directory:** `public`
4. Deploy.

The included `vercel.json` tells Vercel to publish the `public/` folder.

## What changes when it is public?

- Your phone can open the public URL from Wi-Fi or cellular data.
- You do not need to keep `npm start` running on your computer.
- The app still stores data locally in the browser that opens it.
- If you clear browser storage, use private browsing, or switch devices, the saved log will not automatically follow you.

## Local development is still available

Public hosting does not remove the local workflow. You can still run this on your computer for quick testing:

```bash
npm start
```
