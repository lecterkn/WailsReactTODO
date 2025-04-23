package port

import (
	"context"
	"wails-react-todo/backend/entity"
)

type SettingsRepository interface {
	GetSettings(context.Context) (*entity.SettingsEntity, error)
	SaveSettings(context.Context, *entity.SettingsEntity) error
}
