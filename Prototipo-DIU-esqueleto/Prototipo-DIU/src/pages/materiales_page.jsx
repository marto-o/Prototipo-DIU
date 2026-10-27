import React from 'react'

import { useAppState } from '../state/app_state'

// Hipótesis 6: ruta /materiales
// TODO (Martín Casanova): reemplazar este placeholder por la sección real.
// Ver TAREAS.md para los criterios de aceptación. Estilos propios en
// src/stylesheets/materiales-page/materiales-page.scss (no tocar los estilos de otras secciones).

export const MaterialesPage = () => {
  // eslint-disable-next-line no-unused-vars
  const estado = useAppState()

  return (
    <section className='materiales-page'>
      <h2>Materiales y stock</h2>
      <p>Actualiza las cantidades tras cada uso; la alerta se activa sola.</p>
      <p><em>Sección en construcción.</em></p>
    </section>
  )
}

export default MaterialesPage
