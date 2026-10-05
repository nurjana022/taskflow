import { useState } from 'react'
import type { Task, TaskInput, TaskStatus } from '../types/task'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])

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