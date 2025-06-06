// Code generated by Wire. DO NOT EDIT.

//go:generate go run -mod=mod github.com/google/wire/cmd/wire
//go:build !wireinject
// +build !wireinject

package di

import (
	"github.com/google/wire"
	"wails-react-todo/backend/database"
	"wails-react-todo/backend/repository/sqlite"
	"wails-react-todo/backend/usecase"
)

// Injectors from wire.go:

func InitializeUsecaseSet() *UsecaseSet {
	db := database.GetSqlite()
	taskRepository := sqlite.NewTaskRepositoryImpl(db)
	taskUsecase := usecase.NewTaskUsecase(taskRepository)
	settingsRepository := sqlite.NewSettingsRepositoryImpl(db)
	settingsUsecase := usecase.NewSettingsUsecase(settingsRepository)
	diUsecaseSet := &UsecaseSet{
		TaskUsecase:     taskUsecase,
		SettingsUsecase: settingsUsecase,
	}
	return diUsecaseSet
}

// wire.go:

var databaseSet = wire.NewSet(database.GetSqlite)

var repositorySet = wire.NewSet(sqlite.NewTaskRepositoryImpl, sqlite.NewSettingsRepositoryImpl)

var usecaseSet = wire.NewSet(usecase.NewTaskUsecase, usecase.NewSettingsUsecase)

type UsecaseSet struct {
	TaskUsecase     *usecase.TaskUsecase
	SettingsUsecase *usecase.SettingsUsecase
}
