// Archivo para revisión de uso de variable de entorno NUXT_PUBLIC_BACKEND_HOST
import { useRuntimeConfig } from 'nuxt/app';

// Get all tasks
export async function getTasks() {
  const config = useRuntimeConfig();
  const response = await fetch(`${config.public.backendHost}/api/tasks`)
  if (!response.ok) throw new Error('Failed to fetch tasks')
  return await response.json()
}

// Create a new task
export async function createTask(taskData) {
  const config = useRuntimeConfig();
  const response = await fetch(`${config.public.backendHost}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  })
  if (!response.ok) throw new Error('Failed to create task')
  return await response.json()
}

// Delete a task by id
export async function deleteTask(id) {
  const config = useRuntimeConfig();
  const response = await fetch(`${config.public.backendHost}/api/tasks/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) throw new Error('Failed to delete task')
  return await response.json()
}
