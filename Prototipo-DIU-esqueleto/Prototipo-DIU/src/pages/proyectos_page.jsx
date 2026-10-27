import React from 'react'

import { useAppState } from '../state/app_state'

// Hipótesis 3: ruta /proyectos
// TODO: reemplazar este placeholder por la sección real.
// Ver TAREAS.md para los criterios de aceptación. Estilos propios en
// src/stylesheets/proyectos-page/proyectos-page.scss (no tocar los estilos de otras secciones).

export const ProyectosPage = () => {
  // eslint-disable-next-line no-unused-vars
  const estado = useAppState()

  return (
    <section className='proyectos-page'>
      <h2>Cola de proyectos y traspaso de turno</h2>
      <p>Trabajos en curso en el laboratorio.</p>
      <p><em>Sección en construcción.</em></p>
    </section>
  )
}

export default ProyectosPage
