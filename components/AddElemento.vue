<template>
  <li class="bg-white rounded-lg shadow-lg transition-all duration-300 mt-2">
    <div class="flex items-center gap-3 p-2">
      <!-- Botón de agregar igual al original, usando la imagen -->
      <button @click="$emit('agregar', texto)" class="flex items-center justify-center px-0 py-0 bg-transparent rounded-none ml-2">
        <img src="/plus-square.svg" alt="Add task" class="w-6 h-6" />
      </button>
      <!-- Campo de texto editable con colores dinámicos (solo color de texto, sin óvalo) -->
      <div class="flex-1 min-w-0 ml-2 relative">
        <input v-model="texto" type="text" class="w-full border-none outline-none bg-transparent text-base text-transparent caret-gray-700 placeholder:text-gray-400" placeholder="Type to add a task" />
        <div class="absolute inset-0 flex items-center pointer-events-none whitespace-pre-wrap overflow-x-auto">
          <template v-for="(parte, i) in partesTexto" :key="i">
            <span v-if="parte.tipo === 'texto'" class="text-gray-700">{{ parte.contenido }}</span>
            <span v-else-if="parte.tipo === 'mencion'" class="text-green-700">{{ parte.contenido }}</span>
            <span v-else-if="parte.tipo === 'etiqueta'" class="text-purple-700">{{ parte.contenido }}</span>
            <span v-else-if="parte.tipo === 'correo'" class="text-orange-600">{{ parte.contenido }}</span>
            <span v-else-if="parte.tipo === 'url'" class="text-blue-700 cursor-pointer hover:underline">{{ parte.contenido }}</span>
          </template>
        </div>
      </div>
      <!-- Imagen de perfil (opcional, igual que los otros elementos) -->
      <img :class="['w-8 h-8 rounded-full object-cover border-2 border-gray-200 mr-2', texto.length === 0 ? 'opacity-50' : '']" src="/DSC_5684.jpg" alt="Profile" />
    </div>
    <!-- Área de botones -->
    <div class="px-4 pb-4 bg-gray-50 rounded-b-lg">
      <div class="pt-3 border-t border-gray-100">
        <div class="grid grid-cols-3 gap-2 sm:flex sm:flex-row sm:flex-wrap items-center">
          <!-- Botón maximize más ancho -->
          <button :disabled="texto.length === 0" :class="['flex items-center justify-center gap-1 sm:gap-2 w-20 px-6 py-2 border border-gray-300 transition-colors text-xs sm:text-sm', texto.length === 0 ? 'opacity-50' : '']" style="background-color: #f0f8ff;">
            <img src="/maximize-2.svg" alt="Maximize" class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
            <span class="text-gray-500 hidden sm:inline">Open</span>
        </button>
          <!-- Los siguientes botones con margen a la izquierda -->
          <button :disabled="texto.length === 0" :class="['flex items-center justify-center gap-1 sm:gap-2 ml-2 px-2 sm:px-3 py-2 border border-gray-300 transition-colors text-xs sm:text-sm', texto.length === 0 ? 'opacity-50' : '']" style="background-color: #f8fafc;">
            <img src="/calendar.svg" alt="Calendar" class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
            <span class="text-gray-500 hidden sm:inline">Today</span>
          </button>
          <button :disabled="texto.length === 0" :class="['flex items-center justify-center gap-1 sm:gap-2 ml-2 px-2 sm:px-3 py-2 border border-gray-300 transition-colors text-xs sm:text-sm', texto.length === 0 ? 'opacity-50' : '']" style="background-color: #f8fafc;">
            <img src="/unlock.svg" alt="Unlock" class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
            <span class="text-gray-500 hidden sm:inline">Public</span>
          </button>
          <button :disabled="texto.length === 0" :class="['flex items-center justify-center gap-1 sm:gap-2 ml-2 px-2 sm:px-3 py-2 border border-gray-300 transition-colors text-xs sm:text-sm', texto.length === 0 ? 'opacity-50' : '']" style="background-color: #f8fafc;">
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
            <span class="text-gray-500 hidden sm:inline">Normal</span>
          </button>
          <button :disabled="texto.length === 0" :class="['flex items-center justify-center gap-1 sm:gap-2 ml-2 px-2 sm:px-3 py-2 border border-gray-300 transition-colors text-xs sm:text-sm', texto.length === 0 ? 'opacity-50' : '']" style="background-color: #f8fafc;">
            <svg class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="6"></circle>
            </svg>
            <span class="text-gray-500 hidden sm:inline">Estimation</span>
          </button>
          <!-- Contenedor flex para Add y Cancel al final -->
          <div class="col-span-3 sm:ml-auto flex gap-2 w-full sm:w-auto justify-end">
            <button @click="$emit('cancelar')" class="flex items-center justify-center gap-1 px-6 py-2 transition-colors text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold">
              Cancel
            </button>
            <button @click="$emit('agregar', texto)" class="flex items-center justify-center gap-1 px-2 sm:px-3 py-2 transition-colors text-xs sm:text-sm bg-blue-500 hover:bg-blue-600 text-white font-bold">
              <span>{{ texto.length === 0 ? 'Ok' : 'Add' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
import { ref, computed } from 'vue'
import { procesarTexto } from '../Functions/textProcessing.js'
const texto = ref('')
const partesTexto = computed(() => procesarTexto(texto.value, false))
</script> 