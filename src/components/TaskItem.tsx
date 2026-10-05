import type { Task, TaskStatus } from '../types/task'

type TaskItemProps = {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: TaskStatus) => void
}

const priorityLabels = {
  low: 'Rendah',
  medium: 'Sedang',
  high: 'Tinggi',
} as const

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

export function TaskItem({ task, onEdit, onDelete, onStatusChange }: TaskItemProps) {
  const today = new Date()
  const todayDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  const isOverdue = Boolean(task.dueDate && task.dueDate < todayDate && task.status !== 'done')

  return (
    <article className="task-card">
      <div className="task-card-topline">
        <span className={`priority priority-${task.priority}`}>
          <span className="priority-dot" />
          {priorityLabels[task.priority]}
        </span>
        <time dateTime={task.createdAt}>{dateFormatter.format(new Date(task.createdAt))}</time>
      </div>

      <h3>{task.title}</h3>
      {task.dueDate && (
        <div className={`task-due-date${isOverdue ? ' task-overdue' : ''}`}>
          <time dateTime={task.dueDate}>Tenggat: {dateFormatter.format(new Date(`${task.dueDate}T00:00:00`))}</time>
          {isOverdue && <span className="overdue-label">Overdue</span>}
        </div>
      )}
      {task.description && <p className="task-description">{task.description}</p>}

      <div className="task-card-footer">
        <label className="status-control">
          <span className="visually-hidden">Ubah status {task.title}</span>
          <select
            value={task.status}
            onChange={(event) => onStatusChange(task.id, event.target.value as TaskStatus)}
          >
            <option value="todo">Belum dikerjakan</option>
            <option value="in-progress">Sedang dikerjakan</option>
            <option value="done">Selesai</option>
          </select>
        </label>
        <div className="task-actions">
          <button className="text-button" type="button" onClick={() => onEdit(task)}>
            Edit
          </button>
          <button className="text-button delete-button" type="button" onClick={() => onDelete(task.id)}>
            Hapus
          </button>
        </div>
      </div>
    </article>
  )
}
