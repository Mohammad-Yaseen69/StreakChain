import inquirer from "inquirer";
import chalk from "chalk"
import db, { Streak } from "../db/index.ts";
import { mainMenu, removeXP, restartProgram } from "../index.ts";

const deleteStreaks = async () => {
    await db.read()

    if (db.data.streaks.length === 0) {
        console.log(chalk.red.bold("You don't have any streaks"))
        restartProgram()
    } else {
        console.clear()
        console.log(chalk.magentaBright.bold('Your Streaks'))
        const { streak } = await inquirer.prompt([{
            name: "streak",
            type: "list",
            message: chalk.green.bold("Which streaks you wanna delete?"),
            choices: [...db.data.streaks.map((s) => ({ name: s.name, value: s.id })), { name: "Go To Main Menu", value: "main" }]
        }])


        if (typeof streak === "number") {
            const streakData: Streak | undefined = db.data.streaks.find(s => s.id === streak)

            if (streakData?.isCompleted) {
                const { agree } = await inquirer.prompt([{
                    type: "confirm",
                    name: "agree",
                    message: "Are you sure you wants to delete this streak? although you have already finished this streak successfully so you won't lose any progress even if you delete it."
                }])
                if (agree === true) {
                    db.data.streaks = db.data.streaks.filter(s => s.id !== streak)
                    await db.write()
                    console.log(chalk.green("Streak Deleted Successfully"))
                    restartProgram()
                } else {
                    deleteStreaks()
                }
            } else {
                const { agree } = await inquirer.prompt([{
                    type: "confirm",
                    name: "agree",
                    message: "Are you sure you wants to delete this streak? you will lost all your XP for this streak."
                }])
                if (agree === true) {
                    const streakXp: any = db.data.streaks.find(s => s.id === streak)?.xpPerStreak
                    await removeXP(streakXp)

                    db.data.streaks = db.data.streaks.filter(s => s.id !== streak)
                    await db.write()
                    console.log(chalk.green("Streak Deleted Successfully"))
                    restartProgram()
                } else {
                    deleteStreaks()
                }
            }
        } else {
            mainMenu()
        }
    }
}

export default deleteStreaks;