# TicTacToe Game 🎮

A modern, interactive Tic Tac Toe game built with React featuring multiplayer gameplay, sound effects, music, theme switching, and beautiful UI/UX.

## Features

### 🎯 Core Gameplay
- **Two-Player Mode**: Play against a friend on the same device
- **Score Tracking**: Keep track of wins and draws across multiple rounds
- **Auto Turn Switching**: After each round, player choices automatically switch
- **Winning Highlight**: Winning cells are highlighted in green for clear victory indication
- **Draw Detection**: Game detects when all cells are filled with no winner

### 🎨 User Interface
- **Responsive Design**: Fully responsive on mobile, tablet, and desktop devices
- **Dark/Light Theme**: Toggle between dark and light themes
- **Player Avatars**: Each player has a customizable avatar using react-nice-avatar
- **Active Player Indicator**: Current player is highlighted with color and visual effects
- **Smooth Animations**: Transitions and effects for better UX

### 🔊 Audio Features
- **Sound Effects**:
  - Click sound when making a move
  - Win sound when someone wins
  - Draw sound when the game ends in a draw
  - Hover feedback sound
- **Background Music**: Multiple upbeat music tracks that can be shuffled
  - Upbeat Synth Pop
  - Chill Lo-Fi
  - Epic Orchestral Theme
  - Retro 8-Bit Style

### 🎵 Music Player
- **Play/Pause Controls**: Control music playback
- **Shuffle Feature**: Randomly select from multiple background tracks
- **Volume Control**: Adjustable music volume

## Tech Stack

### Frontend
- **React 18**: UI library
- **React Router DOM**: Navigation between pages
- **Styled Components**: CSS-in-JS styling with theme support
- **React Nice Avatar**: Dynamic avatar generation

### Audio
- **Web Audio API**: Native browser audio playback
- **Custom useSound Hook**: Reusable audio management

### State Management
- **React Context API**: Global state for game, sounds, and modals

## Project Structure

```
src/
├── components/
│   ├── GameCell/           # Individual game cell component
│   ├── Player/             # Player info display with avatar
│   ├── Modal/              # Round over modal
│   ├── Button/             # Reusable button component
│   └── MusicPlayer/        # Music control interface
├── contexts/
│   ├── GameContext.jsx     # Game state management
│   ├── ModalContext.jsx    # Modal state management
│   └── SoundEffectsContext.jsx  # Audio state management
├── hooks/
│   └── useSound.js         # Custom hook for audio playback
├── pages/
│   ├── Home.jsx            # Landing page
│   ├── Game.jsx            # Game board page
│   └── Router.jsx          # Route configuration
├── styles/
│   └── General.styled.jsx  # Global styled components
├── utils/
│   ├── GameUtils/
│   │   └── index.jsx       # Winner detection logic
│   └── MusicUtils/
│       └── playlist.js     # Music track imports
└── assets/
    ├── sounds/             # Audio files
    └── *-icon.svg          # Game icons
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tic-tac-toe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## How to Play

1. **Start a Game**: Click "Play Now" on the home page
2. **Make Moves**: Click on empty cells to place your mark (X or O)
3. **Win or Draw**: 
   - Get 3 in a row (horizontal, vertical, or diagonal) to win
   - Fill all cells without a winner for a draw
4. **New Round**: Click "Continue" in the modal to play another round
5. **Switch Choices**: Player choices automatically switch each round
6. **Track Score**: Watch the score update for each win
7. **Restart**: Click "Restart" to reset all scores and start fresh

## Game Rules

- Players alternate turns
- First player to get 3 marks in a row wins
- Rows can be horizontal, vertical, or diagonal
- If all 9 cells are filled with no winner, it's a draw
- Players switch their choice (X/O) each round
- Score is tracked across multiple rounds

## Customization

### Add Custom Players
Edit `GameContext.jsx` to change player names:
```javascript
player1: {
  choice: "x",
  name: "Your Name",  // Change here
  score: 0,
  avatarConfig: genConfig(),
}
```

### Add More Music
Add tracks to `utils/MusicUtils/playlist.js`:
```javascript
import newTrack from "../../assets/sounds/new-track.wav";

const playList = [upbeatSynth, chillLofi, epicTheme, retro8bit, newTrack];
```

### Adjust Theme Colors
Modify `theme.jsx` to customize colors:
```javascript
colors: {
  primary: "#your-color",
  success: "#your-color",
  // ... other colors
}
```

## Controls

| Action | Control |
|--------|---------|
| Make Move | Click on cell |
| Toggle Theme | Click sun/moon icon |
| Play/Pause Music | Click play/pause button |
| Shuffle Music | Click shuffle button |
| Continue Round | Click Continue button |
| Restart Game | Click Restart button |

## Browser Compatibility

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

## Responsive Breakpoints

- **Mobile**: Up to 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px+

## Performance

- Optimized React rendering with proper key usage
- Memoization for sound effects
- Lazy loading of routes with React Router
- Efficient state management with Context API

## Accessibility

- Semantic HTML elements
- Keyboard navigation support
- Clear visual feedback for all interactions
- High contrast text for readability

## Future Enhancements

- [ ] AI opponent mode
- [ ] Online multiplayer
- [ ] Leaderboard system
- [ ] Custom avatar uploads
- [ ] Game statistics tracking
- [ ] Sound and music settings preferences
- [ ] Replay/undo moves
- [ ] Different board sizes (4x4, 5x5)

## Troubleshooting

### Audio not playing
- Check browser permissions for audio
- Ensure sound effects are in `src/assets/sounds/`
- Check browser console for errors

### Avatars not displaying
- Verify react-nice-avatar is installed
- Check that avatar config is properly generated
- Clear browser cache

### Theme not changing
- Ensure ThemeProvider wraps the app
- Check that theme objects are properly defined
- Verify CSS variables are supported in your browser

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.

## Author
Lutendo Matshidze
Created as a fun two-player game project with modern React practices and delightful UX.

---

**Enjoy the game! 🎉**
