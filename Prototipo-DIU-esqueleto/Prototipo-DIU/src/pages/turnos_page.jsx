import React from 'react'

import { useAppState } from '../state/app_state'

// Hipótesis 5: ruta /turnos
// TODO: reemplazar este placeholder por la sección real.
// Ver TAREAS.md para los criterios de aceptación. Estilos propios en
// src/stylesheets/turnos-page/turnos-page.scss (no tocar los estilos de otras secciones).

export const TurnosPage = () => {
  // eslint-disable-next-line no-unused-vars
  const estado = useAppState()

  return (
    <section className='turnos-page'>
      <h2>Calendario de turnos de ayudantes</h2>
      <p>Quién está de turno cada día y bloque horario.</p>
      <p><em>Sección en construcción.</em></p>
    </section>
  )
}

export default TurnosPage
