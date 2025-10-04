import inquirer from "inquirer";
import chalk from "chalk"
import db from "../db/index.ts";
import { mainMenu, restartProgram } from "../index.ts";

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
            } else {
                const { success } = await inquirer.prompt([
                    {
                        name: "success",
                        type: "confirm",
                        message: chalk.cyan("Did you successfully follow this streak today?")
                    }
                ])

                if (success) {
                    const lastDay = streakData?.daysLogs?.[streakData.daysLogs.length - 1];

                    streakData?.daysLogs?.push({
                        date: today,
                        dayNumber: lastDay ? lastDay.dayNumber + 1 : 1,
                        success: true
                    })
                    streakData!.xpPerStreak += 10
                    db.data.xp += 10
                    await db.write()
                    console.log(chalk.greenBright("✅ Day logged successfully You have gained 10 xp! Keep it up!"))
                    restartProgram()
                } else {
                    streakData!.daysLogs = [{
                        date: today,
                        dayNumber: 0,
                        success: false,
                    }]
                    streakData!.xpPerStreak = 0
                    streakData!.streakReset = today

                    await db.write()

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