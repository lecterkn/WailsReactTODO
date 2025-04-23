package usecase

import (
	"context"
	"wails-react-todo/backend/entity"
	"wails-react-todo/backend/port"
	"wails-react-todo/backend/usecase/input"
	"wails-react-todo/backend/usecase/output"

	"github.com/google/uuid"
)

type TaskUsecase struct {
	taskRepository port.TaskRepository
}

func NewTaskUsecase(taskRepository port.TaskRepository) *TaskUsecase {
	return &TaskUsecase{
		taskRepository,
	}
}

func (u *TaskUsecase) GetTasks() ([]output.TaskOutput, error) {
	taskEntities, err := u.taskRepository.FindAll(context.Background())
	if err != nil {
		return nil, err
	}
	listOutput := []output.TaskOutput{}
	for _, taskEntity := range taskEntities {
		listOutput = append(listOutput, output.TaskOutput{
			Id:        taskEntity.Id.String(),
			Title:     taskEntity.Title,
			Completed: taskEntity.Completed,
			CreatedAt: taskEntity.CreatedAt.String(),
			UpdatedAt: taskEntity.UpdatedAt.String(),
		})
	}
	return listOutput, nil
}

func (u *TaskUsecase) CreateTask(cmd input.TaskCreateInput) error {
	taskEntity, err := entity.NewTaskEntity(cmd.Title)
	if err != nil {
		return err
	}
	return u.taskRepository.Create(context.Background(), taskEntity)
}

func (u *TaskUsecase) CompleteTask(id uuid.UUID) error {
	taskEntity, err := u.taskRepository.FindById(context.Background(), id)
	if err != nil {
		return err
	}
	taskEntity.SetComplete(true)
	return u.taskRepository.Update(context.Background(), taskEntity)
}

func (u *TaskUsecase) UncompleteTask(id uuid.UUID) error {
	taskEntity, err := u.taskRepository.FindById(context.Background(), id)
	if err != nil {
		return err
	}
	taskEntity.SetComplete(false)
	return u.taskRepository.Update(context.Background(), taskEntity)
}

func (u *TaskUsecase) UpdateTitle(id uuid.UUID, cmd input.TaskUpdateInput) error {
	taskEntity, err := u.taskRepository.FindById(context.Background(), id)
	if err != nil {
		return err
	}
	taskEntity.SetTitle(cmd.Title)
	return u.taskRepository.Update(context.Background(), taskEntity)
}

func (u *TaskUsecase) DeleteTask(id uuid.UUID) error {
	taskEntity, err := u.taskRepository.FindById(context.Background(), id)
	if err != nil {
		return err
	}
	return u.taskRepository.Delete(context.Background(), taskEntity)
}
