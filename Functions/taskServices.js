// Functions to interact with the tasks API

const API_BASE = process.env.NUXT_PUBLIC_BACKEND_HOST

// Get all tasks
export async function getTasks() {
  const response = await fetch(`${API_BASE}/api/tasks`)
  if (!response.ok) throw new Error('Failed to fetch tasks')
  return await response.json()
}

// Create a new task
export async function createTask(taskData) {
  const response = await fetch(`${API_BASE}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  })
  if (!response.ok) throw new Error('Failed to create task')
  return await response.json()
}

// Delete a task by id
export async function deleteTask(id) {
  const response = await fetch(`${API_BASE}/api/tasks/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) throw new Error('Failed to delete task')
  return await response.json()
}
