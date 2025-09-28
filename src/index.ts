import inquirer from "inquirer";
import chalk from "chalk";
import { about, createStreak, listStreaks } from "./options/index.ts";


const mainMenu = async () => {
    console.clear();

    console.log(chalk.magentaBright.bold("\n✨ Welcome to Streak Chain ✨\n"));
    console.log(chalk.greenBright(`Your Current ${chalk.yellowBright.bold("XP")}: ${chalk.bold(0)}`));
    console.log(chalk.cyanBright(`Your Current ${chalk.magentaBright.bold("Level")}: ${chalk.bold(1)}\n`));

    const { menu } = await inquirer.prompt([
        {
            type: "list",
            name: "menu",
            message: chalk.blueBright("What do you want to do?"),
            choices: [
                { name: chalk.green("Log Today’s Streak"), value: "log" },
                { name: chalk.yellow("View Your Streaks"), value: "view" },
                { name: chalk.gray("Create a Streak"), value: "create" },
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