import React from 'react'

import { useAppState } from '../state/app_state'

// Hipótesis 2: ruta /reservas
// TODO: reemplazar este placeholder por la sección real.
// Ver TAREAS.md para los criterios de aceptación. Estilos propios en
// src/stylesheets/reservas-page/reservas-page.scss (no tocar los estilos de otras secciones).

export const ReservasPage = () => {
  // eslint-disable-next-line no-unused-vars
  const estado = useAppState()

  return (
    <section className='reservas-page'>
      <h2>Reservas semanales</h2>
      <p>Semana en curso · lunes a viernes, 09:00 a 19:00.</p>
      <p><em>Sección en construcción.</em></p>
    </section>
  )
}

export default ReservasPage
