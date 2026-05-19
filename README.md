# TicTacToe Game 🎮

A modern, interactive Tic Tac Toe game built with React featuring multiplayer gameplay, sound effects, music, theme switching, beautiful UI/UX, and centralized state management with `useReducer`.

![React](https://img.shields.io/badge/React-18.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Active-success)

## 📸 Screenshots

*(Add screenshots of your game here)*

---

## ✨ Features

### 🎯 Core Gameplay

- **Two-Player Mode**: Play against a friend on the same device
- **Score Tracking**: Keep track of wins, losses, and draws across multiple rounds
- **Auto Turn Switching**: Players automatically alternate after each move
- **Winning Highlight**: Winning cells are highlighted in green for clear victory indication
- **Draw Detection**: Game automatically detects when all cells are filled with no winner
- **Win Detection**: Detects wins in all directions - horizontal, vertical, and diagonal

### 🎨 User Interface

- **Responsive Design**: Fully responsive on mobile, tablet, and desktop devices
- **Dark/Light Theme**: Toggle between dark and light themes seamlessly
- **Player Avatars**: Each player has a unique avatar generated using react-nice-avatar
- **Active Player Indicator**: Current player is highlighted with visual effects
- **Smooth Animations**: Transitions and effects for an enhanced user experience
- **Intuitive Controls**: Simple, clean interface easy for any user to navigate

### 🔊 Audio Features

**Sound Effects:**
- Click sound when making a move
- Win sound when someone wins
- Draw sound when the game ends in a draw
- Hover feedback sound

**Background Music:**
- Multiple upbeat music tracks that can be shuffled
- Upbeat Synth Pop
- Chill Lo-Fi
- Epic Orchestral Theme
- Retro 8-Bit Style
- Play/Pause Controls: Control music playback
- Shuffle Feature: Randomly select from multiple background tracks
- Volume Control: Adjustable music volume

---

## 🛠️ Tech Stack

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

## 📁 Project Structure

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

## 🧠 State Management

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

### Action Types

The following actions manage all game state changes:

| Action | Purpose | Payload |
|--------|---------|---------|
| `MAKE_MOVE` | Place a mark on the board | `{ index, winner, winningCombo }` |
| `RESET_BOARD` | Clear board for new round (keep scores) | - |
| `UPDATE_SCORES` | Increment winner's score | `{ winnerChoice: 'x' \| 'o' }` |
| `RESET_SCORES` | Reset everything including scores | - |
| `SET_GAME_MODE` | Switch PvP/PvC mode | `'pvp' \| 'pvc'` |
| `SET_PLAYER_NAMES` | Update player names | `{ p1, p2 }` |

### State Shape

```javascript
{
  board: [null, 'x', 'o', ...],           // 9-cell array
  currentPlayer: 'x' | 'o',               // Whose turn
  winner: 'x' | 'o' | null,              // Win state
  winningCombo: [0, 1, 2] | null,        // Winning cells for highlighting
  draw: false,                            // Draw state
  gameMode: 'pvp' | 'pvc',               // Game mode
  player1: {                              // Player 1 data
    name: 'Player 1',
    choice: 'x',
    score: 0,
    avatarConfig: {}
  },
  player2: {                              // Player 2 data
    name: 'Player 2',
    choice: 'o',
    score: 0,
    avatarConfig: {}
  }
}
```

### Score Update Timing

**Scores update IMMEDIATELY when a win/draw is detected** in the `MAKE_MOVE` action, not when the Continue button is clicked. This provides instant feedback to users.

**Flow:**
1. Player completes 3 in a row
2. `MAKE_MOVE` action is dispatched
3. Reducer detects winner and **increments score immediately**
4. Modal appears showing updated scores
5. User sees "Player 1: 1" (score already incremented)
6. User clicks Continue
7. Continue calls `RESET_BOARD` (only clears board, keeps score)
8. Next game starts with scores at "Player 1: 1, Player 2: 0"
9. Scores accumulate as more rounds are played

### Usage in Components

Components use the `useGame()` custom hook to access state and dispatch actions:

```javascript
import { useGame } from '../../hooks/useGame'

const GameCell = ({ cellItem, index }) => {
  const { board, winner, makeMove } = useGame()
  
  const handleClick = () => {
    if (cellItem || winner) return
    
    // Dispatch MAKE_MOVE action
    makeMove(index, detectedWinner, winningCombo)
  }
  
  return <div onClick={handleClick}>{cellItem}</div>
}
```

**Available via useGame():**
- **State:** `board`, `currentPlayer`, `winner`, `winningCombo`, `draw`, `gameMode`, `player1`, `player2`
- **Actions:** `makeMove()`, `resetBoard()`, `resetScores()`, `setGameMode()`, `setPlayerNames()`

### Benefits

✅ **Single Source of Truth** - All game state in one place  
✅ **Predictable Updates** - Clear action types and state transitions  
✅ **Easy Testing** - Pure reducer function with no side effects  
✅ **Scalable** - Easy to add new features (AI, timers, etc.)  
✅ **Maintainable** - No scattered setState calls  
✅ **No Bugs** - State mutations prevented through immutability  

---

## 📦 Installation

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

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

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

## 🎯 Game Rules

1. **Grid**: The game is played on a 3x3 grid (9 cells total)
2. **Turns**: Players alternate turns - X goes first, then O
3. **Placement**: Click on an empty cell to place your mark
4. **No Overwriting**: Cannot place a mark on an already filled cell
5. **Winning**: Get 3 marks in a row to win
6. **Row Types**: Can win with horizontal, vertical, or diagonal rows
7. **Draw**: If all 9 cells are filled with no winner, the game is a draw
8. **Score Tracking**: Scores are tracked and displayed for each player
9. **Multiple Rounds**: Play as many rounds as you want - scores accumulate

---

## ⌨️ Keyboard & Mouse Controls

| Action | Control |
|--------|---------|
| Make Move | Click on empty cell |
| Toggle Theme | Click sun/moon icon in header |
| Play/Pause Music | Click play/pause button |
| Shuffle Music | Click shuffle button |
| Continue Round | Click Continue button in modal |
| Restart Game | Click Restart button |
| Adjust Volume | Drag volume slider |

---

## 🌐 Browser Compatibility

Tested and working on:
- ✅ Chrome (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📱 Responsive Breakpoints

| Device | Width | Optimization |
|--------|-------|--------------|
| Mobile | Up to 480px | Optimized for small screens |
| Tablet | 481px - 768px | Balanced layout |
| Desktop | 769px+ | Full features |

The game adapts seamlessly across all screen sizes.

---

## ⚡ Performance

- ✅ Optimized React rendering with proper key usage
- ✅ Memoization for sound effects to prevent unnecessary re-renders
- ✅ Lazy loading of routes with React Router
- ✅ Efficient state management with Context API and useReducer
- ✅ CSS-in-JS with Styled Components for dynamic styling
- ✅ Fast page loads and smooth interactions

---

## ♿ Accessibility

- ✅ Semantic HTML elements for better screen reader support
- ✅ Keyboard navigation support for all interactive elements
- ✅ Clear visual feedback for all user interactions
- ✅ High contrast text for improved readability
- ✅ Descriptive alt text for images and icons
- ✅ ARIA labels for accessibility

---

## 🎨 Customization

### Change Player Names

Edit the initial state in `src/utils/GameUtils/gameReducer.js`:

```javascript
player1: {
  name: "Your Name",  // Change here
  choice: "x",
  score: 0,
}
player2: {
  name: "Friend's Name",  // Change here
  choice: "o",
  score: 0,
}
```

### Add Custom Music Tracks

1. Add your audio file to `src/assets/sounds/`
2. Import in `src/utils/MusicUtils/playlist.js`:

```javascript
import newTrack from "../../assets/sounds/your-track.wav"
const playList = [upbeatSynth, chillLofi, epicTheme, retro8bit, newTrack]
```

### Customize Theme Colors

Edit `src/styles/theme.jsx`:

```javascript
const lightTheme = {
  colors: {
    primary: "#your-color",
    success: "#your-color",
    background: "#your-color",
    // ... other colors
  }
}
```

### Adjust Winning Cell Highlight

Modify highlight color in `src/components/GameCell/GameCell.styled.jsx`:

```javascript
const CellStyle = styled.div`
  ${props => props.$isWinningCell && css`
    background: #your-highlight-color;
  `}
`
```

---

## 🚀 Deployment

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your GitHub repository
5. Set build command to `npm run build`
6. Set publish directory to `dist`
7. Click "Deploy"

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects React and Vite settings
6. Click "Deploy"

### Live Demo

*(Add your live demo URL here)*
- 🌐 [Live Demo](https://your-domain.com)
- 📝 [GitHub Repository](https://github.com/YourUsername/tic-tac-toe)

---

## 🔧 Troubleshooting

### Issue: Audio not playing
**Solution:**
- Check browser permissions for audio
- Ensure sound files are in `src/assets/sounds/`
- Check browser console for errors
- Try a different browser

### Issue: Avatars not displaying
**Solution:**
- Verify `react-nice-avatar` is installed
- Check that avatar config is properly generated
- Clear browser cache
- Restart development server

### Issue: Theme not changing
**Solution:**
- Ensure ThemeProvider wraps the app
- Check that theme objects are properly defined
- Verify CSS variables are supported in browser
- Check browser console for styling errors

### Issue: Game state not updating
**Solution:**
- Check that GameProvider wraps the app
- Verify useGame() is used in components
- Check browser console for context errors
- Ensure gameReducer is properly imported

---

## 🤝 Contributing

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

## 📝 License

This project is open source and available under the **MIT License**.

See the [LICENSE](LICENSE) file for more details.

---

## 👨‍💻 Author

**Lutendo Matshidze**

Created as a fun, educational two-player game project demonstrating modern React practices and delightful user experience design.

- GitHub: [@LutendoLumina](https://github.com/LutendoLumina)
- Email: your-email@example.com

---

## 🎓 Learning Outcomes

This project demonstrates:

- ✅ React hooks (useState, useContext, useReducer, useEffect)
- ✅ Component composition and reusability
- ✅ CSS-in-JS with Styled Components
- ✅ State management with useReducer
- ✅ React Context API for global state
- ✅ Custom hooks for code organization
- ✅ React Router for navigation
- ✅ Audio handling in React
- ✅ Responsive design principles
- ✅ Git and version control
- ✅ Professional code documentation

---

## 🗺️ Roadmap

### Completed ✅
- [x] Base game with win/draw detection
- [x] Two-player gameplay
- [x] Score tracking
- [x] Theme switching
- [x] Sound effects and music
- [x] Player avatars
- [x] useReducer state management
- [x] Mobile responsive design

### In Progress 🔄
- [ ] Player name input
- [ ] AI opponent (easy mode)
- [ ] Undo moves feature
- [ ] Move history

### Planned 📋
- [ ] AI opponent (hard mode with minimax)
- [ ] Online multiplayer
- [ ] Leaderboard system
- [ ] Game statistics
- [ ] Custom avatar uploads
- [ ] Different board sizes (4x4, 5x5)
- [ ] Time limit per move
- [ ] Replay functionality

---

## 📞 Support

Have questions or found a bug? 

1. Check the [Troubleshooting](#-troubleshooting) section
2. Search [existing issues](https://github.com/YourUsername/tic-tac-toe/issues)
3. Create a [new issue](https://github.com/YourUsername/tic-tac-toe/issues/new)

---

## 🎉 Enjoy the Game!

Thank you for playing! We hope you enjoy this modern take on the classic Tic Tac Toe game. Have fun playing with your friends! 🏆

---

**Made with ❤️ by Lutendo Matshidze**