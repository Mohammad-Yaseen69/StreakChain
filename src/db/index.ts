import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from "path"

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
    streakReset?: string
};
type DB = {
    xp: number;
    level: number;
    streaks: Streak[]
};


const file = path.resolve('./src/db/db.json');
const adapter = new JSONFile<DB>(file);
const db = new Low<DB>(adapter, { xp: 0, level: 1, streaks: [] });

export default db