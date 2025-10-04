import inquirer from "inquirer";
import chalk from "chalk";
import { about, createStreak, deleteStreaks, listStreaks, logDay } from "./options/index.ts";
import db, { Streak } from "./db/index.ts";
import { format, subDays } from "date-fns";

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
        missedStreaks.forEach(streak => {
            console.log(chalk.red(`You missed your ${streak.name} streak 😔 ${streak.xpPerStreak > 0 ? `XP: -${streak.xpPerStreak}` : ""}`))
            db.data.xp -= streak.xpPerStreak
            streak.xpPerStreak = 0
            streak.daysLogs = [{
                date: yesterday,
                dayNumber: 0,
                success: false,
            }]
            streak.streakReset = today
        })
    }

    await db.write()
}

export const mainMenu = async () => {
    console.clear();
    await db.read()
    console.log(chalk.magentaBright.bold("\n✨ Welcome to Streak Chain ✨\n"));

    await streakMissCheck()
    console.log(chalk.greenBright(`Your Current ${chalk.yellowBright.bold("XP")}: ${chalk.bold(db.data.xp)}`));
    console.log(chalk.cyanBright(`Your Current ${chalk.magentaBright.bold("Level")}: ${chalk.bold(db.data.level)}\n`));

    const { menu } = await inquirer.prompt([
        {
            type: "list",
            name: "menu",
            message: chalk.blueBright("What do you want to do?"),
            choices: [
                { name: chalk.green("Log Today’s Streak"), value: "log" },
                { name: chalk.yellow("View Your Streaks"), value: "view" },
                { name: chalk.blue("Create a Streak"), value: "create" },
                { name: chalk.red("Delete a Streak"), value: "delete" },
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