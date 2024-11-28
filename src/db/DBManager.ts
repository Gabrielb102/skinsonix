import sqlite3 from 'sqlite3';

class DBManager {

    static init() {
        const db = new sqlite3.Database('./src/db/skinsonix.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err: Error | null) => {
            if (err) {
                console.log("Error opening / creating database");
                console.error(err.message);
            } else {
                console.log('Connected to the skinsonix database.');
                this.createTables(db);
                this.checkDefaultData(db, (exists: boolean) => {
                    if (!exists) {
                        console.log("Inserting default data");
                        this.insertDefaultData(db);
                    }
                });
            }
        });
        return db;
    }

    static createTables(db: sqlite3.Database): void {
        db.exec(`
            CREATE TABLE IF NOT EXISTS treatments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT NULL
            );

            CREATE TABLE IF NOT EXISTS treatment_phases (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                treatment_id INTEGER NOT NULL,
                area TEXT NOT NULL,
                duration INTEGER DEFAULT 20,
                red_intensity INTEGER DEFAULT 100,
                blue_intensity INTEGER DEFAULT 100,
                volume INTEGER DEFAULT 50,
                treatment_pattern TEXT DEFAULT 'sine_increasing',
                phase_order INTEGER NOT NULL,
                FOREIGN KEY (treatment_id) REFERENCES treatments(id)
            );
        `, (err: Error | null) => {
            if (err) {
                console.error("Error creating tables:", err.message);
            }
        });
    }

    static insertDefaultData(db: sqlite3.Database): void {
        db.exec(`
            INSERT INTO treatments (id, name, description)
            VALUES (1, 'SkinSonix Facial', 'The original SkinSonix treatment, a relaxing combination of low frequency waves and LED light exposure. A great starting point for those new to low frequency and LED treatments, and a timeless option for experienced individuals.');

            INSERT INTO treatment_phases (treatment_id, area, phase_order)
            VALUES (1, 'up_right_side', 1),
                   (1, 'forehead', 2),
                   (1, 'up_left_side', 3),
                   (1, 'left_jaw', 4),
                   (1, 'chin', 5),
                   (1, 'right_jaw', 6),
                   (1, 'up_lip', 7),
                   (1, 'nose', 8),
                   (1, 'left_neck', 9),
                   (1, 'right_neck', 10);
        `, (err: Error | null) => {
            if (err) {
                console.error("Error inserting default data:", err.message);
            }
        });
    }

    static checkDefaultData(db: sqlite3.Database, callback: (exists: boolean) => void): void {
        db.get("SELECT * FROM treatments", (err: Error | null, row: any) => {
            if (err) {
                console.error(err.message);
                callback(false);
            } else {
                callback(!!row);
            }
        });
    }
}

export default DBManager;