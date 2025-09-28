import chalk from "chalk";
import boxen from "boxen";


const about = () => {
    console.clear();

    console.log(
        boxen(chalk.magentaBright.bold("💡 About StreakChain 💡"), {
            padding: .5,
            margin: 0,
            borderStyle: "round",
            borderColor: "magenta"
        })
    );

    // Description
    const description = `
StreakChain is a CLI tool built to help you stay ${chalk.greenBright.bold("consistent")} 
and ${chalk.yellowBright.bold("disciplined")}. I created this tool for myself because I used to struggle 
with consistency and had some bad habits. Thanks to StreakChain's gamification system, 
I can trick my brain to stay consistent and build discipline over time.
`;

    console.log(
        boxen(chalk.whiteBright(description), {
            padding: .5,
            margin: 0,
            borderStyle: "single",
            borderColor: "cyan"
        })
    );

    // Motivation
    const motivation = `
✨ If you also struggle with commitment or sticking to your goals, 
StreakChain has your back!
`;
    console.log(
        boxen(chalk.cyanBright(motivation), {
            padding: .5,
            margin: 0,
            borderStyle: "round",
            borderColor: "yellow"
        })
    );

    // Rules
    const rules = `
📜 Rules of StreakChain:
.5. Log your streak every day (no excuses).
2. Missing a day resets your streak to 0 and you lose all XP from that streak.
3. Every log earns you XP — consistency = growth.
4. Level up as you accumulate XP.
5. The goal is simple: build discipline, one streak at a time.
`;

    console.log(
        boxen(chalk.green(rules), {
            padding: .5,
            margin: 0,
            borderStyle: "classic",
            borderColor: "green"
        })
    );

    const footer = `
👨‍💻 Created by: ${chalk.bold("Muhammad Yaseen")}
🔗 Connect with me: ${chalk.underline("www.linkedin.com/in/mohammad-yaseen.506")}
`;
    console.log(
        boxen(chalk.yellowBright(footer), {
            padding: .5,
            margin: 0,
            borderStyle: "round",
            borderColor: "blue"
        })
    );
};

export default about;
