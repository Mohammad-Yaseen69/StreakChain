import inquirer from "inquirer";
import chalk from "chalk"
import db from "../db/index.ts";
import { mainMenu, restartProgram, addXP, removeXP } from "../index.ts";

const list = async () => {
    await db.read()

    if (db.data.streaks.length === 0) {
        console.log(chalk.red.bold("You don't have any streaks"))
        restartProgram()
    } else {
        console.clear()
        console.log(chalk.magentaBright.bold('✨ Log Your Day ✨'))
        const { streak } = await inquirer.prompt([{
            name: "streak",
            type: "list",
            message: chalk.green.bold("Select a streak to check-in today:"),
            choices: [...db.data.streaks.map((s) => ({ name: s.name, value: s.id })), { name: "Go To Main Menu", value: "main" }]
        }])


        if (typeof streak === "number") {
            const streakData = db.data.streaks.find(s => s.id === streak)
            const today = new Date().toISOString().split("T")[0];
            
            if (streakData?.daysLogs.find(log => log.date === today)) {
                console.log(chalk.red("⚠️  You've already checked in today for this streak!"))
                restartProgram()
            } else if (streakData?.isCompleted) {
                console.log(chalk.green("You have already completed this streak!"))
            } else {
                const { success } = await inquirer.prompt([
                    {
                        name: "success",
                        type: "confirm",
                        message: chalk.cyan("Did you successfully follow this streak today?")
                    }
                ])

                const lastDay = streakData?.daysLogs?.[streakData.daysLogs.length - 1];
                const currentStreak = lastDay ? lastDay.dayNumber + 1 : 1;
                if (success) {

                    streakData?.daysLogs?.push({
                        date: today,
                        dayNumber: lastDay ? lastDay.dayNumber + 1 : 1,
                        success: true
                    })
                    // Calculate XP with streak bonus
                    let xpGained = 10;

                    // Bonus XP for milestone streaks
                    if (currentStreak === 7) {
                        xpGained += 20; // 7-day milestone bonus
                        console.log(chalk.yellowBright("🎉 7-day streak milestone! +20 bonus XP!"));
                    } else if (currentStreak === 30) {
                        xpGained += 50; // 30-day milestone bonus
                        console.log(chalk.yellowBright("🏆 30-day streak milestone! +50 bonus XP!"));
                    } else if (currentStreak === 100) {
                        xpGained += 100; // 100-day milestone bonus
                        console.log(chalk.yellowBright("👑 100-day streak milestone! +100 bonus XP!"));
                    } else if (currentStreak % 10 === 0 && currentStreak > 0) {
                        xpGained += 10; // Every 10 days bonus
                        console.log(chalk.cyanBright(`🎯 ${currentStreak}-day streak! +10 bonus XP!`));
                    }

                    streakData!.xpPerStreak += xpGained

                    // Use the new XP system
                    const leveledUp = await addXP(xpGained);
                    console.log(chalk.greenBright(`✅ Day logged successfully! You have gained ${xpGained} XP! Keep it up!`))
                    if (leveledUp) {
                        console.log(chalk.yellowBright("🎉 Level up! Check your new level in the main menu!"));
                    }
                    if (currentStreak === streakData?.numberOfDays) {
                        console.log(chalk.bold.greenBright("🎉 Congrats! You’ve successfully completed this streak. Keep that fire going!"))
                        streakData.isCompleted = true
                    }
                    restartProgram()
                } else {
                    streakData!.daysLogs = [{
                        date: today,
                        dayNumber: 0,
                        success: false,
                    }]

                    await removeXP(streakData!.xpPerStreak);
                    streakData!.xpPerStreak = 0
                    streakData!.streakReset = today

                    console.log(chalk.red("Oops! you failed this streak as per rule you have lost all your xp gain from this streak and now has to start from day one again."))
                    restartProgram()
                }
            }

        } else {
            mainMenu()
        }
    }
}

export default list