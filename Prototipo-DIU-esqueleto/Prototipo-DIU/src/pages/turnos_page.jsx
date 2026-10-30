import React, { useState } from 'react'
import { useAppState } from '../state/app_state'
import { DIAS, BLOQUES_TURNO, AYUDANTES } from '../data/mock_data'

export const TurnosPage = () => {
  const { turnos, estadoPublicacion, asignarTurno, publicarTurnos } = useAppState()

  // Semana activa ('actual' | 'proxima')
  const [semana, setSemana] = useState('actual')

  // Filtro por ayudante ('todos' | nombre)
  const [ayudanteFiltro, setAyudanteFiltro] = useState('todos')

  // Modal para asignar/editar ayudante de un turno
  const [slotEdicion, setSlotEdicion] = useState(null) // { dia, bloque, ayudante }
  const [ayudanteSeleccionado, setAyudanteSeleccionado] = useState('')

  // Modal para confirmar publicación
  const [modalPublicarOpen, setModalPublicarOpen] = useState(false)

  // Mensaje flotante de feedback temporal
  const [mensajeToast, setMensajeToast] = useState(null)

  const turnosSemana = turnos[semana] || {}
  const publicacion = estadoPublicacion?.[semana] || {
    publicado: false,
    fechaPublicacion: null,
    publicadoPor: null,
    cambiosSinPublicar: false
  }

  const mostrarToast = (msg) => {
    setMensajeToast(msg)
    setTimeout(() => setMensajeToast(null), 3500)
  }

  const abrirModalEdicion = (dia, bloque, ayudante) => {
    setSlotEdicion({ dia, bloque, ayudante })
    setAyudanteSeleccionado(ayudante || AYUDANTES[0])
  }

  const cerrarModalEdicion = () => {
    setSlotEdicion(null)
    setAyudanteSeleccionado('')
  }

  const handleGuardarTurno = () => {
    if (!slotEdicion || !ayudanteSeleccionado) return
    asignarTurno(semana, slotEdicion.dia, slotEdicion.bloque, ayudanteSeleccionado)
    cerrarModalEdicion()
    mostrarToast(`Turno de ${slotEdicion.dia} (${slotEdicion.bloque === 'manana' ? 'Mañana' : 'Tarde'}) asignado a ${ayudanteSeleccionado}.`)
  }

  const handleConfirmarPublicacion = () => {
    publicarTurnos(semana)
    setModalPublicarOpen(false)
    mostrarToast(`¡Calendario de ${semana === 'actual' ? 'la semana en curso' : 'la próxima semana'} publicado con éxito para todo el equipo!`)
  }

  // Conteo de turnos asignados por ayudante en la semana seleccionada
  const conteoTurnos = AYUDANTES.reduce((acc, ay) => {
    acc[ay] = 0
    DIAS.forEach(d => {
      if (turnosSemana[d]?.manana === ay) acc[ay]++
      if (turnosSemana[d]?.tarde === ay) acc[ay]++
    })
    return acc
  }, {})

  return (
    <section className='turnos-page'>
      {/* Toast de confirmación flotante */}
      {mensajeToast && (
        <div className='turnos-page__toast' role='status'>
          <span>✓ {mensajeToast}</span>
        </div>
      )}

      {/* Encabezado principal */}
      <header className='turnos-page__header'>
        <div>
          <h2 className='turnos-page__title'>Calendario de turnos de ayudantes</h2>
          <p className='turnos-page__subtitle'>
            Planifica, define y publica los turnos de disponibilidad y supervisión semanales del equipo.
          </p>
        </div>

        {/* Selector de semana */}
        <div className='turnos-page__week-selector'>
          <button
            type='button'
            className={`turnos-page__week-btn ${semana === 'actual' ? 'turnos-page__week-btn--active' : ''}`}
            onClick={() => setSemana('actual')}
          >
            Semana en curso
          </button>
          <button
            type='button'
            className={`turnos-page__week-btn ${semana === 'proxima' ? 'turnos-page__week-btn--active' : ''}`}
            onClick={() => setSemana('proxima')}
          >
            Próxima semana
          </button>
        </div>
      </header>

      {/* Barra de estado de publicación y botón para publicar */}
      <div className={`turnos-page__publish-bar ${publicacion.publicado ? 'turnos-page__publish-bar--published' : 'turnos-page__publish-bar--draft'}`}>
        <div className='turnos-page__publish-info'>
          <div className='turnos-page__publish-badge'>
            {publicacion.publicado ? (
              <span className='turnos-page__badge-status turnos-page__badge-status--success'>
                ● Publicado
              </span>
            ) : (
              <span className='turnos-page__badge-status turnos-page__badge-status--warning'>
                ● Borrador sin publicar
              </span>
            )}

            {publicacion.cambiosSinPublicar && publicacion.publicado && (
              <span className='turnos-page__badge-status turnos-page__badge-status--alert'>
                ⚠ Hay cambios sin publicar
              </span>
            )}
          </div>

          <span className='turnos-page__publish-detail'>
            {publicacion.publicado
              ? `Visible para todo el equipo · Publicado el ${publicacion.fechaPublicacion} por ${publicacion.publicadoPor || 'Christian Carvajal'}`
              : 'Los cambios actuales solo son visibles como borrador. Publica para notificar al equipo.'}
          </span>
        </div>

        <button
          type='button'
          className='turnos-page__btn-publish'
          onClick={() => setModalPublicarOpen(true)}
        >
          📢 {publicacion.publicado && !publicacion.cambiosSinPublicar ? 'Volver a publicar' : 'Publicar turnos al equipo'}
        </button>
      </div>

      {/* Resumen rápido de asignación de turnos por ayudante */}
      <div className='turnos-page__stats'>
        <span className='turnos-page__stats-title'>Turnos por ayudante:</span>
        <div className='turnos-page__stats-list'>
          {AYUDANTES.map(ay => (
            <button
              key={ay}
              type='button'
              className={`turnos-page__stat-pill ${ayudanteFiltro === ay ? 'turnos-page__stat-pill--active' : ''}`}
              onClick={() => setAyudanteFiltro(ayudanteFiltro === ay ? 'todos' : ay)}
              title={`Filtrar turnos de ${ay}`}
            >
              <span>{ay}</span>
              <span className='turnos-page__stat-count'>{conteoTurnos[ay]}</span>
            </button>
          ))}
          {ayudanteFiltro !== 'todos' && (
            <button
              type='button'
              className='turnos-page__stat-reset'
              onClick={() => setAyudanteFiltro('todos')}
            >
              ✕ Ver todos
            </button>
          )}
        </div>
      </div>

      {/* Cuadrícula semanal del calendario */}
      <div className='turnos-page__calendar-container'>
        <div className='turnos-page__calendar-grid'>
          {/* Fila de cabecera: Días */}
          <div className='turnos-page__col-header turnos-page__col-header--block'>
            Bloque horario
          </div>
          {DIAS.map(dia => (
            <div key={dia} className='turnos-page__col-header'>
              {dia}
            </div>
          ))}

          {/* Bloque Mañana */}
          <div className='turnos-page__row-label'>
            <strong>Mañana</strong>
            <span>09:00 – 13:00</span>
          </div>
          {DIAS.map(dia => {
            const ayudante = turnosSemana[dia]?.manana
            const coincideFiltro = ayudanteFiltro === 'todos' || ayudante === ayudanteFiltro
            const esFiltrado = ayudanteFiltro !== 'todos' && ayudante === ayudanteFiltro

            return (
              <div
                key={`${dia}-manana`}
                className={`turnos-page__cell ${!coincideFiltro ? 'turnos-page__cell--dimmed' : ''} ${esFiltrado ? 'turnos-page__cell--highlighted' : ''}`}
              >
                <div className='turnos-page__cell-top'>
                  <span className='turnos-page__cell-day-mini'>{dia} · Mañana</span>
                </div>

                <div className='turnos-page__cell-content'>
                  <div className='turnos-page__helper-card'>
                    <div className='turnos-page__avatar'>
                      {ayudante ? ayudante.charAt(0) : '?'}
                    </div>
                    <span className='turnos-page__helper-name'>{ayudante || 'Sin asignar'}</span>
                  </div>
                </div>

                <div className='turnos-page__cell-actions'>
                  <button
                    type='button'
                    className='turnos-page__btn-edit'
                    onClick={() => abrirModalEdicion(dia, 'manana', ayudante)}
                  >
                    ✏ Cambiar
                  </button>
                </div>
              </div>
            )
          })}

          {/* Bloque Tarde */}
          <div className='turnos-page__row-label'>
            <strong>Tarde</strong>
            <span>14:00 – 19:00</span>
          </div>
          {DIAS.map(dia => {
            const ayudante = turnosSemana[dia]?.tarde
            const coincideFiltro = ayudanteFiltro === 'todos' || ayudante === ayudanteFiltro
            const esFiltrado = ayudanteFiltro !== 'todos' && ayudante === ayudanteFiltro

            return (
              <div
                key={`${dia}-tarde`}
                className={`turnos-page__cell ${!coincideFiltro ? 'turnos-page__cell--dimmed' : ''} ${esFiltrado ? 'turnos-page__cell--highlighted' : ''}`}
              >
                <div className='turnos-page__cell-top'>
                  <span className='turnos-page__cell-day-mini'>{dia} · Tarde</span>
                </div>

                <div className='turnos-page__cell-content'>
                  <div className='turnos-page__helper-card'>
                    <div className='turnos-page__avatar'>
                      {ayudante ? ayudante.charAt(0) : '?'}
                    </div>
                    <span className='turnos-page__helper-name'>{ayudante || 'Sin asignar'}</span>
                  </div>
                </div>

                <div className='turnos-page__cell-actions'>
                  <button
                    type='button'
                    className='turnos-page__btn-edit'
                    onClick={() => abrirModalEdicion(dia, 'tarde', ayudante)}
                  >
                    ✏ Cambiar
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* MODAL 1: Definir o cambiar ayudante del turno */}
      {slotEdicion && (
        <div className='turnos-page__modal-overlay' onClick={cerrarModalEdicion}>
          <div
            className='turnos-page__modal'
            role='dialog'
            aria-modal='true'
            aria-labelledby='modal-turno-titulo'
            onClick={e => e.stopPropagation()}
          >
            <div className='turnos-page__modal-header'>
              <h4 id='modal-turno-titulo'>
                Asignar turno · {slotEdicion.dia} ({slotEdicion.bloque === 'manana' ? 'Mañana' : 'Tarde'})
              </h4>
              <button
                type='button'
                className='turnos-page__modal-close'
                onClick={cerrarModalEdicion}
                aria-label='Cerrar'
              >
                ✕
              </button>
            </div>

            <div className='turnos-page__modal-body'>
              <p className='turnos-page__modal-desc'>
                Horario: <strong>{BLOQUES_TURNO[slotEdicion.bloque]}</strong>
              </p>

              <div className='turnos-page__form-group'>
                <label htmlFor='select-ayudante' className='turnos-page__label'>
                  Ayudante responsable:
                </label>
                <select
                  id='select-ayudante'
                  className='turnos-page__select'
                  value={ayudanteSeleccionado}
                  onChange={e => setAyudanteSeleccionado(e.target.value)}
                >
                  {AYUDANTES.map(ay => (
                    <option key={ay} value={ay}>
                      {ay}
                    </option>
                  ))}
                </select>
              </div>

              <div className='turnos-page__modal-notice'>
                ℹ Al guardar, el cambio quedará registrado en el borrador de la semana hasta que decidas publicarlo.
              </div>
            </div>

            <div className='turnos-page__modal-footer'>
              <button
                type='button'
                className='turnos-page__btn-cancel'
                onClick={cerrarModalEdicion}
              >
                Cancelar
              </button>
              <button
                type='button'
                className='turnos-page__btn-save'
                onClick={handleGuardarTurno}
              >
                Guardar turno
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Confirmar publicación del calendario */}
      {modalPublicarOpen && (
        <div className='turnos-page__modal-overlay' onClick={() => setModalPublicarOpen(false)}>
          <div
            className='turnos-page__modal'
            role='dialog'
            aria-modal='true'
            aria-labelledby='modal-publicar-titulo'
            onClick={e => e.stopPropagation()}
          >
            <div className='turnos-page__modal-header'>
              <h4 id='modal-publicar-titulo'>
                Publicar turnos de {semana === 'actual' ? 'la semana en curso' : 'la próxima semana'}
              </h4>
              <button
                type='button'
                className='turnos-page__modal-close'
                onClick={() => setModalPublicarOpen(false)}
                aria-label='Cerrar'
              >
                ✕
              </button>
            </div>

            <div className='turnos-page__modal-body'>
              <p>
                ¿Confirmas la publicación de este horario para todo el equipo del FabLab?
              </p>
              <ul className='turnos-page__modal-list'>
                <li>El calendario quedará visible y oficial para todos los ayudantes.</li>
                <li>Se registrará la fecha y hora de la publicación.</li>
              </ul>
            </div>

            <div className='turnos-page__modal-footer'>
              <button
                type='button'
                className='turnos-page__btn-cancel'
                onClick={() => setModalPublicarOpen(false)}
              >
                Cancelar
              </button>
              <button
                type='button'
                className='turnos-page__btn-publish-confirm'
                onClick={handleConfirmarPublicacion}
              >
                ✓ Confirmar y publicar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default TurnosPage
