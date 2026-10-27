import React from 'react'

import { useAppState } from '../state/app_state'

// Hipótesis 4: ruta /maquinas
// TODO (Luciano Catalán): reemplazar este placeholder por la sección real.
// Ver TAREAS.md para los criterios de aceptación. Estilos propios en
// src/stylesheets/maquinas-page/maquinas-page.scss (no tocar los estilos de otras secciones).

export const MaquinasPage = () => {
  // eslint-disable-next-line no-unused-vars
  const estado = useAppState()

  return (
    <section className='maquinas-page'>
      <h2>Estado de máquinas</h2>
      <p>Detalle de cada equipo y cambio de estado operativo.</p>
      <p><em>Sección en construcción.</em></p>
    </section>
  )
}

export default MaquinasPage
