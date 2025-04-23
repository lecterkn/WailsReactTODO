package port

import (
	"context"
	"wails-react-todo/backend/entity"

	"github.com/google/uuid"
)

type TaskRepository interface {
	FindById(context.Context, uuid.UUID) (*entity.TaskEntity, error)
	FindAll(context.Context) ([]entity.TaskEntity, error)
	Create(context.Context, *entity.TaskEntity) error
	Update(context.Context, *entity.TaskEntity) error
	Delete(context.Context, *entity.TaskEntity) error
}
