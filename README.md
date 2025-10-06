# StreakChain

A delightful, gamified CLI to build daily habits by tracking streaks and earning XP. Stay consistent, level up, and celebrate progress right from your terminal.

---

![StreakChain Banner](https://github.com/Mohammad-Yaseen69/StreakChain/raw/main/assets/screenshots/main-menu.png)

## Highlights

- Friendly, colored terminal UI built with Inquirer and Chalk.
- Gamified XP & level system with fun titles and progress bars.
- Create multiple streaks, log them daily, and track progress.
- Cross-platform (Windows / macOS / Linux) Node.js CLI.

## Quick Demo Screenshots
- Main menu: ![StreakChain Banner](https://github.com/Mohammad-Yaseen69/StreakChain/raw/main/assets/screenshots/main-menu.png)
- Level & progress: ![Level & Progress](https://github.com/Mohammad-Yaseen69/StreakChain/raw/main/assets/screenshots/level-details.png)
- Create streak confirmation: ![Create Streak](https://github.com/Mohammad-Yaseen69/StreakChain/raw/main/assets/screenshots/create-streak.png)
- About screen: ![About StreakChain](https://github.com/Mohammad-Yaseen69/StreakChain/raw/main/assets/screenshots/about.png)


---

## What is StreakChain?

StreakChain is a small, opinionated CLI app made for people who want to build habits by tracking streaks. Each logged day awards XP. XP accumulates into levels — complete with titles and celebratory messages when you level up.

It was built with a focus on small wins and consistent progress.

## Tiny contract

- Inputs: interactive prompts via the terminal (create streak name, description, duration, and daily logs).
- Outputs: updates to the local JSON database (`db/db.json`), terminal display (XP, levels, streaks), and optional packaged executable.
- Error modes: missing/invalid input is validated by prompts; database write failures will surface as runtime errors.
- Success: XP and streaks persisted; level-ups displayed and saved in `db.data.levelUpHistory`.

## Install (recommended for users)

The easiest way for end users to install StreakChain is globally via npm. This exposes a `streakchain` command in your shell.

PowerShell (run as normal user):

```powershell
# install globally from the npm 
npm install -g streakchain

# then start StreakChain with:
streakchain
```

Notes:
- If you install globally from the local folder (`npm install -g .\`), ensure you ran `npm run build` first so `dist/` exists.
- When published to npm, users can install with `npm install -g streakchain` and then run `streakchain`.

## Install (developer)

Make sure you have Node.js (recommended v16+) and npm installed.

PowerShell example (developer workflow):

```powershell
# install deps
npm install

# Run in dev mode (uses ts-node ESM loader)
npm run dev

# Build TypeScript to JS
npm run build

# Run compiled build
node dist/index.js
```

## Quick usage

- Start the app and follow the prompts to create a new streak, log today's streak, or view level details.

Example (after building):

```powershell
node dist/index.js
```

Or during development:

```powershell
npm run dev
```

If you installed globally (recommended for users) or linked the package, start it with:

```powershell
streakchain
```

### User usage (typical flows)

This section shows common interactive flows an end user will experience after running `streakchain`.

- Main menu: choose actions with arrow keys (Log Today's Streak, View Your Streaks, Create a Streak, Delete a Streak, Level & Progress, About StreakChain, Exit).

- Create a streak flow:
	1. Select "Create a Streak" from the main menu.
	2. Enter a name (e.g. "Coding").
	3. Enter a specific purpose (e.g. "Learn new concepts every day").
	4. Enter duration in days (e.g. 30).
	5. You will see a confirmation box and the streak is added to your DB.

- Log today's streak flow:
	1. Select "Log Today's Streak".
	2. Choose the streak(s) you completed today.
	3. XP is awarded and the app checks for level ups. If you level up you'll see a celebration box in the terminal.

- View level & progress:
	1. Select "Level & Progress" to see your current XP, level, progress bar, statistics, and the level requirements table.

- Missed streaks:
	- If a streak is missed (no log for yesterday and not created today), the streak resets and XP may be removed according to the streak settings.

These flows are interactive — follow the prompts shown in the terminal. Use ESC or Ctrl+C to exit at any time.

## Packaging as a standalone executable

This project includes `pkg` in `package.json` and a `bin` entry. Example packaging command (Windows):

```powershell
# from repo root
pkg . --targets node16-win-x64 --output streakchain.exe
```

The `pkg` config in package.json already includes `dist/**/*.js` and `dist/**/*.json` in assets. Build first (`npm run build`) so `dist/` is populated.

## Level System (summary)

StreakChain uses an XP requirement array for levels. Below are the first levels and their titles:

| Level | XP Required | Title |
|-------:|-----------:|:------|
| 1 | 0 | 🌱 Beginner |
| 2 | 100 | 📚 Learner |
| 3 | 250 | 💪 Dedicated |
| 4 | 450 | 🔥 Consistent |
| 5 | 700 | ⭐ Rising Star |
| 6 | 1000 | 🏆 Achiever |

There are many more levels (up to 50) with growing XP requirements — see `src/utils/levelSystem.ts` for the full table and titles.

## Where data is stored

- The app uses a small JSON DB at `src/db/db.json` (bundled to `db.json` in the repo root). This file stores streaks, XP totals, and level-up history.

Important: Back it up if you want to preserve your progress across machines.

## Contributing

Contributions are welcome! A few simple ways to help:

- Report issues or suggest features.
- Improve CLI copy, messages, or UX.
- Add tests or CI, or add more screenshot examples.

If you'd like, I can also prepare a GitHub Actions workflow for packaging and releasing binaries automatically.

## Troubleshooting

- If the CLI doesn't start in dev mode, ensure `ts-node` and `typescript` are installed (`npm install`).
- If you get permission issues when using `npm link`, run the PowerShell as Administrator or install the packaged executable.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details (if present).


