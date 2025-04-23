package usecase

import (
	"context"
	"wails-react-todo/backend/port"
	"wails-react-todo/backend/usecase/output"
)

type SettingsUsecase struct {
	settingsRepository port.SettingsRepository
}

func NewSettingsUsecase(
	settingsRepository port.SettingsRepository,
) *SettingsUsecase {
	return &SettingsUsecase{
		settingsRepository,
	}
}

func (u *SettingsUsecase) GetSettings() (*output.SettingsOutput, error) {
	settingsEntity, err := u.settingsRepository.GetSettings(context.Background())
	if err != nil {
		return nil, err
	}
	settingsOutput := output.SettingsOutput(*settingsEntity)
	return &settingsOutput, nil
}

func (u *SettingsUsecase) SetDarkTheme(isDark bool) error {
	settingsEntity, err := u.settingsRepository.GetSettings(context.Background())
	if err != nil {
		return err
	}
	settingsEntity.SetDarkTheme(isDark)
	return u.settingsRepository.SaveSettings(context.Background(), settingsEntity)
}
