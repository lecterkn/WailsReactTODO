package sqlite

import (
	"context"
	"wails-react-todo/backend/entity"
	"wails-react-todo/backend/port"
	"wails-react-todo/backend/repository/sqlite/model"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
)

type TaskRepositoryImpl struct {
	database *sqlx.DB
}

func NewTaskRepositoryImpl(database *sqlx.DB) port.TaskRepository {
	return &TaskRepositoryImpl{
		database,
	}
}

func (r *TaskRepositoryImpl) Create(ctx context.Context, taskEntity *entity.TaskEntity) error {
	query := `
		INSERT INTO tasks (id, title, completed, created_at, updated_at)
		VALUES (:id, :title, :completed, :createdAt, :updatedAt)
	`
	_, err := r.database.NamedExec(query, map[string]any{
		"id":        taskEntity.Id[:],
		"title":     taskEntity.Title,
		"completed": taskEntity.Completed,
		"createdAt": taskEntity.CreatedAt,
		"updatedAt": taskEntity.UpdatedAt,
	})
	return err
}

func (r *TaskRepositoryImpl) Update(ctx context.Context, taskEntity *entity.TaskEntity) error {
	query := `
		UPDATE tasks
		SET title = :title, completed = :completed, updated_at = :updatedAt
		WHERE id = :id
	`
	_, err := r.database.NamedExec(query, map[string]any{
		"id":        taskEntity.Id[:],
		"title":     taskEntity.Title,
		"completed": taskEntity.Completed,
		"updatedAt": taskEntity.UpdatedAt,
	})
	return err
}

func (r *TaskRepositoryImpl) Delete(ctx context.Context, taskEntity *entity.TaskEntity) error {
	query := `
		DELETE FROM tasks
		WHERE id = :id
	`
	_, err := r.database.NamedExec(query, map[string]any{
		"id": taskEntity.Id[:],
	})
	return err
}

func (r *TaskRepositoryImpl) FindById(ctx context.Context, id uuid.UUID) (*entity.TaskEntity, error) {
	query := `
		SELECT id, title, completed, created_at, updated_at
		FROM tasks
		WHERE id = ?
	`
	taskModel := model.TaskModel{}
	err := r.database.Get(&taskModel, query, id[:])
	if err != nil {
		return nil, err
	}
	return r.toEntity(&taskModel)
}

func (r *TaskRepositoryImpl) FindAll(ctx context.Context) ([]entity.TaskEntity, error) {
	query := `
		SELECT id, title, completed, created_at, updated_at
		FROM tasks
	`
	taskModels := []model.TaskModel{}
	err := r.database.Select(&taskModels, query)
	if err != nil {
		return nil, err
	}
	return r.toEntities(taskModels)
}

func (r *TaskRepositoryImpl) toEntity(taskModel *model.TaskModel) (*entity.TaskEntity, error) {
	id, err := uuid.FromBytes(taskModel.Id)
	if err != nil {
		return nil, err
	}
	return &entity.TaskEntity{
		Id:        id,
		Title:     taskModel.Title,
		Completed: taskModel.Completed,
		CreatedAt: taskModel.CreatedAt,
		UpdatedAt: taskModel.UpdatedAt,
	}, nil
}

func (r *TaskRepositoryImpl) toEntities(taskModels []model.TaskModel) ([]entity.TaskEntity, error) {
	taskEntities := []entity.TaskEntity{}
	for _, taskModel := range taskModels {
		taskEntity, err := r.toEntity(&taskModel)
		if err != nil {
			return nil, err
		}
		taskEntities = append(taskEntities, *taskEntity)
	}
	return taskEntities, nil
}
