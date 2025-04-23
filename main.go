package main

import (
	"embed"
	"wails-react-todo/backend/di"

	"github.com/joho/godotenv"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

const (
	TITLE = "Todoアプリ"
)

func main() {
	_ = godotenv.Load()
	app := NewApp()

	// ユースケースを取得
	usecaseSet := di.InitializeUsecaseSet()

	err := wails.Run(&options.App{
		Title:  TITLE,
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []any{
			app,
			// タスクユースケース
			usecaseSet.TaskUsecase,
			// 設定ユースケース
			usecaseSet.SettingsUsecase,
		},
	})
	if err != nil {
		println("Error:", err.Error())
	}
}
