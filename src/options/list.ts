import inquirer from "inquirer";
import chalk from "chalk";
import boxen from "boxen";
import db from "../db/index.ts";
import { mainMenu, restartProgram } from "../index.ts";

const preview = async () => {
    await db.read();

    if (db.data.streaks.length === 0) {
        console.log(chalk.red.bold("⚠️ You don't have any streaks yet."));
        restartProgram();
        return;
    }

    console.clear();
    console.log(chalk.magentaBright.bold("📊 Your Streaks"));

    const { streak } = await inquirer.prompt([
        {
            name: "streak",
            type: "list",
            message: chalk.green.bold("Which streak do you want to preview?"),
            choices: [
                ...db.data.streaks.map((s) => ({ name: s.name, value: s.id })),
                { name: "Go To Main Menu", value: "main" },
            ],
        },
    ]);

    if (typeof streak === "number") {
        const streakData = db.data.streaks.find((s) => s.id === streak);

        if (streakData) {
            console.log(chalk.yellowBright(`🏆  XP per streak: ${streakData?.xpPerStreak || 0}\n`));

            if (!streakData.daysLogs || streakData.daysLogs.length === 0) {
                console.log(chalk.gray("No logs yet. Start logging to see progress!"));
            } else {
                console.log(chalk.greenBright("📅 Your Day Logs:\n"));
                const table = streakData.daysLogs.map((log) => ({
                    Date: log.date,
                    "Day #": log.dayNumber,
                    Status: log.success
                        ? "✅ Success"
                        : "❌ Failed",
                }));

                console.table(table);
            }

            restartProgram();
        }
    } else {
        mainMenu();
    }
};

export default preview;
