<template>
  <div class="min-h-screen bg-gray-50">
    <div class="p-6">
      <button v-if="!mostrarAddElemento" class="flex items-center gap-3 px-6 py-4 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200" @click="mostrarAddElemento = true">
        <img src="/plus-square.svg" alt="Add task" class="w-6 h-6" />
      </button>
      <AddElemento v-if="mostrarAddElemento" @cancelar="mostrarAddElemento = false" @agregar="agregarElemento" />
      
      <!-- List of elements -->
      <div v-if="elementos.length > 0" class="mt-4">
        <ul class="space-y-2">
          <li 
            v-for="(elemento, index) in elementos" 
            :key="elemento.id"
            class="bg-white rounded-lg transition-all duration-300"
            :class="elementosExpandidos[index] ? 'shadow-lg' : 'hover:bg-gray-50'"
          >
            <!-- Content of the element -->
            <div 
              class="flex items-center gap-3 p-4 cursor-pointer"
              @click="toggleElemento(index)"
            >
              <input 
                type="checkbox" 
                :id="`elemento-${index}`"
                v-model="elementosMarcados[index]"
                class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                @click.stop
              >
              <div 
                class="flex-1 text-gray-700 flex flex-wrap items-center gap-1"
              >
                <template v-for="(parte, parteIndex) in procesarTexto(elemento.text, elementosExpandidos[index])" :key="parteIndex">
                  <span 
                    v-if="parte.tipo === 'texto'" 
                    class="text-gray-700"
                  >
                    {{ parte.contenido }}
                  </span>
                  <span 
                    v-else-if="parte.tipo === 'mencion'"
                    :class="elementosExpandidos[index] ? 'text-green-700' : 'inline-flex items-center px-2 py-1 rounded-full text-sm font-medium'"
                    :style="elementosExpandidos[index] ? '' : 'background-color: #adf0d9; color: #166534;'"
                  >
                    {{ parte.contenido }}
                  </span>
                  <span 
                    v-else-if="parte.tipo === 'etiqueta'"
                    :class="elementosExpandidos[index] ? 'text-purple-700' : 'inline-flex items-center px-2 py-1 rounded-full text-sm font-medium'"
                    :style="elementosExpandidos[index] ? '' : 'background-color: #dbc7ff; color: #581c87;'"
                  >
                    {{ parte.contenido }}
                  </span>
                  <span 
                    v-else-if="parte.tipo === 'correo'"
                    :class="elementosExpandidos[index] ? 'text-orange-600' : 'inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium'"
                    :style="elementosExpandidos[index] ? '' : 'background-color: #ffe6c7; color: #f59315;'"
                  >
                    <img v-if="!elementosExpandidos[index]" src="/mail.svg" alt="Mail" class="w-4 h-4" />
                    {{ elementosExpandidos[index] ? parte.contenido : 'Mail' }}
                  </span>
                  <span 
                    v-else-if="parte.tipo === 'url'"
                    :class="elementosExpandidos[index] ? 'text-blue-700 cursor-pointer hover:underline' : 'inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium cursor-pointer hover:opacity-80 transition-opacity'"
                    :style="elementosExpandidos[index] ? '' : 'background-color: #e0e7ff; color: #3730a3;'"
                    @click="navegarAUrl(parte.contenido)"
                  >
                    <img v-if="!elementosExpandidos[index]" src="/link.svg" alt="Link" class="w-4 h-4" />
                    {{ elementosExpandidos[index] ? parte.contenido : 'Link' }}
                  </span>
                </template>
              </div>
              
              <!-- Profile image visible only when expanded -->
              <div v-if="elementosExpandidos[index]" class="flex-shrink-0 ml-3">
                <img 
                  src="/DSC_5684.jpg" 
                  alt="Profile" 
                  class="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                />
              </div>
            </div>
            
            <!-- Expanded area for expanded elements -->
            <div 
              v-if="elementosExpandidos[index]"
              class="px-4 pb-4 bg-gray-50 rounded-b-lg"
            >
              <div class="pt-3 border-t border-gray-100">
                <!-- Mobile: grid, Desktop: flex-row -->
                <div class="grid grid-cols-3 gap-2 sm:flex sm:flex-row sm:flex-wrap">
                  <!-- First 3 buttons -->
                  <button class="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-md transition-colors text-xs sm:text-sm"
                    style="background-color: #f0f8ff;"
                  >
                    <img src="/maximize-2.svg" alt="Maximize" class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" style="filter: brightness(0) saturate(100%) invert(59%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(89%) contrast(86%);" />
                  </button>
                  <button class="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-md transition-colors text-xs sm:text-sm"
                    style="background-color: #f8fafc;"
                  >
                    <img src="/calendar.svg" alt="Calendar" class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" style="filter: brightness(0) saturate(100%) invert(59%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(89%) contrast(86%);" />
                  </button>
                  <button class="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-md transition-colors text-xs sm:text-sm"
                    style="background-color: #f8fafc;"
                  >
                    <img src="/unlock.svg" alt="Unlock" class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" style="filter: brightness(0) saturate(100%) invert(59%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(89%) contrast(86%);" />
                  </button>
                  <!-- Next 3 buttons -->
                  <button class="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-md transition-colors text-xs sm:text-sm"
                    style="background-color: #f8fafc;"
                  >
                    <!-- Sun/radiation icon -->
                    <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                  </button>
                  <button class="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-md transition-colors text-xs sm:text-sm"
                    style="background-color: #f8fafc;"
                  >
                    <!-- Zero in circle icon -->
                    <svg class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="6"></circle>
                    </svg>
                  </button>
                  <button class="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-md transition-colors text-xs sm:text-sm"
                    style="background-color: #f8fafc;"
                    @click.stop="eliminarElemento(elemento.id)"
                  >
                    <!-- Trash icon -->
                    <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <polyline points="3,6 5,6 21,6"></polyline>
                      <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                    </svg>
                  </button>
                  <!-- Close button -->
                  <button 
                    @click="toggleElemento(index)"
                    class="col-span-3 w-full sm:w-auto sm:ml-auto flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-md transition-colors text-xs sm:text-sm bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    <span class="sm:hidden">Close</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { procesarTexto, navegarAUrl } from '../Functions/textProcessing.js'
import AddElemento from '../components/AddElemento.vue'
import { getTasks, createTask, deleteTask } from '../Functions/taskServices.js'

// List of elements (strings)
const elementos = ref([])

onMounted(async () => {
  try {
    const tasks = await getTasks()
    elementos.value = Array.isArray(tasks) ? tasks.map(t => ({ id: t.id, text: t.text })) : []
  } catch (e) {
    console.error('Error loading tasks:', e)
  }
})

// Array to track expanded elements (multiple)
const elementosExpandidos = ref(new Array(elementos.value.length).fill(false))

// Array to track elements marked with checkbox (multiple)
const elementosMarcados = ref(new Array(elementos.value.length).fill(false))

// Function to expand/collapse an element
const toggleElemento = (index) => {
  elementosExpandidos.value[index] = !elementosExpandidos.value[index]
}

const mostrarAddElemento = ref(false)

const agregarElemento = async (nuevoElemento) => {
  if (nuevoElemento && nuevoElemento.trim().length > 0) {
    try {
      await createTask({ text: nuevoElemento })
      elementos.value = []
      const tasks = await getTasks()
      elementos.value = Array.isArray(tasks) ? tasks.map(t => ({ id: t.id, text: t.text })) : []
    } catch (e) {
      console.error('Error creating task:', e)
    }
  }
  mostrarAddElemento.value = false
}

const eliminarElemento = async (id) => {
  try {
    await deleteTask(id)
    const tasks = await getTasks()
    elementos.value = Array.isArray(tasks) ? tasks.map(t => ({ id: t.id, text: t.text })) : []
  } catch (e) {
    console.error('Error deleting task:', e)
  }
}


</script>

<style scoped>
/* Additional styles if needed */
</style>
