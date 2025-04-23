package entity

import (
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
)

type TaskEntity struct {
	Id        uuid.UUID `validate:"required"`
	Title     string    `validate:"required,min=1"`
	Completed bool      ``
	CreatedAt time.Time `validate:"required"`
	UpdatedAt time.Time `validate:"required"`
}

func NewTaskEntity(title string) (*TaskEntity, error) {
	id, err := uuid.NewV7()
	if err != nil {
		return nil, err
	}
	taskEntity := TaskEntity{
		Id:        id,
		Title:     title,
		Completed: false,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
	validate := validator.New()
	if err := validate.Struct(taskEntity); err != nil {
		return nil, err
	}
	return &taskEntity, nil
}

func (e *TaskEntity) SetComplete(completed bool) {
	e.Completed = completed
	e.UpdatedAt = time.Now()
}

func (e *TaskEntity) SetTitle(title string) {
	e.Title = title
	e.UpdatedAt = time.Now()
}
