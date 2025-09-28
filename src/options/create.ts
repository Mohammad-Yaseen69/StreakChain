import inquirer from "inquirer"
import chalk from "chalk"
import db from "../db/index.ts"
import { restartProgram } from "../index.ts"
import boxen from "boxen"

const createStreak = async () => {
    console.clear()
    await db.read();

    if (db.data.streaks.length >= 3) {
        console.log(chalk.red.bold("You can only have 3 streaks at a time!"))
        restartProgram()
    } else {
        console.log(chalk.magentaBright.bold('Create your Streak'))
        const { name, days, purpose } = await inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: chalk.green("Enter the name of your streak:"),
                required: true
            },
            {
                name: "purpose",
                type: "input",
                message: chalk.green("Define the purpose of your streak (be specific):"),
                required: true
            },
            {
                name: "days",
                type: "number",
                message: chalk.green("Enter the number of days your streak will last:"),
                required: true,
                min: 3,
                max: 400
            }
        ])


        if (name && days && purpose) {
            const today = new Date().toISOString().split("T")[0];


            if (!db.data) {
                db.data = { xp: 0, level: 1, streaks: [] };
            }

            db.data.streaks.push({
                id: Date.now(),
                name: name,
                purpose: purpose,
                createdAt: today,
                daysLogs: [],
                xpPerStreak: 0,
                numberOfDays: days
            })

            await db.write()
            const message = chalk.cyanBright(`
                ✅ Your Streak "Workout" has been created successfully!
                🔥 Remember: consistency beats motivation —
                every day you log this streak, you're leveling up your discipline!
                Keep pushing, you've got this! 💪
                `);
            console.log(boxen(message, {
                padding: 1,
                margin: 1,
                borderStyle: "double",
                borderColor: "magenta",
                backgroundColor: "black"
            }));
            restartProgram()
        } else {
            console.log(chalk.red("Please provide the required fields"))
        }
    }
}

export default createStreak