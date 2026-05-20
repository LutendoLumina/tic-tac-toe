# TicTacToe Game 🎮

A modern, interactive Tic Tac Toe game built with React featuring multiplayer gameplay, sound effects, music, theme switching and beautiful UI/UX.

### Live Demo

-  [Live Demo](https://tic-tac-toe-lulu.netlify.app)
-  [GitHub Repository](https://github.com/YourUsername/tic-tac-toe)

---

## Features

### Core Gameplay

- **Two-Player Mode**: Play against a friend on the same device
- **Score Tracking**: Keep track of wins, losses, and draws across multiple rounds
- **Auto Turn Switching**: Players automatically alternate after each move
- **Winning Highlight**: Winning cells are highlighted in green for clear victory indication
- **Draw Detection**: Game automatically detects when all cells are filled with no winner
- **Win Detection**: Detects wins in all directions - horizontal, vertical, and diagonal

### User Interface

- **Responsive Design**: Fully responsive on mobile, tablet, and desktop devices
- **Dark/Light Theme**: Toggle between dark and light themes seamlessly
- **Player Avatars**: Each player has a unique avatar generated using react-nice-avatar
- **Active Player Indicator**: Current player is highlighted with visual effects
- **Smooth Animations**: Transitions and effects for an enhanced user experience
- **Intuitive Controls**: Simple, clean interface easy for any user to navigate

### Audio Features

**Sound Effects:**
- Click sound when making a move
- Win sound when someone wins
- Draw sound when the game ends in a draw
- Hover feedback sound

**Background Music:**
- Multiple upbeat music tracks that can be shuffled
- Play/Pause Controls: Control music playback
- Shuffle Feature: Randomly select from multiple background tracks
- Volume Control: Adjustable music volume

## Phase 1: State Management Refactor (Completed)
- **Centralized Architecture**: Migrated scattered `useState` configurations into a unified `useReducer` pattern in `gameReducer.js` to ensure a single source of truth.
- **Custom React Hook**: Created the `useGame.js` hook to abstract operational dispatch triggers (`MAKE_MOVE`, `UPDATE_SCORES`, `RESET_BOARD`), cleanly decoupling core game logic from UI render blocks.
- **Round Score Persistence**: Configured decoupled match loops so that resetting the grid board clears the active grid fields while successfully persisting running player score values.

## Phase 2: Player Name Input & AI Integration (Completed)
- **Dynamic Name Capture**: Implemented an automated portal configuration tracking custom string inputs for Player 1 directly inside a modular form view.
- **Context Modal Rendering**: Leveraged `ModalContext` and `createPortal` matching existing design frameworks (`ModalHeader`, `ModalBody`, `ModalFooter`) to manage entry flows without breaking structural layout patterns.
- **Contextual Data Mapping**: Solved the rendering runtime bug where the game evaluation view displayed `undefined` when announcing winners. End-of-round declarations now dynamically read assigned state string values.
- **AI Mode Hookup**: Integrated a background state switch engine (`gameMode: "pvc"`) mapping automated turn cycles seamlessly into the newly refactored reducer state model.

---

## Tech Stack

### Frontend
- **React 18** - UI library
- **React Router DOM** - Navigation and routing
- **Styled Components** - CSS-in-JS styling with theme support
- **React Nice Avatar** - Dynamic avatar generation
- **useReducer** - Centralized state management

### State Management
- **React Context API** - Global state management
- **useReducer Hook** - Predictable state transitions

### Audio & Effects
- **Web Audio API** - Native browser audio playback
- **Custom useSound Hook** - Reusable audio management

---

## Project Structure

```
src/
├── components/
│   ├── GameCell/              # Individual game cell component
│   │   ├── GameCell.jsx
│   │   └── GameCell.styled.jsx
│   ├── Player/                # Player info display with avatar
│   │   ├── Player.jsx
│   │   └── Player.styled.jsx
│   ├── Modal/                 # Round over modal and templates
│   │   ├── Modal.jsx
│   │   ├── ModalTemplate.jsx
│   │   ├── RoundOverModal.jsx
│   │   └── Modal.styled.jsx
│   ├── Button/                # Reusable button component
│   │   ├── Button.jsx
│   │   └── Button.styled.jsx
│   ├── MusicPlayer/           # Music control interface
│   │   ├── MusicPlayer.jsx
│   │   └── MusicPlayer.styled.jsx
│   └── Header/                # Header component
│
├── contexts/
│   ├── GameContext.jsx        # Game state management (useReducer)
│   ├── ModalContext.jsx       # Modal state management
│   ├── ThemeContext.jsx       # Theme state management
│   ├── SoundEffectsContext.jsx # Sound effects state management
│   └── Provider.jsx           # Combined providers wrapper
│
├── hooks/
│   ├── useGame.js             # Custom hook for game state and actions
│   ├── useModal.js            # Custom hook for modal management
│   └── useSound.js            # Custom hook for audio playback
│
├── pages/
│   ├── Home.jsx               # Landing page
│   ├── Game.jsx               # Game board page
│   ├── Router.jsx             # Route configuration
│   └── Details.jsx            # Game details/rules page
│
├── styles/
│   ├── General.styled.jsx     # Global styled components
│   ├── Global.styled.jsx      # Global styles
│   └── theme.jsx              # Theme configuration (colors, fonts, etc.)
│
├── utils/
│   ├── GameUtils/
│   │   ├── index.jsx          # Winner detection logic
│   │   └── gameReducer.js     # Pure reducer function and actions
│   └── MusicUtils/
│       └── playlist.js        # Music track imports
│
├── assets/
│   ├── sounds/                # Audio files
│   │   ├── click.mp3
│   │   ├── win.mp3
│   │   ├── draw.mp3
│   │   └── *.mp3
│   └── icons/                 # Game icons
│       ├── x-icon.svg
│       ├── o-icon.svg
│       └── ...
│
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

---

## State Management

This project uses **React's `useReducer` Hook** for centralized game state management, ensuring clean, maintainable, and scalable code.

### Architecture

Instead of scattered `useState` calls across components, all game state is managed through a single reducer function that handles state updates based on explicit action types.

**Key Components:**

- **`gameReducer.js`** - Pure reducer function that handles all state transitions
- **`GameContext.jsx`** - Context provider that wraps the app and makes game state accessible
- **`useGame()` Hook** - Custom hook that provides clean access to game state and action dispatchers

### How It Works

1. **Components dispatch actions** → Call `makeMove()`, `resetBoard()`, etc.
2. **Reducer processes actions** → Updates state based on action type
3. **State updates propagate** → Components re-render with new state
4. **No side effects** → Reducer is pure (no API calls, no async logic)

---

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Clone the Repository

```bash
git clone https://github.com/YourUsername/tic-tac-toe.git
cd tic-tac-toe
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

The application will open automatically at `http://localhost:5173` (or your configured port).

---

## 🎮 How to Play

### Starting the Game

1. Open the application in your web browser
2. Click "Play Now" on the home page
3. The game board appears with a 3x3 grid

### Making Moves

1. **Take turns** - Players alternate between X and O
2. **Click empty cells** to place your mark
3. **Complete 3 in a row** - Horizontal, vertical, or diagonal
4. **Reach 3 in a row to win** - The game detects the win automatically

### Game Outcomes

- **Win**: Get 3 marks in a row (highlighted in green)
- **Draw**: Fill all cells with no winner
- **Continue**: Click "Continue" to play another round
- **Restart**: Click "Restart" to reset all scores and start fresh

### Managing Game Settings

- **Toggle Theme**: Click the sun/moon icon to switch dark/light mode
- **Control Music**: Use play/pause button to start/stop background music
- **Shuffle Music**: Click shuffle to randomize the current track
- **Adjust Volume**: Use the volume slider to control music volume

---

## Responsive Breakpoints

| Device | Width | Optimization |
|--------|-------|--------------|
| Mobile | Up to 480px | Optimized for small screens |
| Tablet | 481px - 768px | Balanced layout |
| Desktop | 769px+ | Full features |

The game adapts seamlessly across all screen sizes.
---

## Contributing

Contributions are welcome! Here's how to contribute:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Make** your changes
4. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
5. **Push** to the branch (`git push origin feature/AmazingFeature`)
6. **Open** a Pull Request

Please ensure:
- ✅ Code follows the existing style
- ✅ All tests pass
- ✅ No console errors
- ✅ Changes are well-commented

---

## Author

**Lutendo Matshidze**

Created as a fun, educational two-player game project demonstrating modern React practices and delightful user experience design.

- GitHub: [@LutendoLumina](https://github.com/LutendoLumina)
