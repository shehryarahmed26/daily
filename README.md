# Daily Vocabulary Builder

An AI-powered daily English vocabulary builder. A new word is automatically generated every day using Groq AI and committed to this repository via GitHub Actions.

## How It Works

1. **GitHub Actions** runs a cron job daily at 9 AM PKT (4 AM UTC)
2. **Node.js script** calls Groq AI (LLaMA 3.3) to generate a new word
3. Word is saved to `data/words.json`
4. Script auto-commits and pushes to GitHub
5. **Vercel** auto-deploys the updated Next.js website

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Add your Groq API key
Create a `.env` file:
```
GROQ_API_KEY=your_key_here
```

### 3. Run locally
```bash
npm run dev        # Start website
npm run generate   # Generate a word manually
```

### 4. Deploy
- Push to GitHub
- Add `GROQ_API_KEY` to repo Settings > Secrets > Actions
- Deploy to Vercel (connect the GitHub repo)
- GitHub Actions will auto-run daily

## Tech Stack

- **Node.js** — Word generation script
- **Groq AI** (LLaMA 3.3) — AI word generation
- **GitHub Actions** — Daily cron job
- **Next.js 14** — Website (App Router)
- **Tailwind CSS** — Styling
- **Vercel** — Hosting
