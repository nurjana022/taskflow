import { useEffect, useState } from 'react'
import type { Task, TaskInput, TaskStatus } from '../types/task'

const TASKS_STORAGE_KEY = 'taskflow-tasks'
const taskStatuses = ['todo', 'in-progress', 'done']
const taskPriorities = ['low', 'medium', 'high']

function isTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) return false

  const task = value as Record<string, unknown>

  return (
    typeof task.id === 'string' &&
    typeof task.title === 'string' &&
    typeof task.description === 'string' &&
    taskStatuses.includes(task.status as string) &&
    taskPriorities.includes(task.priority as string) &&
    typeof task.createdAt === 'string'
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
