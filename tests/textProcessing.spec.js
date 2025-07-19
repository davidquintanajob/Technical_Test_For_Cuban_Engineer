import { describe, it, expect } from 'vitest'
import { procesarTexto } from '../Functions/textProcessing.js'

describe('procesarTexto', () => {
  it('detects mentions', () => {
    const partes = procesarTexto('@admin hola', false)
    expect(partes[0].tipo).toBe('mencion')
    expect(partes[0].contenido).toBe('@admin')
  })

  it('detects tags', () => {
    const partes = procesarTexto('esto es #importante', false)
    expect(partes[1].tipo).toBe('etiqueta')
    expect(partes[1].contenido).toBe('#importante')
  })

  it('detects emails', () => {
    const partes = procesarTexto('correo a test@mail.com', false)
    expect(partes[1].tipo).toBe('correo')
    expect(partes[1].contenido).toBe('test@mail.com')
  })

  it('detects urls', () => {
    const partes = procesarTexto('visita https://nuxt.com', false)
    expect(partes[1].tipo).toBe('url')
    expect(partes[1].contenido).toBe('https://nuxt.com')
  })

  it('preserves spaces between parts', () => {
    const partes = procesarTexto('uno@correo.com  https://web.com', false)
    expect(partes[0].tipo).toBe('correo')
    expect(partes[1].tipo).toBe('texto')
    expect(partes[1].contenido).toMatch(/\s+/)
    expect(partes[2].tipo).toBe('url')
  })
}) 