package entity

type SettingsEntity struct {
	IsDarkTheme bool
}

func (e *SettingsEntity) SetDarkTheme(isDark bool) {
	e.IsDarkTheme = isDark
}
