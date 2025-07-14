# 🎨 Unity Design Specifications - Poker Game

## 📱 **Screen Dimensions & Scaling**

### Base Resolution
- **Reference Resolution:** 375x812 (iPhone X)
- **Scaling Formula:** `scale = (screenWidth / 375) * size`
- **Vertical Scaling:** `verticalScale = (screenHeight / 812) * size`

### Unity Canvas Settings
```csharp
// Canvas Scaler Component Settings
Canvas Scaler:
- UI Scale Mode: Scale With Screen Size
- Reference Resolution: 375 x 812
- Screen Match Mode: Match Width Or Height
- Match: 0.5 (balance between width and height)
```

---

## 🎨 **Color Palette**

### Primary Colors
```csharp
// Main Theme Colors
public static class GameColors 
{
    public static Color Primary = new Color(0f, 0.9f, 0.765f, 1f);        // #00E6C3 (Turquoise)
    public static Color Secondary = new Color(0.306f, 0.804f, 0.769f, 1f); // #4ECDC4 (Teal)
    public static Color Background = new Color(0.961f, 0.961f, 0.961f, 1f); // #F5F5F5 (Light Gray)
    public static Color Surface = new Color(1f, 1f, 1f, 1f);               // #FFFFFF (White)
    public static Color OnSurface = new Color(0.102f, 0.102f, 0.102f, 1f); // #1A1A1A (Dark Gray)
    public static Color OnSurfaceVariant = new Color(0.6f, 0.6f, 0.6f, 1f); // #999999 (Medium Gray)
    public static Color Outline = new Color(0.875f, 0.875f, 0.875f, 1f);   // #E0E0E0 (Border Gray)
    public static Color Error = new Color(1f, 0.278f, 0.341f, 1f);         // #FF4757 (Red)
}

// Game Specific Colors
public static class PokerColors 
{
    public static Color TableGreen = new Color(0f, 0.9f, 0.765f, 1f);      // #00E6C3 (Table Background)
    public static Color CardBack = new Color(0.722f, 0.902f, 1f, 1f);      // #B8E6FF (Card Back Blue)
    public static Color ChipGold = new Color(1f, 0.843f, 0f, 1f);          // #FFD700 (Gold Chip)
    public static Color DealerBadge = new Color(1f, 0.843f, 0f, 1f);       // #FFD700 (Dealer Badge)
    public static Color RedSuit = new Color(0.914f, 0.118f, 0.388f, 1f);   // #E91E63 (Hearts/Diamonds)
    public static Color BlackSuit = new Color(0.184f, 0.208f, 0.259f, 1f); // #2F3542 (Spades/Clubs)
}
```

---

## 📏 **Typography System**

### Font Family
- **Primary Font:** Poppins (Google Fonts)
- **Weights Used:** 400 (Regular), 600 (SemiBold), 700 (Bold)

### Unity Text Mesh Pro Settings
```csharp
// Font Sizes (scaled)
public static class FontSizes 
{
    public static float Heading1 = 32f;     // Main titles
    public static float Heading2 = 28f;     // Section headers
    public static float Heading3 = 24f;     // Card titles
    public static float Body1 = 18f;        // Primary text
    public static float Body2 = 16f;        // Secondary text
    public static float Caption = 14f;      // Small text
    public static float Button = 18f;       // Button text
    public static float CardValue = 40f;    // Card numbers/suits
}

// Text Styles
public static class TextStyles 
{
    // Heading Style
    public static void ApplyHeadingStyle(TextMeshProUGUI text) 
    {
        text.fontSize = FontSizes.Heading1;
        text.fontWeight = FontWeight.Bold;
        text.color = GameColors.OnSurface;
    }
    
    // Body Style
    public static void ApplyBodyStyle(TextMeshProUGUI text) 
    {
        text.fontSize = FontSizes.Body1;
        text.fontWeight = FontWeight.Regular;
        text.color = GameColors.OnSurface;
    }
}
```

---

## 🎮 **Game Screen Layout**

### Screen Dimensions
- **Full Screen:** 375x812 (reference)
- **Safe Area Top:** 44px (status bar)
- **Safe Area Bottom:** 34px (home indicator)

### Layout Structure
```csharp
// Game Screen Layout (Y positions from top)
public static class GameLayout 
{
    // Opponent Player Area
    public static Vector2 OpponentPosition = new Vector2(0, 600);
    public static float OpponentAvatarSize = 60f;
    
    // Center Game Area
    public static Vector2 CenterLogoPosition = new Vector2(0, 400);
    public static Vector2 PotPosition = new Vector2(0, 350);
    public static float LogoSize = 40f;
    
    // Player Cards Area
    public static Vector2 PlayerCardsPosition = new Vector2(0, 200);
    public static Vector2 CardSize = new Vector2(80, 110);
    public static float CardOverlap = 10f; // Cards overlap by 10px
    
    // Player Info Area
    public static Vector2 PlayerInfoPosition = new Vector2(0, 100);
    public static Vector2 EmojiButtonPosition = new Vector2(150, 100);
    public static float EmojiButtonSize = 40f;
    
    // Action Buttons Area
    public static Vector2 ActionButtonsPosition = new Vector2(0, 50);
    public static Vector2 ActionButtonSize = new Vector2(100, 60);
    public static float ActionButtonSpacing = 20f;
}
```

---

## 🃏 **Card Design Specifications**

### Card Dimensions
```csharp
public static class CardSpecs 
{
    public static Vector2 CardSize = new Vector2(80, 110);
    public static float BorderRadius = 12f;
    public static Color CardBackground = Color.white;
    public static Color CardBorder = new Color(0.875f, 0.875f, 0.875f, 1f); // #E0E0E0
    public static float BorderWidth = 2f;
    
    // Card Back Design
    public static Color CardBackColor = new Color(0.722f, 0.902f, 1f, 1f); // #B8E6FF
    public static string CardBackSymbol = "🂠"; // Unicode card back
    
    // Suit Colors
    public static Color RedSuitColor = new Color(0.914f, 0.118f, 0.388f, 1f); // #E91E63
    public static Color BlackSuitColor = new Color(0.184f, 0.208f, 0.259f, 1f); // #2F3542
    
    // Suit Symbols
    public static string Spades = "♠";
    public static string Hearts = "♥";
    public static string Diamonds = "♦";
    public static string Clubs = "♣";
}
```

### Card Animation
```csharp
// Card Flip Animation Settings
public static class CardAnimations 
{
    public static float FlipDuration = 0.3f;
    public static AnimationCurve FlipCurve = AnimationCurve.EaseInOut(0, 0, 1, 1);
    public static Vector3 FlipRotation = new Vector3(0, 180, 0);
}
```

---

## 👤 **Player Avatar System**

### Avatar Specifications
```csharp
public static class AvatarSpecs 
{
    public static float AvatarSize = 60f;
    public static float BorderRadius = 30f; // Perfect circle
    public static Color AvatarBackground = new Color(0.945f, 0.953f, 0.957f, 1f); // #F1F3F4
    public static Color ActivePlayerGlow = GameColors.Primary;
    public static float GlowIntensity = 0.25f;
    
    // Dealer Badge
    public static Vector2 DealerBadgeOffset = new Vector2(20, 20);
    public static float DealerBadgeSize = 20f;
    public static Color DealerBadgeColor = GameColors.ChipGold;
    public static string DealerText = "D";
    
    // Player Name
    public static Vector2 NameOffset = new Vector2(0, -35);
    public static float NameFontSize = 16f;
    public static Color NameColor = Color.white;
    
    // Chip Count
    public static Vector2 ChipOffset = new Vector2(0, -50);
    public static float ChipFontSize = 24f;
    public static Color ChipColor = Color.white;
}
```

---

## 🎯 **Button Design System**

### Primary Button (Play, Action Buttons)
```csharp
public static class ButtonSpecs 
{
    // Primary Button
    public static Vector2 PrimaryButtonSize = new Vector2(200, 52);
    public static float PrimaryButtonRadius = 26f;
    public static Color PrimaryButtonColor = GameColors.Primary;
    public static Color PrimaryButtonTextColor = Color.white;
    public static float PrimaryButtonFontSize = 18f;
    
    // Action Buttons (Fold, Call, Raise)
    public static Vector2 ActionButtonSize = new Vector2(100, 60);
    public static float ActionButtonRadius = 12f;
    public static Color ActionButtonColor = new Color(1f, 1f, 1f, 0.2f); // Semi-transparent white
    public static Color ActionButtonTextColor = Color.white;
    public static float ActionButtonFontSize = 18f;
    
    // Button Shadow
    public static Vector2 ShadowOffset = new Vector2(0, 2);
    public static Color ShadowColor = new Color(0, 0, 0, 0.1f);
    public static float ShadowBlur = 8f;
}
```

---

## 📱 **Modal Design (PIN Entry, Menus)**

### Modal Specifications
```csharp
public static class ModalSpecs 
{
    // Modal Background
    public static Color OverlayColor = new Color(0, 0, 0, 0.5f);
    public static Vector2 ModalSize = new Vector2(340, 400);
    public static float ModalRadius = 20f;
    public static Color ModalBackground = Color.white;
    
    // PIN Entry Modal
    public static Vector2 PinDisplaySize = new Vector2(200, 40);
    public static float PinFontSize = 32f;
    public static Color PinTextColor = GameColors.OnSurface;
    public static float PinLetterSpacing = 4f;
    
    // Number Pad
    public static Vector2 NumberButtonSize = new Vector2(80, 80);
    public static float NumberButtonRadius = 40f;
    public static Color NumberButtonColor = Color.clear;
    public static Color NumberTextColor = GameColors.OnSurfaceVariant;
    public static float NumberFontSize = 24f;
    
    // GO Button
    public static Color GoButtonColor = GameColors.Primary;
    public static Color GoButtonTextColor = Color.white;
}
```

---

## 🏆 **Rank Screen Layout**

### Podium Design
```csharp
public static class RankSpecs 
{
    // Podium Positions
    public static Vector2 FirstPlacePosition = new Vector2(0, 500);
    public static Vector2 SecondPlacePosition = new Vector2(-100, 450);
    public static Vector2 ThirdPlacePosition = new Vector2(100, 450);
    
    // Badge Sizes
    public static float FirstPlaceBadgeSize = 60f;
    public static float SecondPlaceBadgeSize = 50f;
    public static float ThirdPlaceBadgeSize = 50f;
    
    // Badge Colors
    public static Color GoldBadge = new Color(1f, 0.843f, 0f, 1f);     // #FFD700
    public static Color SilverBadge = new Color(0.753f, 0.753f, 0.753f, 1f); // #C0C0C0
    public static Color BronzeBadge = new Color(0.804f, 0.498f, 0.196f, 1f); // #CD7F32
    
    // Avatar Sizes
    public static float FirstPlaceAvatarSize = 100f;
    public static float SecondPlaceAvatarSize = 60f;
    public static float ThirdPlaceAvatarSize = 60f;
    
    // Leaderboard List
    public static Vector2 LeaderboardItemSize = new Vector2(350, 70);
    public static float LeaderboardSpacing = 16f;
    public static Color LeaderboardBackground = Color.white;
}
```

---

## 👤 **Profile Screen Layout**

### Profile Specifications
```csharp
public static class ProfileSpecs 
{
    // Avatar Section
    public static Vector2 ProfileAvatarPosition = new Vector2(0, 600);
    public static float ProfileAvatarSize = 120f;
    public static Color ProfileAvatarBackground = GameColors.Outline;
    
    // Level Display
    public static Vector2 LevelPosition = new Vector2(0, 500);
    public static float LevelFontSize = 16f;
    public static Color LevelColor = GameColors.OnSurfaceVariant;
    
    // Progress Bar
    public static Vector2 ProgressBarPosition = new Vector2(0, 470);
    public static Vector2 ProgressBarSize = new Vector2(250, 8);
    public static Color ProgressBarBackground = GameColors.Outline;
    public static Color ProgressBarFill = GameColors.ChipGold;
    public static float ProgressBarRadius = 4f;
    
    // XP Display
    public static Vector2 XpPosition = new Vector2(0, 450);
    public static float XpFontSize = 14f;
    public static Color XpColor = GameColors.OnSurfaceVariant;
    
    // Stats Grid
    public static Vector2 StatsGridPosition = new Vector2(0, 350);
    public static Vector2 StatItemSize = new Vector2(150, 120);
    public static float StatIconSize = 50f;
    public static Color StatIconBackground = GameColors.Outline;
    public static float StatValueFontSize = 32f;
    public static float StatLabelFontSize = 14f;
}
```

---

## 🎨 **Animation Specifications**

### Transition Animations
```csharp
public static class AnimationSpecs 
{
    // Screen Transitions
    public static float ScreenTransitionDuration = 0.3f;
    public static AnimationCurve ScreenTransitionCurve = AnimationCurve.EaseInOut(0, 0, 1, 1);
    
    // Button Press Animation
    public static float ButtonPressScale = 0.95f;
    public static float ButtonPressDuration = 0.1f;
    
    // Card Deal Animation
    public static float CardDealDuration = 0.5f;
    public static AnimationCurve CardDealCurve = AnimationCurve.EaseOut(0, 0, 1, 1);
    
    // Chip Movement
    public static float ChipMoveDuration = 0.8f;
    public static AnimationCurve ChipMoveCurve = AnimationCurve.EaseInOut(0, 0, 1, 1);
    
    // Modal Animations
    public static float ModalFadeInDuration = 0.2f;
    public static float ModalScaleInDuration = 0.3f;
    public static AnimationCurve ModalScaleCurve = AnimationCurve.EaseOutBack(0, 0, 1, 1);
}
```

---

## 📐 **Spacing System**

### Consistent Spacing Values
```csharp
public static class Spacing 
{
    public static float XSmall = 4f;
    public static float Small = 8f;
    public static float Medium = 16f;
    public static float Large = 24f;
    public static float XLarge = 32f;
    public static float XXLarge = 40f;
    
    // Component Specific
    public static float CardSpacing = 10f;
    public static float ButtonSpacing = 20f;
    public static float SectionSpacing = 40f;
    public static float ScreenPadding = 20f;
}
```

---

## 🔧 **Unity Implementation Notes**

### Canvas Setup
1. Create Canvas with Canvas Scaler component
2. Set UI Scale Mode to "Scale With Screen Size"
3. Reference Resolution: 375 x 812
4. Screen Match Mode: Match Width Or Height (0.5)

### Prefab Structure
```
GameCanvas/
├── SafeArea/
│   ├── Header/
│   ├── GameArea/
│   │   ├── OpponentArea/
│   │   ├── CenterArea/
│   │   ├── PlayerCardsArea/
│   │   └── ActionButtonsArea/
│   └── Footer/
└── Modals/
    ├── PinEntryModal/
    ├── MenuModal/
    └── SettingsModal/
```

### Material Setup
- Use UI/Default shader for most UI elements
- Create custom materials for card backs with the specified blue color
- Use TextMeshPro materials for text with proper font weights

This specification document provides everything needed to recreate the exact visual design in Unity!