import React from 'react'

// Indicador de estado de una máquina, compartido por todas las secciones
// (Panel, Estado de máquinas, Reservas). Mejora de la iteración 2: "ocupada" debe destacar
// a primera vista (observación de Renato y Max en el testing).
//
// Uso:
//   <StatusBadge estado={maquina.estado} />            // insignia
//   <StatusBadge estado={maquina.estado} size='lg' />  // insignia grande, para tarjetas
//   <article className={`mi-tarjeta ${claseTarjetaEstado(maquina.estado)}`}> ... </article>

export const ESTADOS_MAQUINA = {
  disponible: 'Disponible',
  ocupada: 'Ocupada',
  fuera_de_servicio: 'Fuera de servicio'
}

// Clase que se agrega a la tarjeta/contenedor de la máquina: borde y fondo según estado.
export const claseTarjetaEstado = (estado) => `status-card status-card--${estado}`

export const StatusBadge = ({ estado, size = 'md' }) => {
  const etiqueta = ESTADOS_MAQUINA[estado] || estado
  return (
    <span className={`status-badge status-badge--${estado} status-badge--${size}`} role='status'>
      <span className='status-badge__punto' aria-hidden='true' />
      {etiqueta}
    </span>
  )
}

export default StatusBadge
