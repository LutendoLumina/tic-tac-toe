# TicTacToe Game

A modern Tic Tac Toe app built with React. Play **against the computer** on one device, with score tracking, sound effects, background music, theme switching, and a responsive layout.

### Links

- [Live Demo](https://tic-tac-toe-lulu.netlify.app)
- [GitHub Repository](https://github.com/LutendoLumina/tic-tac-toe)

---

## Features

### Gameplay (Player vs Computer)

- **Single-player vs AI** — Enter your name on **Play Now**, then face a computer opponent that picks random moves.
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

Summary of major changes implemented in this version of the project.

### State management (`useReducer`)

- Replaced scattered `useState` game logic with a centralized **`gameReducer`** and **`useGame()`** hook.
- All board, turn, score, and mode updates go through explicit action types (`MAKE_MOVE`, `UPDATE_SCORES`, `START_NEXT_ROUND`, etc.).
- Components dispatch actions only; the reducer stays pure (no side effects).

### Player vs Computer (PvC)

- **PvC-only UI** — Every match starts via `PlayerNamesModal` with `gameMode: "pvc"` (no local two-player flow in the interface).
- **AI turn logic** — The computer moves when `currentPlayer === player2.choice` (not hardcoded to `"o"`), so swapped symbols work correctly after each round.
- **Human input guard** — In PvC, clicks are ignored unless `currentPlayer === player1.choice`.
- **Round-end scoring** — `UPDATE_SCORES` runs when a round ends; **Continue** in `RoundOverModal` calls `START_NEXT_ROUND` (clear board + swap choices, scores unchanged).
- **AI win/draw modal** — Fixed winner detection for the AI using the same `checkForWinner()` return shape as human moves (array or `"draw"`, not `{ winner, line }`).

### Home screen session handling

- Clicking the **logo** navigates home but **does not** clear game state (by design).
- **Play Now** uses `hasActiveSession()` to detect saved scores, board moves, or an unfinished round.
- **`PlaySessionModal`** — **Continue** resumes the current match; **New game** runs `resetScores()` then opens the name modal for a clean start.

### Layout and UI polish

- Viewport-locked layout: `Router` app shell + `Container` fills remaining height without vertical scroll.
- `GameBoardStyle` and responsive cells scale inside a square grid.
- Music player: `position: fixed; bottom: 20px;` centered, no longer pushing content off-screen.
- Avatar wrapper sizes only the library root element so nested SVGs are not squashed.

---

## Tech stack

| Area | Technology |
|------|------------|
| UI | React 19, Vite 8 |
| Routing | React Router DOM 7 |
| Styling | Styled Components (theme + media queries) |
| State | React Context + `useReducer` (game), Context (theme, modal, sounds) |
| Avatars | react-nice-avatar |
| Icons | react-icons |

---

## Architecture

### State management (`useReducer`)

Game logic lives in a **pure reducer** — no `useState` for board, turns, scores, or mode. Components stay thin and call actions through the `useGame()` hook.

```
Component → useGame() → dispatch(action) → gameReducer → new state → re-render
```

**Main files**

| File | Role |
|------|------|
| `src/utils/GameUtils/gameReducer.js` | Reducer, action constants, helpers (`checkWinner`, `checkDraw`, `getEmptyCells`) |
| `src/utils/GameUtils/hasActiveSession.js` | Detects whether **Play Now** should offer resume vs new match |
| `src/contexts/GameContext.jsx` | `GameProvider` + `useReducer` |
| `src/hooks/useGame.jsx` | Public API: state + action helpers |

**Reducer actions**

| Action | Purpose |
|--------|---------|
| `MAKE_MOVE` | Place mark, set winner/draw, switch turn |
| `UPDATE_SCORES` | Apply round result to scores when a round ends |
| `START_NEXT_ROUND` | Clear board, swap X/O choices (scores already updated) |
| `RESET_BOARD` | Clear board only (scores unchanged) |
| `RESET_SCORES` | Full reset (board, scores, fresh avatars) |
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

1. **Player 1** = human; **Player 2** = Computer.  
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

`checkForWinner()` in `src/utils/GameUtils/index.jsx` returns a winning line array, `"draw"`, or `false`. Used by `GameCell` and the AI before `makeMove` / `updateScores`.

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
│   ├── GameContext.jsx        # useReducer provider
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
│   │   ├── gameReducer.js
│   │   ├── hasActiveSession.js
│   │   └── index.jsx          # checkForWinner
│   └── MusicUtils/
├── styles/
│   ├── General.styled.jsx     # Container, typography
│   ├── Global.styled.jsx
│   └── theme.jsx
├── Router.jsx                 # App layout shell (no scroll)
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

### Other scripts

```bash
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint
```

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

This project was built as a **ZAIO / university-style assignment** focused on:

- Centralized `useReducer` state instead of scattered `useState`  
- Pure reducer functions and explicit action types  
- A custom `useGame()` hook as the only game API for components  

When extending the app, prefer adding behavior in `gameReducer.js` and exposing it through `useGame()` rather than local component state.

> **Note:** The reducer still defines a `pvp` mode for possible future use, but the current UI only starts games in `pvc` mode.

---

## Contributing

1. Fork the repository  
2. Create a branch (`git checkout -b feature/your-feature`)  
3. Commit your changes  
4. Push and open a Pull Request  

Please keep the reducer pure, avoid new game-related `useState` in components, and run `npm run lint` before submitting.

---

## Author

**Lutendo Matshidze**

- GitHub: [@LutendoLumina](https://github.com/LutendoLumina)

Built to practice modern React patterns—context, reducers, hooks, and polished UI/UX.
