import chalk from "chalk";

const about = () => {
    console.log(chalk.magentaBright.bold("\n💡 About StreakChain 💡\n"));
    console.log(chalk.whiteBright(
        "StreakChain is a CLI tool built to help you stay " +
        chalk.greenBright.bold("consistent") +
        " and " +
        chalk.yellowBright.bold("disciplined") +
        ".\n"
    ));

    console.log(chalk.cyanBright("✨ If you struggle with commitment or sticking to your goals, StreakChain has your back.\n"));

    console.log(chalk.whiteBright("📜 Rules of StreakChain:"));
    console.log(chalk.green("1. Log your streak every day (no excuses)."));
    console.log(chalk.green("2. Missing a day resets your streak to 0 and loses all your gain XP from that streak ."));
    console.log(chalk.green("3. Every log earns you XP — consistency = growth."));
    console.log(chalk.green("4. Level up as you grow your XP."));
    console.log(chalk.green("5. The goal is simple: build discipline, one streak at a time.\n"));

    console.log(chalk.yellowBright("👨‍💻 Created by: ") + chalk.bold("Muhammad Yaseen"));
    console.log(chalk.blueBright("🔗 Connect with me: ") + chalk.underline("www.linkedin.com/in/mohammad-yaseen106\n"));

}


export default about