import './App.css'
import { useState } from 'react'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import { useTasks } from './hooks/useTasks'
import type { Task, TaskInput } from './types/task'

function App() {
  const { tasks, addTask, editTask, deleteTask, changeTaskStatus } = useTasks()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  function openNewTaskForm() {
    setEditingTask(null)
    setIsFormOpen(true)
  }

  function openEditTaskForm(task: Task) {
    setEditingTask(task)
    setIsFormOpen(true)
  }

  function closeTaskForm() {
    setIsFormOpen(false)
    setEditingTask(null)
  }

  function saveTask(input: TaskInput) {
    if (editingTask) {
      editTask(editingTask.id, input)
    } else {
      addTask(input)
    }

    closeTaskForm()
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="TaskFlow beranda">
          <span className="brand-mark" aria-hidden="true">T</span>
          <span>taskflow</span>
        </a>
        <span className="local-state-label"><span /> Ruang kerja pribadi</span>
      </header>

      <section className="workspace" aria-labelledby="page-title">
        <div className="page-heading">
          <div>
            <p className="eyebrow">RUANG KERJA</p>
            <h1 id="page-title">Daftar tugas</h1>
            <p className="page-subtitle">Atur pekerjaanmu, satu langkah dalam satu waktu.</p>
          </div>
          <button className="button button-primary add-task-button" type="button" onClick={openNewTaskForm}>
            <span aria-hidden="true">+</span> Tambah tugas
          </button>
        </div>

        <div className="board-summary" aria-live="polite">
          <span className="summary-marker" />
          {tasks.length === 0 ? 'Belum ada tugas' : `${tasks.length} tugas`}
        </div>

        {isFormOpen && (
          <div className="form-backdrop" role="presentation" onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeTaskForm()
          }}>
            <TaskForm task={editingTask} onSave={saveTask} onCancel={closeTaskForm} />
          </div>
        )}

        <TaskList
          tasks={tasks}
          onEdit={openEditTaskForm}
          onDelete={deleteTask}
          onStatusChange={changeTaskStatus}
        />
      </section>
      <footer className="app-footer">TaskFlow <span>·</span> Fokus pada yang penting</footer>
    </main>
  )
}

export default App
