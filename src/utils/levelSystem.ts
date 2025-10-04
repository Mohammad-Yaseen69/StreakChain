import chalk from "chalk";
import boxen from "boxen";

export interface LevelInfo {
    level: number;
    currentXP: number;
    xpToNextLevel: number;
    totalXPForLevel: number;
    progressPercentage: number;
    title: string;
    description: string;
}

// Level progression system - exponential growth
const XP_REQUIREMENTS = [
    0,    // Level 1
    100,  // Level 2
    250,  // Level 3
    450,  // Level 4
    700,  // Level 5
    1000, // Level 6
    1350, // Level 7
    1750, // Level 8
    2200, // Level 9
    2700, // Level 10
    3250, // Level 11
    3850, // Level 12
    4500, // Level 13
    5200, // Level 14
    5950, // Level 15
    6750, // Level 16
    7600, // Level 17
    8500, // Level 18
    9450, // Level 19
    10450, // Level 20
    11500, // Level 21
    12600, // Level 22
    13750, // Level 23
    14950, // Level 24
    16200, // Level 25
    17500, // Level 26
    18850, // Level 27
    20250, // Level 28
    21700, // Level 29
    23200, // Level 30
    24750, // Level 31
    26350, // Level 32
    28000, // Level 33
    29700, // Level 34
    31450, // Level 35
    33250, // Level 36
    35100, // Level 37
    37000, // Level 38
    38950, // Level 39
    40950, // Level 40
    43000, // Level 41
    45100, // Level 42
    47250, // Level 43
    49450, // Level 44
    51700, // Level 45
    54000, // Level 46
    56350, // Level 47
    58750, // Level 48
    61200, // Level 49
    63700, // Level 50
];

// Level titles and descriptions
const LEVEL_TITLES: { [key: number]: { title: string; description: string } } = {
    1: { title: "🌱 Beginner", description: "Just starting your journey!" },
    2: { title: "📚 Learner", description: "Building momentum!" },
    3: { title: "💪 Dedicated", description: "Showing real commitment!" },
    4: { title: "🔥 Consistent", description: "You're on fire!" },
    5: { title: "⭐ Rising Star", description: "Making great progress!" },
    6: { title: "🏆 Achiever", description: "Consistency is your strength!" },
    7: { title: "💎 Disciplined", description: "You've mastered the basics!" },
    8: { title: "🚀 Momentum Builder", description: "Nothing can stop you!" },
    9: { title: "🎯 Focused", description: "Laser-focused on your goals!" },
    10: { title: "👑 Streak Master", description: "You're a streak champion!" },
    15: { title: "🌟 Elite", description: "Among the top performers!" },
    20: { title: "🏅 Legend", description: "Your dedication is legendary!" },
    25: { title: "💫 Master", description: "You've mastered consistency!" },
    30: { title: "🔥 Fire", description: "Unstoppable force of nature!" },
    40: { title: "⚡ Lightning", description: "Speed and consistency combined!" },
    50: { title: "🏆 Grandmaster", description: "The ultimate streak champion!" }
};

export class LevelSystem {
    static calculateLevelInfo(currentXP: number): LevelInfo {
        let level = 1;
        let totalXPForLevel = 0;

        for (let i = 0; i < XP_REQUIREMENTS.length; i++) {
            if (currentXP >= XP_REQUIREMENTS[i]) {
                level = i + 1;
                totalXPForLevel = XP_REQUIREMENTS[i];
            } else {
                break;
            }
        }

        // Calculate XP needed for next level
        const nextLevelXP = XP_REQUIREMENTS[level] || XP_REQUIREMENTS[XP_REQUIREMENTS.length - 1];
        const xpToNextLevel = nextLevelXP - currentXP;

        // Calculate progress percentage
        const currentLevelXP = XP_REQUIREMENTS[level - 1] || 0;
        const levelXPNeeded = nextLevelXP - currentLevelXP;
        const currentLevelProgress = currentXP - currentLevelXP;
        const progressPercentage = levelXPNeeded > 0 ? (currentLevelProgress / levelXPNeeded) * 100 : 100;

        // Get title and description
        const titleInfo = this.getLevelTitle(level);

        return {
            level,
            currentXP,
            xpToNextLevel,
            totalXPForLevel,
            progressPercentage: Math.min(progressPercentage, 100),
            title: titleInfo.title,
            description: titleInfo.description
        };
    }

    /**
     * Get level title and description
     */
    static getLevelTitle(level: number): { title: string; description: string } {
        // Find the highest level title that applies
        let bestMatch = LEVEL_TITLES[1];
        for (const [levelThreshold, titleInfo] of Object.entries(LEVEL_TITLES)) {
            if (level >= parseInt(levelThreshold)) {
                bestMatch = titleInfo;
            }
        }
        return bestMatch;
    }

    /**
     * Check if user leveled up and return level up info
     */
    static checkLevelUp(oldXP: number, newXP: number): LevelInfo | null {
        const oldLevelInfo = this.calculateLevelInfo(oldXP);
        const newLevelInfo = this.calculateLevelInfo(newXP);

        if (newLevelInfo.level > oldLevelInfo.level) {
            return newLevelInfo;
        }

        return null;
    }

    /**
     * Display level up celebration
     */
    static displayLevelUp(levelInfo: LevelInfo): void {
        const celebration = `
🎉 LEVEL UP! 🎉

${chalk.yellowBright.bold(`Level ${levelInfo.level}`)} - ${chalk.cyanBright.bold(levelInfo.title)}
${chalk.gray(levelInfo.description)}

${chalk.greenBright("🎊 Congratulations! You've reached a new milestone! 🎊")}
        `;

        console.log(
            boxen(celebration, {
                padding: 1,
                margin: 1,
                borderStyle: "double",
                borderColor: "yellow",
                backgroundColor: "black"
            })
        );
    }

    /**
     * Display current level information
     */
    static displayLevelInfo(levelInfo: LevelInfo): void {
        const progressBar = this.createProgressBar(levelInfo.progressPercentage);

        const levelDisplay = `
${chalk.cyanBright.bold(`Level ${levelInfo.level}`)} - ${chalk.magentaBright.bold(levelInfo.title)}
${chalk.gray(levelInfo.description)}

${chalk.yellowBright("XP Progress:")} ${levelInfo.currentXP} / ${levelInfo.totalXPForLevel + levelInfo.xpToNextLevel}
${progressBar}
${chalk.blueBright(`Next Level: ${levelInfo.xpToNextLevel} XP needed`)}
        `;

        console.log(
            boxen(levelDisplay, {
                padding: 1,
                margin: 0,
                borderStyle: "round",
                borderColor: "cyan"
            })
        );
    }

    /**
     * Create a visual progress bar
     */
    private static createProgressBar(percentage: number, length: number = 20): string {
        const filled = Math.round((percentage / 100) * length);
        const empty = length - filled;

        const filledBar = "█".repeat(filled);
        const emptyBar = "░".repeat(empty);

        return `${chalk.green(filledBar)}${chalk.gray(emptyBar)} ${chalk.yellowBright(Math.round(percentage))}%`;
    }

    /**
     * Get XP requirement for a specific level
     */
    static getXPForLevel(level: number): number {
        return XP_REQUIREMENTS[level - 1] || XP_REQUIREMENTS[XP_REQUIREMENTS.length - 1];
    }

    /**
     * Get maximum level
     */
    static getMaxLevel(): number {
        return XP_REQUIREMENTS.length;
    }

    /**
     * Get level requirements for a range of levels
     */
    static getLevelRequirements(startLevel: number = 1, endLevel: number = 10): Array<{
        level: number;
        xpRequired: number;
        title: string;
    }> {
        const requirements = [];
        for (let level = startLevel; level <= Math.min(endLevel, this.getMaxLevel()); level++) {
            const xpRequired = level === 1 ? 0 : this.getXPForLevel(level);
            const titleInfo = this.getLevelTitle(level);
            requirements.push({
                level,
                xpRequired,
                title: titleInfo.title
            });
        }
        return requirements;
    }

    /**
     * Display level requirements table
     */
    static displayLevelRequirements(startLevel: number = 1, endLevel: number = 10): void {
        const requirements = this.getLevelRequirements(startLevel, endLevel);

        console.log(chalk.yellowBright.bold("\n📋 Level Requirements:"));
        console.log(chalk.gray("┌────────┬─────────────┬─────────────────────┐"));
        console.log(chalk.gray("│ Level  │ XP Required │ Title               │"));
        console.log(chalk.gray("├────────┼─────────────┼─────────────────────┤"));

        requirements.forEach(req => {
            const levelStr = req.level.toString().padStart(6);
            const xpStr = req.xpRequired.toString().padStart(11);
            const titleStr = req.title.padEnd(19);
            console.log(chalk.gray(`│ ${levelStr} │ ${xpStr} │ ${titleStr} │`));
        });

        console.log(chalk.gray("└────────┴─────────────┴─────────────────────┘"));
    }
}   