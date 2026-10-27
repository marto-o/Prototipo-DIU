import React from 'react'

import { useAppState } from '../state/app_state'

// Hipótesis 1: ruta /
// TODO: reemplazar este placeholder por la sección real.
// Ver TAREAS.md para los criterios de aceptación. Estilos propios en
// src/stylesheets/panel-page/panel-page.scss (no tocar los estilos de otras secciones).

export const PanelPage = () => {
  // eslint-disable-next-line no-unused-vars
  const estado = useAppState()

  return (
    <section className='panel-page'>
      <h2>Panel de disponibilidad</h2>
      <p>Vista rápida del estado de máquinas y materiales del laboratorio.</p>
      <p><em>Sección en construcción.</em></p>
    </section>
  )
}

export default PanelPage
