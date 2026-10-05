import { useEffect, useState } from 'react'
import type { Task, TaskInput, TaskStatus } from '../types/task'

const TASKS_STORAGE_KEY = 'taskflow-tasks'
const taskStatuses = ['todo', 'in-progress', 'done']
const taskPriorities = ['low', 'medium', 'high']

function isTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) return false

  const task = value as Record<string, unknown>

  const hasValidDueDate =
    !('dueDate' in task) || task.dueDate === undefined || isValidDate(task.dueDate)

  return (
    typeof task.id === 'string' &&
    typeof task.title === 'string' &&
    typeof task.description === 'string' &&
    taskStatuses.includes(task.status as string) &&
    taskPriorities.includes(task.priority as string) &&
    typeof task.createdAt === 'string' &&
    hasValidDueDate
  )
}

function isValidDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false

  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(0)
  date.setUTCHours(0, 0, 0, 0)
  date.setUTCFullYear(year, month - 1, day)

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  )
}

function loadTasks(): Task[] {
  try {
    const storedTasks = window.localStorage.getItem(TASKS_STORAGE_KEY)
    if (storedTasks === null) return []

    const parsedTasks: unknown = JSON.parse(storedTasks)
    return Array.isArray(parsedTasks) && parsedTasks.every(isTask) ? parsedTasks : []
  } catch {
    return []
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)

  useEffect(() => {
    try {
      window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
    } catch {
      // Keep the app usable when browser storage is unavailable.
    }
  }, [tasks])

  function addTask(input: TaskInput) {
    const task: Task = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }

    setTasks((currentTasks) => [task, ...currentTasks])
  }

  function editTask(id: string, input: TaskInput) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === id ? { ...task, ...input } : task)),
    )
  }

  function deleteTask(id: string) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
  }

  function changeTaskStatus(id: string, status: TaskStatus) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === id ? { ...task, status } : task)),
    )
  }

  return { tasks, addTask, editTask, deleteTask, changeTaskStatus }
}
