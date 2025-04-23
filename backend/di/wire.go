//go:build wireinject
// +build wireinject

package di

import (
	"wails-react-todo/backend/database"
	sqliteRepo "wails-react-todo/backend/repository/sqlite"
	"wails-react-todo/backend/usecase"

	"github.com/google/wire"
)

var databaseSet = wire.NewSet(
	database.GetSqlite,
)

var repositorySet = wire.NewSet(
	sqliteRepo.NewTaskRepositoryImpl,
	sqliteRepo.NewSettingsRepositoryImpl,
)

var usecaseSet = wire.NewSet(
	usecase.NewTaskUsecase,
	usecase.NewSettingsUsecase,
)

type UsecaseSet struct {
	TaskUsecase     *usecase.TaskUsecase
	SettingsUsecase *usecase.SettingsUsecase
}

func InitializeUsecaseSet() *UsecaseSet {
	wire.Build(
		databaseSet,
		repositorySet,
		usecaseSet,
		wire.Struct(new(UsecaseSet), "*"),
	)
	return nil
}
