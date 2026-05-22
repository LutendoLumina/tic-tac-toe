# TicTacToe Game

A modern Tic Tac Toe app built with React. Play **against the AI** on one device, with score tracking, sound effects, background music, theme switching, and a responsive layout.

### Links

- [Live Demo](https://tic-tac-toe-lulu.netlify.app)

---

## Features

### Gameplay (Player vs Computer)

- **Single-player vs AI** — Enter your name on **Play Now**, then face **Pixel** (random-move AI).
- **Session persistence** — Match state is saved to `localStorage` (board, scores, names, symbols, mode). Refreshing the page keeps your PvC session instead of resetting to an unused PvP default.
- **Session resume** — Returning home (logo) keeps your match in memory; **Play Now** lets you **Continue** or start a **New game** with a fresh name and scores.
- **Alternating symbols** — After each round, X and O swap between you and the computer so opening turns stay fair across a full match.
- **Correct turn ownership** — You only place your assigned symbol; the AI places theirs and opens the round when it has X after a swap.
- **Score tracking** — Wins update immediately when a round ends; draws award 0.5 points each.
- **Win / draw detection** — Horizontal, vertical, and diagonal wins; full-board draw detection.
- **Winning highlight** — The three winning cells are highlighted in green.
- **Round modal** — End-of-round summary with **Continue** (next round) or **Restart** (full reset and return home).

### User interface

- **Responsive layout** — `MainGameLayout`: players and board in a row on desktop, stacked column on tablet/mobile.
- **No page scroll** — `100vh` app shell with `overflow: hidden`; music bar fixed at bottom center.
- **Square game board** — `max-width` caps and `aspect-ratio: 1 / 1` keep the grid proportional on all screens.
- **Undistorted avatars** — Circular frames with correct sizing for `react-nice-avatar` (no stretched SVG overrides).
- **Dark / light theme** — Toggle from the header.
- **Player avatars** — Unique avatars via [react-nice-avatar](https://www.npmjs.com/package/react-nice-avatar).
- **Active player indicator** — Grayscale on inactive player; full color on the current player.

### Audio

- **Sound effects** — Click, win, draw, and hover feedback.
- **Background music** — Playlist with play/pause and shuffle (fixed to bottom center).

---

## Recent updates

### GameUtils refactor

- **`gameHelpers.js`** — Pure functions: `checkWinner`, `checkForWinner`, `applyScoreUpdate`, `toggleChoice`, `WIN_LINES`.
- **`gameReducer.js`** — Reducer and action types only; imports helpers from `gameHelpers.js`.
- **`gameStorage.js`** — `loadGameState` / `saveGameState` for `localStorage` persistence.
- **`index.js`** — Barrel file re-exporting helpers, reducer, and session utilities.
- Removed duplicate `index.jsx` (old `checkForWinner` with debug logs).

### Persistence & PvC fixes

- **Refresh no longer drops PvC mode** — Without persistence, a reload reset `gameMode` to `pvp`, which disabled human-only turn guards and let you place the computer’s symbol.
- **`GameContext`** saves state on every reducer update so names, scores, board, and `gameMode: "pvc"` survive reloads.

### Router layout styles

- App shell styles (`AppLayout`, `MainContent`, `RouteContainer`) moved to **`Router.styled.jsx`**.
- **`Global.styled.jsx`** — Site-wide reset and body background.
- **`General.styled.jsx`** — Shared page components (`Container`, `Title`, etc.).
- **`Router.styled.jsx`** — Flex column shell: header + scroll-free route area (not global tokens).

---

## Tech stack

| Area | Technology |
|------|------------|
| UI | React 19, Vite 8 |
| Routing | React Router DOM 7 |
| Styling | Styled Components (theme + media queries) |
| State | React Context + `useReducer` (game), Context (theme, modal, sounds) |
| Persistence | `localStorage` via `gameStorage.js` |
| Avatars | react-nice-avatar |
| Icons | react-icons |

---

## Architecture

### State management (`useReducer`)

Game logic lives in a **pure reducer** — no `useState` for board, turns, scores, or mode. Components stay thin and call actions through the `useGame()` hook.

```
Component → useGame() → dispatch(action) → gameReducer → new state → re-render
                                                              ↓
                                                    saveGameState (localStorage)
```

**Main files**

| File | Role |
|------|------|
| `src/utils/GameUtils/gameReducer.js` | Reducer and action constants |
| `src/utils/GameUtils/gameHelpers.js` | Pure game logic (`checkWinner`, `checkForWinner`, scoring, symbol toggle) |
| `src/utils/GameUtils/gameStorage.js` | Load/save full game state to `localStorage` |
| `src/utils/GameUtils/hasActiveSession.js` | Whether **Play Now** should offer resume vs new match |
| `src/utils/GameUtils/index.js` | Barrel exports for GameUtils |
| `src/contexts/GameContext.jsx` | `GameProvider`, hydration, auto-save on state change |
| `src/hooks/useGame.jsx` | Public API: state + action helpers |

**Reducer actions**

| Action | Purpose |
|--------|---------|
| `MAKE_MOVE` | Place mark, set winner/draw, switch turn |
| `UPDATE_SCORES` | Apply round result to scores when a round ends |
| `START_NEXT_ROUND` | Clear board, swap X/O choices (scores unchanged) |
| `RESET_BOARD` | Clear board only (scores unchanged) |
| `RESET_SCORES` | Full reset (board, scores, symbols back to X/O defaults) |
| `SET_GAME_MODE` | Sets `pvc` when starting a match |
| `SET_PLAYER_NAMES` | Set display names from the entry modal |
| `UNDO_MOVE` | Revert last move (reserved for future use) |

**Other contexts**

- `ThemeContext` — light / dark mode
- `ModalContext` — modal open/close and content
- `SoundEffectsContext` — SFX playback

### Match flow (PvC only)

The app does not expose local two-player mode in the UI. Every new match is **Player vs Computer**.

**Starting from home**

1. **Play Now** → if `hasActiveSession()` is true → `PlaySessionModal` (**Continue** | **New game**).
2. Otherwise → `PlayerNamesModal` → name + **Start Match** → `gameMode: "pvc"`, navigate to `/game-on`.

**On the board**

1. **Player 1** = human; **Player 2** = Pixel (AI).
2. `currentPlayer` = mark placed next; `player.choice` = symbol shown beside each name.
3. Human clicks only when `currentPlayer === player1.choice`.
4. AI runs when `currentPlayer === player2.choice` and places `player2.choice`.
5. Round ends → scores update → `RoundOverModal` → **Continue** runs `START_NEXT_ROUND` (swap symbols; AI moves first if it has X).

### Modals (two “Continue” actions)

| Modal | When | Continue | Other action |
|-------|------|----------|--------------|
| `PlaySessionModal` | **Play Now** with saved session | Resume same match | **New game** → reset + name entry |
| `RoundOverModal` | Win or draw on the board | Next round (`START_NEXT_ROUND`) | **Restart** → `resetScores()` + home |

### Win detection

`checkForWinner(board)` in `gameHelpers.js` returns a winning line array (`[i, j, k]`), `"draw"`, or `false`. Used by `GameCell` and the AI in `Game.jsx` before `makeMove` / `updateScores`. The reducer uses `checkWinner(board)`, which returns `{ winner, winningCombo }` or `null`.

---

## Project structure

```
src/
├── components/
│   ├── GameCell/              # Board cell + click / win handling
│   ├── Player/                # Avatar, name, choice, score
│   ├── Modal/
│   │   ├── RoundOverModal.jsx # End-of-round (next round / restart)
│   │   ├── PlaySessionModal.jsx # Resume vs new game (home)
│   │   ├── PlayerNamesModal.jsx # Name entry for new match
│   │   └── ModalTemplate.jsx
│   ├── Button/
│   ├── MusicPlayer/
│   └── Header/                # Logo (home) + theme toggle
├── contexts/
│   ├── GameContext.jsx        # useReducer provider + localStorage sync
│   ├── ModalContext.jsx
│   ├── ThemeContext.jsx
│   ├── SoundEffectsContext.jsx
│   └── index.jsx              # Combined app providers
├── hooks/
│   ├── useGame.jsx            # Game state + actions
│   ├── useModal.jsx
│   └── useSound.jsx
├── pages/
│   ├── Home/Home.jsx          # Play Now + session routing
│   ├── Game/Game.jsx          # Board layout + AI effect
│   └── Details/Details.jsx
├── utils/
│   ├── GameUtils/
│   │   ├── gameReducer.js     # Reducer + actions
│   │   ├── gameHelpers.js     # Win/draw/score helpers
│   │   ├── gameStorage.js     # localStorage load/save
│   │   ├── hasActiveSession.js
│   │   └── index.js           # Barrel exports
│   └── MusicUtils/
├── styles/
│   ├── General.styled.jsx     # Container, typography
│   ├── Global.styled.jsx      # Global reset + body
│   └── theme.jsx
├── Router.jsx                 # Routes + layout shell
├── Router.styled.jsx          # AppLayout, MainContent, RouteContainer
├── App.jsx
└── main.jsx
```

---

## Getting started

### Prerequisites

- Node.js 18+ recommended
- npm or yarn

### Install and run

```bash
git clone https://github.com/LutendoLumina/tic-tac-toe.git
cd tic-tac-toe
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

---

## How to play

### Start a match

1. Open the app and click **Play Now**.
2. If you already have a match in progress (scores, moves on the board, or a finished round), choose:
   - **Continue** — Same scores, board state, and names.
   - **New game** — Full reset, then enter your name and **Start Match**.
3. On a brand-new session, enter your name (defaults to **Player 1** if blank).
4. Round one: you start as **X**. After each in-game **Continue**, X and O swap; the computer moves first when it holds X.

### During a round

- Click an empty cell on **your** turn (your label matches the mark you place).
- First to three in a row wins; a full board with no winner is a draw.
- Scores update when the round ends; the round modal appears after a short delay.

### After a round (on the board)

- **Continue** — Next round: board clears, symbols swap, scores kept.
- **Restart** — Full reset and return to the home page.

### Navigation

- **Logo** — Goes home without clearing state; use **Play Now** → **New game** to wipe scores and re-enter your name.
- **Refresh** — Your PvC session is restored from `localStorage` (board, scores, names, and mode).

### Extras

- **Theme** — Sun/moon icon in the header.
- **Music** — Play, pause, and skip at the bottom of the screen.

---

## Responsive design

| Breakpoint | Max width | Layout notes |
|------------|-----------|----------------|
| Mobile | 480px | Column layout; board ~300px max; smaller avatars (64px) |
| Tablet | 768px | Column layout; board ~360px max; avatars 80px |
| Desktop | 769px+ | Players beside board; board ~450px max, 1:1 aspect ratio |

The root layout uses a flex shell (`100vh`, `overflow: hidden`) so the music player does not cause vertical scrolling.

---

## Development notes

This project was built focused on:

- Centralized `useReducer` state instead of scattered `useState`
- Pure helper functions in `gameHelpers.js` and a thin reducer
- A custom `useGame()` hook as the only game API for components

When extending the app, prefer:

1. Adding behavior in `gameHelpers.js` (pure logic) or `gameReducer.js` (state transitions)
2. Exposing new actions through `useGame()`
3. Avoiding game-related `useState` in components

> **Note:** The reducer still defines a `pvp` mode for possible future use, but the current UI only starts games in `pvc` mode. Persistence keeps `pvc` active across reloads once a match has started.

---

## Contributing

1. Fork the repository
2. Create a branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push and open a Pull Request

Please keep the reducer pure, put side effects (storage, audio, navigation) in contexts/components, and run `npm run lint` before submitting.

---

## Author

**Lutendo Matshidze**
Built to practice modern React patterns—context, reducers, hooks, and polished UI/UX.
