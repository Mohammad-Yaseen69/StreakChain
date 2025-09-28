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
        console.log(chalk.magentaBright.bold('Your Streaks'))
        const { streak } = await inquirer.prompt([{
            name: "streak",
            type: "list",
            message: chalk.green.bold("Which streaks you wanna preview?"),
            choices: [...db.data.streaks.map((s) => ({ name: s.name, value: s.id })), { name: "Go To Main Menu", value: "main" }]
        }])


        if (typeof streak === "number") {
            const streakData = db.data.streaks.find(s => s.id === streak)

        } else {
            mainMenu()
        }
    }
}

export default list