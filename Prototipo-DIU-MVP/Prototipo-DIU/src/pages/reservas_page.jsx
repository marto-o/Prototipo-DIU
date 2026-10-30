import React, { useState } from 'react'

import { useAppState } from '../state/app_state'
import { DIAS, HORAS } from '../data/mock_data'

// Hipótesis 2: ruta /reservas
// Meta: anticipar y comunicar la disponibilidad antes de que el usuario llegue, evitando esperas.

const ESTADOS = {
  disponible: 'Disponible',
  ocupada: 'Ocupada',
  fuera_de_servicio: 'Fuera de servicio'
}

export const ReservasPage = () => {
  const { maquinas, reservas } = useAppState()

  const [maquinaId, setMaquinaId] = useState(maquinas[0].id)
  // Reservas hechas desde esta pantalla (mock, solo frontend): { [maquinaId]: { 'Dia-Hora': {titulo, persona} } }
  const [nuevas, setNuevas] = useState({})
  // Celda seleccionada: { dia, hora }
  const [celda, setCelda] = useState(null)
  const [titulo, setTitulo] = useState('')
  const [mensaje, setMensaje] = useState(null)

  const maquina = maquinas.find(m => m.id === maquinaId)
  const fueraDeServicio = maquina.estado === 'fuera_de_servicio'

  const reservaDe = (dia, hora) => {
    const clave = `${dia}-${hora}`
    return (nuevas[maquinaId] && nuevas[maquinaId][clave]) || (reservas[maquinaId] && reservas[maquinaId][clave]) || null
  }

  const cambiarMaquina = (e) => {
    setMaquinaId(e.target.value)
    setCelda(null)
    setTitulo('')
    setMensaje(null)
  }

  const elegirCelda = (dia, hora) => {
    setCelda({ dia, hora })
    setTitulo('')
    setMensaje(null)
  }

  const confirmar = (e) => {
    e.preventDefault()
    if (!celda || titulo.trim() === '') return
    const clave = `${celda.dia}-${celda.hora}`
    setNuevas(prev => ({
      ...prev,
      [maquinaId]: { ...(prev[maquinaId] || {}), [clave]: { titulo: titulo.trim(), persona: 'Tú (ayudante de turno)', propia: true } }
    }))
    setMensaje(`Reserva confirmada: ${maquina.nombre}, ${celda.dia} ${celda.hora}.`)
    setCelda(null)
    setTitulo('')
  }

  const reservaSeleccionada = celda ? reservaDe(celda.dia, celda.hora) : null

  return (
    <section className='reservas-page'>
      <div className='reservas-page__encabezado'>
        <div>
          <h2 className='reservas-page__titulo'>Reservas semanales</h2>
          <p className='reservas-page__subtitulo'>Semana en curso · lunes a viernes, 09:00 a 19:00</p>
        </div>
        <label className='reservas-page__selector'>
          <span>Máquina</span>
          <select value={maquinaId} onChange={cambiarMaquina} aria-label='Seleccionar máquina'>
            {maquinas.map(m => (
              <option key={m.id} value={m.id}>{m.nombre}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Máquina seleccionada, siempre visible (hallazgo del testing: no notaban qué máquina estaban viendo) */}
      <div className={`reservas-page__activa reservas-page__activa--${maquina.estado}`}>
        <span className='reservas-page__activa-etiqueta'>Estás viendo:</span>
        <strong className='reservas-page__activa-nombre'>{maquina.nombre}</strong>
        <span className='reservas-page__activa-detalle'>{maquina.modelo} · {maquina.sala}</span>
        <span className='reservas-page__chip'>{ESTADOS[maquina.estado]}</span>
      </div>

      {fueraDeServicio && (
        <div className='reservas-page__aviso' role='alert'>
          Esta máquina está fuera de servicio{maquina.vuelta ? ` hasta el ${maquina.vuelta}` : ''}
          {maquina.motivo ? `. Motivo: ${maquina.motivo}` : ''}. No se pueden hacer reservas.
        </div>
      )}

      {mensaje && <div className='reservas-page__exito' role='status'>{mensaje}</div>}

      <div className='reservas-page__leyenda'>
        <span className='reservas-page__leyenda-item'><i className='reservas-page__punto reservas-page__punto--libre' /> Libre</span>
        <span className='reservas-page__leyenda-item'><i className='reservas-page__punto reservas-page__punto--reservado' /> Reservado</span>
      </div>

      <div className='reservas-page__tabla-contenedor'>
        <table className='reservas-page__tabla'>
          <thead>
            <tr>
              <th>Hora</th>
              {DIAS.map(d => <th key={d}>{d}</th>)}
            </tr>
          </thead>
          <tbody>
            {HORAS.map(hora => (
              <tr key={hora}>
                <th scope='row'>{hora}</th>
                {DIAS.map(dia => {
                  const r = reservaDe(dia, hora)
                  const seleccionada = celda && celda.dia === dia && celda.hora === hora
                  const clases = ['reservas-page__celda']
                  clases.push(r ? 'reservas-page__celda--reservado' : 'reservas-page__celda--libre')
                  if (seleccionada) clases.push('reservas-page__celda--seleccionada')
                  return (
                    <td key={dia}>
                      <button
                        type='button'
                        className={clases.join(' ')}
                        onClick={() => elegirCelda(dia, hora)}
                        disabled={fueraDeServicio && !r}
                        aria-label={r ? `${dia} ${hora}: reservado, ${r.titulo}` : `${dia} ${hora}: libre`}
                      >
                        {r
                          ? <><span className='reservas-page__celda-titulo'>{r.titulo}</span><span className='reservas-page__celda-persona'>{r.persona}</span></>
                          : 'Libre'}
                      </button>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {celda && (
        <div className='reservas-page__detalle'>
          <h3 className='reservas-page__detalle-titulo'>
            {maquina.nombre} · {celda.dia} {celda.hora}
          </h3>
          {reservaSeleccionada
            ? (
              <>
                <p>Reservado: <strong>{reservaSeleccionada.titulo}</strong></p>
                <p>Responsable: {reservaSeleccionada.persona}</p>
                <button type='button' className='reservas-page__boton reservas-page__boton--secundario' onClick={() => setCelda(null)}>
                  Cerrar
                </button>
              </>
              )
            : (
              <form onSubmit={confirmar}>
                <p>Este horario está <strong>libre</strong>. Puedes confirmarlo para el proyecto que el usuario quiere realizar.</p>
                <label className='reservas-page__campo'>
                  <span>Proyecto o motivo de la reserva</span>
                  <input
                    type='text'
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder='Ej: Corte de piezas para maqueta'
                  />
                </label>
                <div className='reservas-page__acciones'>
                  <button type='submit' className='reservas-page__boton' disabled={titulo.trim() === ''}>
                    Confirmar reserva
                  </button>
                  <button type='button' className='reservas-page__boton reservas-page__boton--secundario' onClick={() => setCelda(null)}>
                    Cancelar
                  </button>
                </div>
              </form>
              )}
        </div>
      )}
    </section>
  )
}

export default ReservasPage
