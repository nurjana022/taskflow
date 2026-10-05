import { useState, type FormEvent } from 'react'
import type { Task, TaskInput, TaskPriority, TaskStatus } from '../types/task'

type TaskFormProps = {
  task: Task | null
  onSave: (input: TaskInput) => void
  onCancel: () => void
}

const emptyTask: TaskInput = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  dueDate: undefined,
}

export function TaskForm({ task, onSave, onCancel }: TaskFormProps) {
  const [form, setForm] = useState<TaskInput>(task ?? emptyTask)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const input = { ...form, title: form.title.trim(), description: form.description.trim() }
    if (!input.dueDate) delete input.dueDate
    onSave(input)
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <p className="eyebrow">{task ? 'PERBARUI RINCIAN' : 'TUGAS BARU'}</p>
          <h2>{task ? 'Edit tugas' : 'Tambahkan tugas'}</h2>
        </div>
        <button className="icon-button close-button" type="button" onClick={onCancel} aria-label="Tutup form">
          ×
        </button>
      </div>

      <label className="field">
        <span>Judul</span>
        <input
          autoFocus
          required
          maxLength={120}
          value={form.title}
          onChange={(event) => setForm({ ...form, title: event.target.value })}
          placeholder="Contoh: Siapkan materi presentasi"
        />
      </label>

      <label className="field">
        <span>Deskripsi <span className="optional">(opsional)</span></span>
        <textarea
          rows={3}
          maxLength={500}
          value={form.description}
          onChange={(event) => setForm({ ...form, description: event.target.value })}
          placeholder="Tambahkan detail atau catatan"
        />
      </label>

      <label className="field">
        <span>Tenggat <span className="optional">(opsional)</span></span>
        <input
          type="date"
          value={form.dueDate ?? ''}
          onChange={(event) => setForm({ ...form, dueDate: event.target.value || undefined })}
        />
      </label>

      <div className="field-row">
        <label className="field">
          <span>Status</span>
          <select
            value={form.status}
            onChange={(event) => setForm({ ...form, status: event.target.value as TaskStatus })}
          >
            <option value="todo">Belum dikerjakan</option>
            <option value="in-progress">Sedang dikerjakan</option>
            <option value="done">Selesai</option>
          </select>
        </label>
        <label className="field">
          <span>Prioritas</span>
          <select
            value={form.priority}
            onChange={(event) => setForm({ ...form, priority: event.target.value as TaskPriority })}
          >
            <option value="low">Rendah</option>
            <option value="medium">Sedang</option>
            <option value="high">Tinggi</option>
          </select>
        </label>
      </div>

      <div className="form-actions">
        <button className="button button-secondary" type="button" onClick={onCancel}>
          Batal
        </button>
        <button className="button button-primary" type="submit">
          {task ? 'Simpan perubahan' : 'Tambah tugas'}
        </button>
      </div>
    </form>
  )
}
