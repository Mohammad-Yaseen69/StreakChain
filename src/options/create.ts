import inquirer from "inquirer"
import chalk from "chalk"
import db from "../db/index.ts"
import { restartProgram } from "../index.ts"

const createStreak = async () => {
    console.clear()
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
        await db.read();

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
        console.log(chalk.green("✅ Your Streak has been created you can check your streak by clicking View Streaks >> Your Streak Name"))
        restartProgram()
    } else {
        console.log(chalk.red("Please provide the required fields"))
    }
}

export default createStreak