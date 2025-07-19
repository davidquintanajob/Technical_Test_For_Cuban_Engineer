// Función para navegar a una URL
export const navegarAUrl = (url) => {
  let urlCompleta = url
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    urlCompleta = 'https://' + url
  }
  window.open(urlCompleta, '_blank')
}

// Función para procesar el texto y separar menciones, etiquetas, correos y texto normal
export const procesarTexto = (texto, estaExpandido = false) => {
  const partes = []
  let textoActual = texto
  
  // Encontrar todas las menciones, etiquetas, correos y URLs
  const regex = /(@[\w-]+|#[\w-]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/g;
  let match
  let ultimoIndice = 0
  
  while ((match = regex.exec(texto)) !== null) {
    // Agregar texto antes de la mención/etiqueta/correo, incluyendo espacios
    if (match.index > ultimoIndice) {
      const textoAntes = texto.substring(ultimoIndice, match.index)
      // No uses .trim(), conserva los espacios
      if (textoAntes.length > 0) {
        partes.push({ tipo: 'texto', contenido: textoAntes })
      }
    }
    
    // Agregar la mención, etiqueta o correo
    const contenido = match[0]
    let tipo
    
    if (contenido.startsWith('@')) {
      tipo = 'mencion'
    } else if (contenido.startsWith('#')) {
      tipo = 'etiqueta'
    } else if (contenido.includes('@') && contenido.includes('.')) {
      tipo = 'correo'
    } else if (contenido.includes('.') && (contenido.includes('www') || contenido.includes('http') || /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(contenido))) {
      tipo = 'url'
    } else {
      tipo = 'texto'
    }
    
    partes.push({ tipo, contenido })
    
    ultimoIndice = match.index + contenido.length
  }
  
  // Agregar texto restante (incluyendo espacios)
  if (ultimoIndice < texto.length) {
    const textoRestante = texto.substring(ultimoIndice)
    if (textoRestante.length > 0) {
      partes.push({ tipo: 'texto', contenido: textoRestante })
    }
  }
  
  return partes
} 