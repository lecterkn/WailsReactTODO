package database

import (
	"os"

	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

func GetSqlite() *sqlx.DB {
	sqlite, err := sqlx.Open("sqlite3", getDatabaseName())
	if err != nil {
		panic(err.Error())
	}
	_ = migration(sqlite)
	return sqlite
}

func migration(db *sqlx.DB) error {
	db.Exec(`
		CREATE TABLE tasks(
			id BLOB(16) PRIMARY KEY,
			title TEXT NOT NULL,
			completed BOOLEAN NOT NULL,
			created_at DATETIME NOT NULL,
			updated_at DATETIME NOT NULL
		);
	`)
	db.Exec(`
		CREATE TABLE settings(
			id INTEGER PRIMARY KEY CHECK (id = 1),
			dark_theme BOOLEAN NOT NULL
		);
	`)
	db.Exec(`
		INSERT OR IGNORE INTO settings(id, dark_theme)
		VALUES(1, FALSE);
	`)
	return nil
}

func getDatabaseName() string {
	db, ok := os.LookupEnv("TODOAPP_SQLITE_DB_NAME")
	if !ok {
		panic("\"TODOAPP_SQLITE_DB_NAME\" is not set")
	}
	return db
}
