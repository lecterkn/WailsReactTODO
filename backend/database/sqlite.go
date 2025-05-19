package database

import (
	"fmt"
	"os"
	"path/filepath"
	"runtime"

	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

func GetSqlite() *sqlx.DB {
	sqlite, err := sqlx.Open("sqlite3", getDatabasePath())
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

func getDatabasePath() string {
	mode, ok := os.LookupEnv("TODOAPP_MODE")
	if !ok || mode != "DEVELOPMENT" {
		db, err := getProdDB()
		if err != nil {
			panic(err)
		}
		return db
	}
	return getDevDB()
}

func getDevDB() string {
	return "__todo.sqlite"
}

func getProdDB() (string, error) {
	var dir string
	var err error

	if runtime.GOOS == "windows" {
		dir = os.Getenv("APPDATA")
		if dir == "" {
			return "", fmt.Errorf("APPDATA環境変数が設定されていません")
		}
		dir = filepath.Join(dir, "todo_app")
	} else {
		home := os.Getenv("HOME")
		if home == "" {
			return "", fmt.Errorf("HOME環境変数が設定されていません")
		}
		dir = filepath.Join(home, ".config", "todo_app")
	}

	// ディレクトリを作成（存在する場合は何もしない）
	if err = os.MkdirAll(dir, 0755); err != nil {
		return "", fmt.Errorf("ディレクトリ作成失敗: %w", err)
	}

	dbPath := filepath.Join(dir, "__todo.sqlite")
	return dbPath, nil
}
