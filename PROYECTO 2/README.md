<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1Rr0XvrefN3tQwOWAHEaCKxlW1aaRTofC

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

### Switch between experiences (merged MVP)
Use the **Modo** toggle in the top-left corner to switch between:
- **Experiencia v2** (current showcase)
- **MVP histórico** (original prototype merged into this app)

### Test on your phone (local network / public IP)
1. Run `npm run dev` and make sure your phone is on the same Wi‑Fi.
2. Find your computer's local IP (for example `192.168.0.10`).
3. Open `http://<IP>:3000/` on your phone.

If you need a public IP, expose port `3000` in your router/firewall and use that
public IP instead of the local one.

## Deploy to GitHub Pages (from GitHub directly)

This repository includes a GitHub Actions workflow that builds and deploys the app
from the `PROYECTO 2` folder to GitHub Pages. The workflow expects a repository
secret named `GEMINI_API_KEY` and sets `BASE_PATH` automatically for GitHub Pages.

1. Push this repository to GitHub.
2. In your GitHub repo, go to **Settings → Secrets and variables → Actions** and add:
   - `GEMINI_API_KEY` with your Gemini API key.
3. Go to **Settings → Pages** and select **GitHub Actions** as the source.
4. In the Actions tab, run the **Deploy PROYECTO 2 to GitHub Pages** workflow or push
   to `main`.

Once deployed, the URL will look like:
`https://<usuario>.github.io/<repositorio>/`
