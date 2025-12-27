import fs from "fs";
import os from "os";
import path from "path"

export const setupWindowsAutoStart = () => {
    if (process.platform !== "win32") return;

    const startupDir = path.join(
        os.homedir(),
        "AppData",
        "Roaming",
        "Microsoft",
        "Windows",
        "Start Menu",
        "Programs",
        "Startup"
    );

    const batPath = path.join(startupDir, "streakchain.bat");

    if (fs.existsSync(batPath)) return;

    const batContent = `@echo off
cmd /k streakchain
`;

    fs.writeFileSync(batPath, batContent, "utf8");
};
