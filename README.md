<div align="center">

<img src="build/icon.png" alt="Brokify" width="96" />

# Brokify

A desktop music player built with Electron and React. Search YouTube for songs, build local playlists backed by SQLite, and control playback from a custom mini-player — queue, shuffle, and all.

</div>

## Features

- **YouTube search** — search for songs via the YouTube Data API v3 and play them instantly.
- **Playlists** — create playlists and add songs to them, persisted locally in SQLite.
- **Playback queue** — play a playlist or search result set as a queue, skip forward/back, jump to any track, and shuffle upcoming tracks.
- **Mini media player** — a floating, collapsible player with a scrubbable progress bar and volume control.
- **In-app settings** — the YouTube API key can be set from the Settings page and is stored locally, as an alternative to a `.env` file.

## Tech stack

- [Electron](https://www.electronjs.org/) + [electron-vite](https://electron-vite.org/) + [electron-builder](https://www.electron.build/)
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Zustand](https://github.com/pmndrs/zustand) for state management
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) for local persistence (playlists & settings), accessed from the renderer over IPC
- [Emotion](https://emotion.sh/) (styled components) + [Framer Motion](https://www.framer.com/motion/) for UI and animation
- [react-player](https://github.com/CookPete/react-player) for YouTube playback

## Prerequisites

- **Node.js** 18+ and npm
- A **YouTube Data API v3 key** — see [Configuration](#configuration) below
- A C++ toolchain, to compile the native `better-sqlite3` module for your platform:
  - **Linux**: `sudo apt-get install build-essential` (or your distro's equivalent)
  - **Windows**: Visual Studio Build Tools (the "Desktop development with C++" workload)
  - **macOS**: Xcode Command Line Tools (`xcode-select --install`)

## Getting started

```bash
# Install dependencies (also rebuilds better-sqlite3 for the local Electron version)
npm install

# Copy the example env file, then fill in a YouTube API key (see Configuration)
cp .env.example .env
```

```bash
npm run dev
```

## Configuration

Brokify needs a **YouTube Data API v3** key to search for songs.

1. Create a project in the [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the **YouTube Data API v3** for that project.
3. Create an **API key** under *Credentials*.
4. Set the key either by:
   - adding it to `.env` as `YOUTUBE_API_KEY=<key>`, or
   - opening the app's **Settings** page and entering it there (stored locally in SQLite; takes priority over `.env`).

## Available scripts

| Script                 | Description                                              |
| ----------------------- | --------------------------------------------------------- |
| `npm run dev`           | Start the app in development mode with hot reload         |
| `npm run start`         | Preview a production build locally                        |
| `npm run typecheck`     | Type-check both the main and renderer processes           |
| `npm run lint`          | Lint and auto-fix the codebase                            |
| `npm run format`        | Format the codebase with Prettier                         |
| `npm run build`         | Type-check and build the app (no installer)                |
| `npm run build:linux`   | Build a Linux installer (AppImage/deb/snap)                |
| `npm run build:win`     | Build a Windows installer (NSIS)                           |
| `npm run build:mac`     | Build a macOS installer (dmg)                              |

**Process:**

1. Bump `version` in `package.json` and commit.
2. Tag and push:
   ```bash
   git tag v1.1.0
   git push origin v1.1.0
   ```
3. The tag push triggers the workflow, which builds Linux (AppImage + deb) and Windows (NSIS installer) and uploads the artifacts to a draft GitHub Release matching the tag. No secrets need to be configured — it uses the automatically-provided `GITHUB_TOKEN`.
4. Review and publish the draft release from the repo's **Releases** page.

### Local builds

```bash
npm run build:linux   # on Linux
npm run build:win     # on Windows
npm run build:mac     # on macOS
```

Each produces an installer under `dist/` for the current platform only. These can be attached to a release manually as an alternative to the automated workflow.

## Project structure

```
src/
├── main/          # Electron main process (window, IPC handlers, SQLite access)
├── preload/       # contextBridge API exposed to the renderer as window.api
├── renderer/      # React app (pages, components, styles, zustand store)
└── shared/        # Types shared between main and renderer
```

## License

No license has been chosen yet for this project.
