# 🃏 Poker Game App - Feature Specification & Flow

## 📱 App Launch Screen

## Tech Stack

- **Frontend**: React Native with TypeScript, Expo and Expo router
- **Backend/Database**: Express.js of Node.js Backend Database MongoDB
- **UI Framework**: React Native Paper
- **AI Processing**: OpenAI GPT-4 or Claude for game analysis
- **Real-time Communication**: Socket.io
- **State Management**: Redux Toolkit or Zustand
- **Authentication**: JWT tokens
- **File Storage**: AWS S3 or Cloudinary for avatars

---

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String (required, unique),
  email: String (required, unique),
  password: String (hashed),
  avatar: String (URL),
  bio: String,
  chipBalance: Number (default: 1000),
  totalGames: Number (default: 0),
  gamesWon: Number (default: 0),
  gamesLost: Number (default: 0),
  isGuest: Boolean (default: false),
  createdAt: Date,
  lastLogin: Date,
  preferences: {
    cardBackStyle: String (default: "classic"),
    chipStyle: String (default: "classic"),
    soundEnabled: Boolean (default: true),
    vibrationEnabled: Boolean (default: true),
    theme: String (default: "dark")
  }
}
```

### Games Collection
```javascript
{
  _id: ObjectId,
  gameType: String (required), // "private" or "matchmaking"
  pokerVariant: String (required), // "holdem", "omaha", "shortdeck", "reverse"
  status: String (required), // "waiting", "active", "completed", "cancelled"
  maxPlayers: Number (default: 6),
  currentPlayers: Number (default: 0),
  minBet: Number (default: 10),
  maxBet: Number (default: 1000),
  pot: Number (default: 0),
  communityCards: [String], // ["AS", "KH", "QD", "JC", "10S"]
  currentTurn: ObjectId (ref: "Users"),
  dealer: ObjectId (ref: "Users"),
  createdAt: Date,
  startedAt: Date,
  endedAt: Date,
  winner: ObjectId (ref: "Users"),
  gameHistory: [{
    action: String, // "fold", "check", "bet", "call", "raise"
    player: ObjectId (ref: "Users"),
    amount: Number,
    timestamp: Date
  }]
}
```

### GamePlayers Collection
```javascript
{
  _id: ObjectId,
  gameId: ObjectId (ref: "Games"),
  playerId: ObjectId (ref: "Users"),
  seatNumber: Number (0-5),
  cards: [String], // ["AS", "KH"]
  chips: Number,
  isActive: Boolean (default: true),
  isFolded: Boolean (default: false),
  currentBet: Number (default: 0),
  lastAction: String, // "fold", "check", "bet", "call", "raise"
  lastActionAmount: Number,
  joinedAt: Date,
  leftAt: Date
}
```

### GameHistory Collection
```javascript
{
  _id: ObjectId,
  gameId: ObjectId (ref: "Games"),
  playerId: ObjectId (ref: "Users"),
  action: String, // "fold", "check", "bet", "call", "raise", "win", "lose"
  amount: Number,
  timestamp: Date,
  round: String, // "preflop", "flop", "turn", "river", "showdown"
  handRank: String, // "high_card", "pair", "two_pair", etc.
  cards: [String]
}
```

### ChatMessages Collection
```javascript
{
  _id: ObjectId,
  gameId: ObjectId (ref: "Games"),
  playerId: ObjectId (ref: "Users"),
  message: String,
  messageType: String, // "text", "emoji", "system"
  timestamp: Date
}
```

---

## 📁 Optimal Folder Structure

### Frontend (React Native/Expo)
```
poker-app/
├── app/                          # Expo Router pages
│   ├── (auth)/                   # Authentication routes
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   └── guest-login.tsx
│   ├── (tabs)/                   # Main app tabs
│   │   ├── home.tsx             # Main lobby
│   │   ├── find-game.tsx        # Find game screen
│   │   ├── rank.tsx             # Leaderboard
│   │   └── profile.tsx          # User profile
│   ├── game/                     # Game screens
│   │   ├── [gameId].tsx         # Active game
│   │   └── waiting.tsx          # Waiting room
│   ├── _layout.tsx              # Root layout
│   └── index.tsx                # Splash screen
├── src/
│   ├── components/               # Reusable components
│   │   ├── ui/                  # Basic UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Chip.tsx
│   │   │   └── Modal.tsx
│   │   ├── game/                # Game-specific components
│   │   │   ├── GameTable.tsx
│   │   │   ├── PlayerCards.tsx
│   │   │   ├── CommunityCards.tsx
│   │   │   └── ActionButtons.tsx
│   │   ├── auth/                # Authentication components
│   │   │   ├── AuthForm.tsx
│   │   │   └── GuestLoginModal.tsx
│   │   └── layout/              # Layout components
│   │       ├── Header.tsx
│   │       ├── BottomNav.tsx
│   │       └── MenuDrawer.tsx
│   ├── hooks/                   # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useGame.ts
│   │   ├── useSocket.ts
│   │   └── useTheme.ts
│   ├── services/                # API and external services
│   │   ├── api.ts              # Base API configuration
│   │   ├── auth.ts             # Authentication API
│   │   ├── game.ts             # Game API
│   │   ├── socket.ts           # Socket.io client
│   │   └── storage.ts          # Local storage
│   ├── store/                   # State management
│   │   ├── index.ts            # Store configuration
│   │   ├── authSlice.ts        # Authentication state
│   │   ├── gameSlice.ts        # Game state
│   │   └── uiSlice.ts          # UI state
│   ├── types/                   # TypeScript type definitions
│   │   ├── auth.ts
│   │   ├── game.ts
│   │   ├── user.ts
│   │   └── api.ts
│   ├── utils/                   # Utility functions
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   ├── validation.ts
│   │   └── pokerLogic.ts       # Poker game logic
│   ├── styles/                  # Global styles
│   │   ├── theme.ts
│   │   ├── colors.ts
│   │   └── typography.ts
│   └── assets/                  # Static assets
│       ├── images/
│       ├── icons/
│       └── sounds/
├── docs/                        # Documentation
│   └── CONTEXT.md
├── tests/                       # Test files
├── .env.example                 # Environment variables template
├── app.json                     # Expo configuration
├── package.json
└── tsconfig.json
```

### Backend (Node.js/Express)
```
poker-backend/
├── src/
│   ├── controllers/             # Route controllers
│   │   ├── authController.ts
│   │   ├── gameController.ts
│   │   ├── userController.ts
│   │   └── chatController.ts
│   ├── middleware/              # Custom middleware
│   │   ├── auth.ts             # JWT authentication
│   │   ├── validation.ts       # Request validation
│   │   ├── errorHandler.ts     # Error handling
│   │   └── rateLimiter.ts      # Rate limiting
│   ├── models/                  # Database models
│   │   ├── User.ts
│   │   ├── Game.ts
│   │   ├── GamePlayer.ts
│   │   ├── GameHistory.ts
│   │   └── ChatMessage.ts
│   ├── routes/                  # API routes
│   │   ├── auth.ts
│   │   ├── games.ts
│   │   ├── users.ts
│   │   └── chat.ts
│   ├── services/                # Business logic
│   │   ├── authService.ts
│   │   ├── gameService.ts
│   │   ├── pokerLogic.ts       # Poker game logic
│   │   └── socketService.ts    # Socket.io management
│   ├── utils/                   # Utility functions
│   │   ├── database.ts         # Database connection
│   │   ├── logger.ts           # Logging
│   │   ├── validation.ts       # Input validation
│   │   └── helpers.ts
│   ├── types/                   # TypeScript types
│   │   ├── auth.ts
│   │   ├── game.ts
│   │   └── user.ts
│   └── config/                  # Configuration files
│       ├── database.ts
│       ├── socket.ts
│       └── environment.ts
├── socket/                      # Socket.io handlers
│   ├── gameHandlers.ts
│   ├── chatHandlers.ts
│   └── connectionHandlers.ts
├── tests/                       # Test files
├── docs/                        # API documentation
├── .env.example
├── package.json
├── tsconfig.json
└── server.ts                    # Entry point
```

---

### Splash Screen Layout
- **Top Center:**
  - Logo (App branding image/icon)
  - App Name in bold, center-aligned
  - Loading Spinner (animated spinner below the name)

This screen will display for a few seconds before navigating to the Authentication Screen.

---

## 🔐 Authentication Screen

### Layout Overview
- **Top Right:**
  - Guest Login Button (prominently displayed)

- **Center Section:**
  - App Logo
  - Welcome Message
  - Two main options:
    - **Email Login/Signup** (primary option)
    - **Play as Guest** (secondary option)

### Email Authentication Flow

#### Login Page
- **Email Input Field**
- **Password Input Field**
- **Login Button**
- **"Forgot Password?" Link**
- **"Don't have an account? Sign Up" Link**

#### Sign Up Page
- **Username Input Field**
- **Email Input Field**
- **Password Input Field**
- **Confirm Password Input Field**
- **Sign Up Button**
- **"Already have an account? Login" Link**

### Guest Login Flow
- **Username Input Modal:**
  - Prompt: "Enter your username to play as guest"
  - Username input field
  - "Play as Guest" button
  - "Cancel" button

### Navigation Flow
1. Splash Screen → Authentication Screen
2. Authentication Screen → Main Lobby (after successful login/signup/guest setup)

---

## 🏠 Main Lobby (Home Screen)

### Layout Overview

#### Top Right Navigation
- **Menu Icon (☰)** – Opens settings, support, help, and other utilities
- **Profile Icon (👤)** – Takes user to Profile tab (also accessible from bottom nav)
- **Search Icon (🔍)** – Allows searching for players or games

#### Top Center
- **App Slogan or Tagline** (e.g., "Play. Win. Repeat.")

#### Center Section
- **Dropdown 1: Game Type**
  - Options:
    - Private Table
    - Matchmaking

- **Dropdown 2: Poker Variant**
  - Options:
    - Hold'em
    - Omaha
    - Short Deck
    - Reverse Hold'em

- **Play Button:**
  - CTA button to Start or Join Game
  - Disabled until valid selections made in dropdowns

#### Bottom Section (Scrollable)
- **Card Back Style Selector:**
  - Choose visual theme for card backs
  - Horizontal scroll of card back options

- **Chip Style Selector:**
  - Choose chip design
  - Horizontal scroll of chip options

---

## 🔍 Bottom Navigation

Always visible, fixed nav bar:

| Icon | Tab | Function |
|------|-----|----------|
| 🏠 | Home | Returns to main lobby |
| 🎮 | Find Game | Explore open tables & quick join |
| 🏆 | Rank | Shows leaderboard and rankings |
| 👤 | Profile | Player profile, settings |

---

## 🎲 In-Game Screen

### Layout

#### Player Area
- **Player Cards (Bottom Center):**
  - 2 personal cards, face-down initially
  - Flip on touch & hold
  - Below Cards:
    - Player Name
    - Player's current chip balance

#### Community Cards (Center Table Area)
- Cards dealt and shown progressively (Flop, Turn, River)
  - 3 Cards (Flop)
  - 4th Card (Turn)
  - 5th Card (River)

#### All Players Overview
- Avatars + Names + Chip count for all seated players
- Cards revealed only when applicable

#### Bottom Action Bar (Dynamic)
Appears when it's the player's turn:

| Button | Function |
|--------|----------|
| Fold | Forfeit the round |
| Check | Pass without betting (if possible) |
| Bet | Open betting modal/input slider |

---

## 👤 Profile Screen

Accessible from both top-right icon and bottom nav.

### Profile Elements
- Avatar
- Username & Bio
- Chip Balance
- Game History
- Win/Loss Stats
- Edit Profile Option

### Guest User Profile
- **Username Display** (as entered during guest setup)
- **Chip Balance**
- **Game History**
- **Win/Loss Stats**
- **"Create Account" Button** (to convert guest to registered user)
- **Limited Profile Options** (no email/bio editing)

### Registered User Profile
- **Full Profile Management**
- **Email Display**
- **Bio Editing**
- **Avatar Upload**
- **Account Settings**
- **Password Change Option**

---

## ☰ Menu Drawer (Top Right)

Accessible via menu icon.

### Menu Options
- **Settings**
  - Sound On/Off
  - Vibration
  - Theme
- **Help / FAQ**
- **Support**
- **Logout**

---

## 🧠 Future Enhancements (Optional)

- 🎥 Live Chat/Voice Feature
- 💬 Emoji Reactions during Gameplay
- 🎯 Daily Missions & Rewards
- 👥 Friends & Invites System

---

## 📌 Developer Notes

### State Management
Use centralized state management (e.g., Redux, Zustand) to track:
- User session
- Game state
- Player actions

### UI/UX Guidelines
- Smooth animations for card flips and dealing
- Consistent bottom tab and top navigation across screens
- Use socket.io or similar for real-time multiplayer sync

### Component Architecture
Use component-based UI design:
- `CardComponent`
- `ChipComponent`
- `DropdownSelector`
- `ActionButtonsGroup`
- `GameTableLayout`
- `AuthForm` (Login/Signup)
- `GuestLoginModal`
- `UserProfile` (with guest/registered variants)
