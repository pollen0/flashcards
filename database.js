// database.js
import * as SQLite from 'expo-sqlite';

const database_name = "flashcards.db";
let db;

export const openDatabase = () => {
  db = SQLite.openDatabase(database_name, "1.0", "SQLite Flashcards Database", 200000, () => {
    console.log("Database opened");
    createTables();
  }, (error) => {
    console.error("ERROR: " + error);
  });
};

const createTables = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS folders (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);",
      [],
      () => { console.log("Folders table created"); },
      (tx, error) => { console.error("Error creating folders table: " + error); }
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS flashcards (id INTEGER PRIMARY KEY AUTOINCREMENT, frontTitle TEXT, frontValue TEXT, backTitle TEXT, backValue TEXT, reviewDate TEXT, folderId INTEGER, FOREIGN KEY (folderId) REFERENCES folders (id));",
      [],
      () => { console.log("Flashcards table created"); },
      (tx, error) => { console.error("Error creating flashcards table: " + error); }
    );
  });
};

export const addFolder = (name, successCallback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO folders (name) VALUES (?);",
      [name],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          successCallback(results.insertId);
        }
      },
      (tx, error) => { console.error("Error adding folder: " + error); }
    );
  });
};

export const addFlashcard = (frontTitle, frontValue, backTitle, backValue, folderId, successCallback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO flashcards (frontTitle, frontValue, backTitle, backValue, reviewDate, folderId) VALUES (?, ?, ?, ?, ?, ?);",
      [frontTitle, frontValue, backTitle, backValue, new Date().toISOString(), folderId],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          successCallback(results.insertId);
        }
      },
      (tx, error) => { console.error("Error adding flashcard: " + error); }
    );
  });
};

export const getFolders = (successCallback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM folders;",
      [],
      (tx, results) => {
        const rows = results.rows;
        let folders = [];
        for (let i = 0; i < rows.length; i++) {
          folders.push(rows.item(i));
        }
        successCallback(folders);
      },
      (tx, error) => { console.error("Error getting folders: " + error); }
    );
  });
};

export const getFlashcards = (folderId, successCallback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM flashcards WHERE folderId = ?;",
      [folderId],
      (tx, results) => {
        const rows = results.rows;
        let flashcards = [];
        for (let i = 0; i < rows.length; i++) {
          flashcards.push(rows.item(i));
        }
        successCallback(flashcards);
      },
      (tx, error) => { console.error("Error getting flashcards: " + error); }
    );
  });
};

export const logDatabaseContents = () => {
  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM folders;', [], (tx, results) => {
      console.log('Folders:', results.rows._array);
    });
    tx.executeSql('SELECT * FROM flashcards;', [], (tx, results) => {
      console.log('Flashcards:', results.rows._array);
    });
  });
};
