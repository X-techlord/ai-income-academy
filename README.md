# AI Income Academy — Course Landing Pages

Cinematic landing pages for the "Make Money with AI" course ecosystem.

## Pages

| Page | Path | Accent |
|---|---|---|
| Hub (all courses) | `/` | Emerald |
| The Sensei Experience — scroll-scrubbed AI-video portfolio | `/sensei` | Emerald |
| Create AI Ads for Foreign Companies (flagship) | `/courses/ai-ads` | Amber |
| Build AI Agents that Work While You Sleep | `/courses/ai-agents` | Violet |
| Build Cool Websites Using AI | `/courses/ai-websites` | Cyan |
| Classroom — student lesson player (unlisted) | `/classroom` | Per course |
| Course Admin — lesson editor + publishing guide (unlisted) | `/admin` | Emerald |

## Stack

Static HTML/CSS/JS — no build step. Deployed on Vercel with `cleanUrls`.
Hero images generated with GPT Image 2, videos with Seedance 2.0, via the Arcads.ai
API — the tutor character sheet is used only as an identity reference for generation,
never displayed directly.

## Publishing lessons

Upload lesson videos to YouTube as **Unlisted** (not Private — private can't embed),
then open `/admin`: paste each video's URL per lesson, export `course-content.json`,
replace `data/course-content.json`, commit and redeploy. `/classroom` renders the
result. The full step-by-step guide lives on the `/admin` page itself, and the complete
owner's manual (how every page connects, payments, deploys, troubleshooting)
is at `/guide` — both unlisted.

## TODO before launch

- Replace the placeholder `https://selar.co/` checkout links (search for `TODO` in the course pages) with the real Selar product links.
- Confirm the Standard ($49) / Premium ($99) placeholder prices.
- Point the daily job-drops section at the real members area when it exists.
