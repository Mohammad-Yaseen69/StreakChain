import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from "path"
import os from "os"
import fs from "fs"

type daysLogs = {
    date: string,
    dayNumber: number,
    success: boolean
}

export type Streak = {
    id: number;
    name: string;
    purpose: string;
    createdAt: string;
    xpPerStreak: number;
    daysLogs: daysLogs[];
    numberOfDays: number,
    streakReset?: string,
    isCompleted?: boolean
};
type DB = {
    xp: number;
    level: number;
    streaks: Streak[];
    totalXP: number;
    levelUpHistory: Array<{
        level: number;
        date: string;
        title: string;
    }>;
};


const dbDir = path.join(os.homedir(), '.streakchain');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}
const file = path.join(dbDir, 'db.json');
const adapter = new JSONFile<DB>(file);
const db = new Low<DB>(adapter, {
    xp: 0,
    level: 1,
    streaks: [],
    totalXP: 0,
    levelUpHistory: []
});

export default db