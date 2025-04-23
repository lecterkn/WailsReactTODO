package sqlite

import (
	"context"
	"wails-react-todo/backend/entity"
	"wails-react-todo/backend/port"
	"wails-react-todo/backend/repository/sqlite/model"

	"github.com/jmoiron/sqlx"
)

type SettingsRepositoryImpl struct {
	database *sqlx.DB
}

func NewSettingsRepositoryImpl(database *sqlx.DB) port.SettingsRepository {
	return &SettingsRepositoryImpl{
		database,
	}
}

func (r *SettingsRepositoryImpl) GetSettings(ctx context.Context) (*entity.SettingsEntity, error) {
	query := `
		SELECT dark_theme
		FROM settings
		WHERE id = 1
	`
	settingsModel := model.SettingsModel{}
	err := r.database.Get(&settingsModel, query)
	if err != nil {
		return nil, err
	}
	settingsEntity := entity.SettingsEntity(settingsModel)
	return &settingsEntity, nil
}

func (r *SettingsRepositoryImpl) SaveSettings(ctx context.Context, settingsEntity *entity.SettingsEntity) error {
	query := `
		UPDATE settings 
		SET dark_theme = :dark_theme
		WHERE id = 1
	`
	_, err := r.database.NamedExec(query, map[string]any{
		"dark_theme": settingsEntity.IsDarkTheme,
	})
	return err
}
