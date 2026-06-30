# Exercise Tracker

A local-first workout logger that can be hosted publicly for phone access or run from your computer over the same Wi-Fi network.

## Public hosting (free)

If you want to open the app from your phone without keeping a computer running, deploy it as a free static website.

Recommended option: **GitHub Pages**.

1. Push these local commits to your GitHub repository. If GitHub still shows no new files, no Pull Requests, or no Actions runs, the code has not been pushed there yet.
2. For free GitHub Pages hosting, make the repository public, then go to **Settings > Pages**.
3. If your Pages screen says **Deploy from a branch**, use **Branch: `main`** and **Folder: `/(root)`**, then save. The root `index.html` redirects to the app in `public/`.
4. If you prefer the included workflow, change **Source** to **GitHub Actions** and run **Deploy static app to GitHub Pages** from the **Actions** tab.
5. Open the public Pages URL from your phone: `https://YOUR_USERNAME.github.io/exercise-tracker/`.

If you want to keep the GitHub repo private, use Netlify or Vercel instead. More free options and exact settings are in [DEPLOYMENT.md](DEPLOYMENT.md).

## Run locally on your phone

1. Connect your computer and phone to the same Wi-Fi network.
2. Start the app from this project folder:

   ```bash
   npm start
   ```

3. The server prints one or more phone-ready URLs, for example:

   ```text
   Phone URLs on the same Wi-Fi:
     http://192.168.1.25:5173
   ```

4. Open the printed `http://...:5173` URL in your phone's browser.

The server binds to `0.0.0.0`, which makes it reachable from other devices on your local network. If the page does not load on your phone, use the checklist below.

## Phone connection checklist

- Confirm your phone is on the same Wi-Fi as your computer, not cellular data or a guest Wi-Fi network.
- Keep the `npm start` terminal running while you use the app.
- Try the printed `http://localhost:5173` URL on the computer first. If that fails, the server is not running.
- Allow inbound connections to Node.js or port `5173` if your firewall asks.
- If port `5173` is busy, start on another port:

  ```bash
  PORT=5174 npm start
  ```

  Then open the newly printed phone URL ending in `:5174`.
- If no phone URL is printed, find your IP manually:

  ```bash
  hostname -I
  ```

  On macOS, use:

  ```bash
  ipconfig getifaddr en0
  ```

  Then open `http://YOUR_LAN_IP:5173` on your phone.

## Development checks

```bash
npm run check
```
