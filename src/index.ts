import inquirer from "inquirer";
import chalk from "chalk";
import { about, createStreak, deleteStreaks, listStreaks, logDay } from "./options/index.ts";
import db, { Streak } from "./db/index.ts";
import { format, subDays } from "date-fns";
import { LevelSystem } from "./utils/levelSystem.ts";

/**
 * Add XP and check for level up
 */
export const addXP = async (amount: number): Promise<boolean> => {
    const oldXP = db.data.xp;
    db.data.xp += amount;
    db.data.totalXP += amount;
    
    // Check for level up
    const levelUpInfo = LevelSystem.checkLevelUp(oldXP, db.data.xp);
    
    if (levelUpInfo) {
        // Update level in database
        db.data.level = levelUpInfo.level;
        
        // Add to level up history
        db.data.levelUpHistory.push({
            level: levelUpInfo.level,
            date: new Date().toISOString().split("T")[0],
            title: levelUpInfo.title
        });
        
        // Display level up celebration
        LevelSystem.displayLevelUp(levelUpInfo);
        
        await db.write();
        return true; // Leveled up
    }
    
    await db.write();
    return false; // No level up
};

/**
 * Remove XP (for streak failures)
 */
export const removeXP = async (amount: number): Promise<void> => {
    db.data.xp = Math.max(0, db.data.xp - amount);
    await db.write();
};

const streakMissCheck = async () => {
    const streaks = db.data.streaks
    const yesterday = format(subDays(new Date(), 1), "yyyy-MM-dd");
    const today = new Date().toISOString().split("T")[0];

    const missedStreaks = streaks.filter(streak => {
        const hasYesterday = streak.daysLogs.some(day => day.date === yesterday);
        const hasToday = streak.daysLogs.some(day => day.date === today);
        const noLogs = streak.daysLogs.length === 0;
        const notCreatedToday = streak.createdAt !== today;

        return (!hasYesterday || noLogs) && notCreatedToday && !hasToday;
    });



    if (missedStreaks.length === 0 && streaks.length > 0) {
        return;
    } else {
        for (const streak of missedStreaks) {
            console.log(chalk.red(`You missed your ${streak.name} streak 😔 ${streak.xpPerStreak > 0 ? `XP: -${streak.xpPerStreak}` : ""}`))
            await removeXP(streak.xpPerStreak)
            streak.xpPerStreak = 0
            streak.daysLogs = [{
                date: yesterday,
                dayNumber: 0,
                success: false,
            }]
            streak.streakReset = today
        }
    }

    await db.write()
}

/**
 * Show detailed level information
 */
const showLevelDetails = async () => {
    console.clear();
    await db.read();
    
    const levelInfo = LevelSystem.calculateLevelInfo(db.data.xp);
    
    console.log(chalk.magentaBright.bold("📊 Level & Progress Details\n"));
    
    // Display detailed level info
    LevelSystem.displayLevelInfo(levelInfo);
    
    // Show level up history if available
    if (db.data.levelUpHistory && db.data.levelUpHistory.length > 0) {
        console.log(chalk.yellowBright.bold("\n🏆 Level Up History:"));
        const history = db.data.levelUpHistory.slice(-5).reverse(); // Show last 5 level ups
        history.forEach(entry => {
            console.log(chalk.cyan(`  Level ${entry.level} - ${entry.title} (${entry.date})`));
        });
    }
    
    // Show statistics
    console.log(chalk.greenBright.bold("\n📈 Statistics:"));
    console.log(chalk.white(`  Total XP Earned: ${chalk.bold(db.data.totalXP)}`));
    console.log(chalk.white(`  Current XP: ${chalk.bold(db.data.xp)}`));
    console.log(chalk.white(`  Active Streaks: ${chalk.bold(db.data.streaks.length)}`));
    
    // Show level requirements for next few levels
    const currentLevel = levelInfo.level;
    const maxLevel = Math.min(currentLevel + 5, LevelSystem.getMaxLevel());
    LevelSystem.displayLevelRequirements(currentLevel, maxLevel);
    
    restartProgram();
};

export const mainMenu = async () => {
    console.clear();
    await db.read()
    console.log(chalk.magentaBright.bold("\n✨ Welcome to Streak Chain ✨\n"));

    await streakMissCheck()
    
    // Display enhanced level information
    const levelInfo = LevelSystem.calculateLevelInfo(db.data.xp);
    console.log(chalk.greenBright(`Your Current ${chalk.yellowBright.bold("XP")}: ${chalk.bold(db.data.xp)}`));
    console.log(chalk.cyanBright(`Your Current ${chalk.magentaBright.bold("Level")}: ${chalk.bold(levelInfo.level)} - ${chalk.bold(levelInfo.title)}`));
    console.log(chalk.blueBright(`Progress to Next Level: ${chalk.bold(levelInfo.xpToNextLevel)} XP needed\n`));

    const { menu } = await inquirer.prompt([
        {
            type: "list",
            name: "menu",
            message: chalk.blueBright("What do you want to do?"),
            choices: [
                { name: chalk.green("Log Today's Streak"), value: "log" },
                { name: chalk.yellow("View Your Streaks"), value: "view" },
                { name: chalk.blue("Create a Streak"), value: "create" },
                { name: chalk.red("Delete a Streak"), value: "delete" },
                { name: chalk.magenta("Level & Progress"), value: "level" },
                { name: chalk.cyan("About StreakChain"), value: "about" },
                { name: chalk.red("Exit"), value: "exit" }
            ]
        }
    ]);


    switch (menu) {
        case "about":
            about()
            restartProgram()
            break;
        case "create":
            createStreak()
            break;
        case "view":
            listStreaks()
            break;
        case "delete":
            deleteStreaks()
            break;
        case "log":
            logDay()
            break;
        case "level":
            showLevelDetails()
            break;
        case "exit":
            console.log(chalk.redBright("\n👋 Thanks for using StreakChain. Stay disciplined!\n"));
            process.exit(0);
    }
};


export const restartProgram = async (error?: string) => {
    if (error) console.log(chalk.red(error));

    const { key } = await inquirer.prompt([
        {
            type: "input",
            name: "key",
            message: chalk.gray("Press any key to continue, or ESC to exit..."),
            validate: () => true,
        },
    ]);

    if (key === "\u001B") process.exit(0);
    mainMenu();
};

mainMenu();