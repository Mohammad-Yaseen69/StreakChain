# 🎮 StreakChain Level System

## Overview
The StreakChain level system is a comprehensive gamification feature that rewards users for maintaining consistent habits and building discipline over time.

## 🏆 Level Progression

### XP Requirements
The level system uses an exponential progression curve with 50 levels total:

- **Level 1**: 0 XP (🌱 Beginner)
- **Level 2**: 100 XP (📚 Learner)
- **Level 3**: 250 XP (💪 Dedicated)
- **Level 4**: 450 XP (🔥 Consistent)
- **Level 5**: 700 XP (⭐ Rising Star)
- **Level 6**: 1000 XP (🏆 Achiever)
- **Level 7**: 1350 XP (💎 Disciplined)
- **Level 8**: 1750 XP (🚀 Momentum Builder)
- **Level 9**: 2200 XP (🎯 Focused)
- **Level 10**: 2700 XP (👑 Streak Master)
- **Level 15**: 4500 XP (🌟 Elite)
- **Level 20**: 10450 XP (🏅 Legend)
- **Level 25**: 17500 XP (💫 Master)
- **Level 30**: 23200 XP (🔥 Fire)
- **Level 40**: 40950 XP (⚡ Lightning)
- **Level 50**: 63700 XP (🏆 Grandmaster)

## 💰 XP Earning System

### Base XP
- **Daily Streak Log**: 10 XP per successful day

### Bonus XP (Milestone Rewards)
- **7-Day Streak**: +20 bonus XP
- **30-Day Streak**: +50 bonus XP
- **100-Day Streak**: +100 bonus XP
- **Every 10 Days**: +10 bonus XP (20, 40, 50, 60, etc.)

### XP Loss
- **Streak Failure**: Lose all XP earned from that specific streak
- **Missed Day**: Lose XP from missed streaks (automatic check)

## 🎯 Features

### Level Display
- Current level with title and description
- Progress bar showing XP to next level
- XP requirements for upcoming levels

### Level Up Celebrations
- Automatic level up detection
- Beautiful celebration display with boxen
- Level up history tracking

### Statistics
- Total XP earned (lifetime)
- Current XP balance
- Active streaks count
- Level up history (last 5 level ups)

## 🛠️ Technical Implementation

### Core Files
- `src/utils/levelSystem.ts` - Main level system logic
- `src/index.ts` - XP management and level up detection
- `src/options/logDay.ts` - XP earning integration

### Database Schema
```typescript
type DB = {
    xp: number;           // Current XP balance
    level: number;        // Current level
    totalXP: number;      // Lifetime XP earned
    levelUpHistory: Array<{
        level: number;
        date: string;
        title: string;
    }>;
    streaks: Streak[];
};
```

### Key Functions
- `LevelSystem.calculateLevelInfo(xp)` - Calculate level from XP
- `LevelSystem.checkLevelUp(oldXP, newXP)` - Detect level ups
- `addXP(amount)` - Add XP and check for level up
- `removeXP(amount)` - Remove XP (for failures)

## 🎨 UI Features

### Main Menu
- Enhanced level display with title
- Progress to next level indicator
- New "Level & Progress" menu option

### Level Details Screen
- Detailed level information with progress bar
- Level up history
- Statistics overview
- Level requirements table

### Visual Elements
- Color-coded progress bars
- Emoji-rich level titles
- Boxen-styled celebrations
- ASCII table for level requirements

## 🚀 Usage Examples

### Checking Level Progress
```typescript
const levelInfo = LevelSystem.calculateLevelInfo(150);
console.log(`Level ${levelInfo.level} - ${levelInfo.title}`);
console.log(`${levelInfo.xpToNextLevel} XP to next level`);
```

### Adding XP with Level Up Detection
```typescript
const leveledUp = await addXP(10);
if (leveledUp) {
    console.log("🎉 Level up!");
}
```

### Displaying Level Requirements
```typescript
LevelSystem.displayLevelRequirements(1, 10);
```

## 🎯 Benefits

1. **Motivation**: Clear progression system keeps users engaged
2. **Achievement**: Milestone bonuses reward consistency
3. **Feedback**: Visual progress indicators show improvement
4. **Gamification**: Makes habit building fun and rewarding
5. **Long-term Engagement**: 50 levels provide long-term goals