import type { TaskPriorityFilter, TaskStatusFilter } from '../types/task'

type TaskFiltersProps = {
  searchQuery: string
  statusFilter: TaskStatusFilter
  priorityFilter: TaskPriorityFilter
  onSearchChange: (query: string) => void
  onStatusChange: (status: TaskStatusFilter) => void
  onPriorityChange: (priority: TaskPriorityFilter) => void
}

export function TaskFilters({
  searchQuery,
  statusFilter,
  priorityFilter,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
}: TaskFiltersProps) {
  return (
    <section className="task-filters" aria-label="Cari dan filter tugas">
      <label className="filter-search">
        <span className="visually-hidden">Cari berdasarkan judul atau deskripsi</span>
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Cari judul atau deskripsi..."
        />
      </label>

      <label className="filter-select">
        <span className="visually-hidden">Filter berdasarkan status</span>
        <select
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value as TaskStatusFilter)}
        >
          <option value="all">Semua status</option>
          <option value="todo">Belum dikerjakan</option>
          <option value="in-progress">Sedang dikerjakan</option>
          <option value="done">Selesai</option>
        </select>
      </label>

      <label className="filter-select">
        <span className="visually-hidden">Filter berdasarkan prioritas</span>
        <select
          value={priorityFilter}
          onChange={(event) => onPriorityChange(event.target.value as TaskPriorityFilter)}
        >
          <option value="all">Semua prioritas</option>
          <option value="low">Prioritas rendah</option>
          <option value="medium">Prioritas sedang</option>
          <option value="high">Prioritas tinggi</option>
        </select>
      </label>
    </section>
  )
}