import type { Task, TaskStatus } from '../types/task'
import { TaskItem } from './TaskItem'

type TaskListProps = {
  tasks: Task[]
  isFiltering: boolean
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: TaskStatus) => void
}

const columns: { status: TaskStatus; title: string }[] = [
  { status: 'todo', title: 'Belum dikerjakan' },
  { status: 'in-progress', title: 'Sedang dikerjakan' },
  { status: 'done', title: 'Selesai' },
]

export function TaskList({ tasks, isFiltering, onEdit, onDelete, onStatusChange }: TaskListProps) {
  if (isFiltering && tasks.length === 0) {
    return (
      <section className="empty-results" aria-live="polite">
        <h2>Tidak ada tugas yang cocok</h2>
        <p>Coba ubah kata kunci atau pilihan filter.</p>
      </section>
    )
  }

  return (
    <div className="task-board">
      {columns.map((column) => {
        const columnTasks = tasks.filter((task) => task.status === column.status)

        return (
          <section className={`task-column column-${column.status}`} key={column.status}>
            <div className="column-heading">
              <h2>{column.title}</h2>
              <span className="task-count">{columnTasks.length}</span>
            </div>
            <div className="column-content">
              {columnTasks.length > 0 ? (
                columnTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                  />
                ))
              ) : (
                <p className="empty-column">Belum ada tugas</p>
              )}
            </div>
          </section>
        )
      })}
    </div>
  )
}