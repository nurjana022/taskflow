export type TaskStatus = 'todo' | 'in-progress' | 'done'

export type TaskPriority = 'low' | 'medium' | 'high'

export type TaskStatusFilter = TaskStatus | 'all'

export type TaskPriorityFilter = TaskPriority | 'all'

export type Task = {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  createdAt: string
  dueDate?: string
}

export type TaskInput = Omit<Task, 'id' | 'createdAt'>
