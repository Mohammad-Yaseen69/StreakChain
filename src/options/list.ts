import inquirer from "inquirer";
import chalk from "chalk"
import db from "../db/index.ts";

const list = async () => {
    console.clear()
    console.log(chalk.magentaBright.bold('Your Streaks'))
    await db.read()

    const { streak } = await inquirer.prompt([{
        name: "streak",
        type: "list",
        message: chalk.green.bold("Select a list for further options:"),
        choices: [...db.data.streaks.map((s) => ({ name: s.name, value: s.id })), {name: "Go To Main Menu", value: "main"}]
    }])


    console.log(streak)

}

export default list