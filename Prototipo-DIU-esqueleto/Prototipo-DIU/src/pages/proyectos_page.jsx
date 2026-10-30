import React, { useState } from 'react'

// Importamos elementos que nos serviran para más adelante
import { AYUDANTES } from '../data/mock_data'
import { useAppState } from '../state/app_state'

const formatProjectCount = (count) => `${count} ${count === 1 ? 'proyecto activo' : 'proyectos activos'}`

// Guardamos información de los estados de los proyectos junto a la maquina y el traspaso de proyecto
// Además obtenemos lo estados locales
export const ProyectosPage = () => {
  const {proyectos, maquinas, traspasarProyecto } = useAppState()
  
  //Almacena el proyecto seleccionado, el ayudante que lo recibira, las instrucciones del traspaso o notas
  //Deja ver un historial y los mensajes de notificación para mostrar al usuario como un traspaso correcto

  const [seleccionarIDProyecto, setSeleccionarIDProyecto] = useState(null)
  const [receptor, setRecibir] = useState('')
  const [notaTraspaso, setNotaTraspaso] = useState('')
  const [expandirHistorial, setExpandirHistorial] = useState('')
  const [noticia, setNoticia] = useState('')

  // Se utiliza find para encontrar en base al ID el proyecto (dado que el ID es único)
  const proyectoSeleccionado = proyectos.find(project => project.id === seleccionarIDProyecto)

  // Limpia los campos de un traspaso para asociarlos a un nuevo ayudante con nuevas instrucciones
  const abrirTraspaso = (project) => {
    setSeleccionarIDProyecto(project.id)
    setRecibir('')
    setNotaTraspaso('')
  }

  // Cierre del traspaso para evitar la modificación del traspaso sin registrarlo
  const cerrarTraspaso = () => {
    setSeleccionarIDProyecto(null)
    setRecibir('')
    setNotaTraspaso('')
  }

  // Confirmación del traspaso

  const confirmarTraspaso = (event) => {
    event.preventDefault()

    // Limpiar espacios en blanco
    const limpiarNota = notaTraspaso.trim()

    // Valida que las respuestas esten bien
    if (!proyectoSeleccionado || !receptor || !limpiarNota) return

    //El ayudante no puede traspasarse un turno a si mismo
    if (receptor === seleccionarIDProyecto.responsable) {
      setNoticia('Selecciona un ayudante distinto al responsable actual.')
      return
    }

    // Se realiza el traspaso llamando la función de useAppState()
    traspasarProyecto(proyectoSeleccionado.id, receptor, limpiarNota)

    // Mensaje de confirmación a traves de noticia
    setNoticia(`Traspaso registrado: ${proyectoSeleccionado.nombre} quedó a cargo de ${receptor}.`)

    cerrarTraspaso()
  }

  //Función para mostrar el historial y despelgarlo u ocultarlo
  const mostrarHistorial = (projectId) => {
    setExpandirHistorial(previous => ({
      ...previous,
      [projectId]: !previous[projectId]
    }))
  }

  // La parte visual del código para mostrar la interfaz
  return (
    <section className='project-queue'>
      <header className='project-queue__header'>
        <div>
          <h1>Cola de proyectos</h1>
          <p>Seguimiento de trabajos activos y continuidad entre turnos de ayudantes.</p>
        </div>
        <div className='project-queue__alerts'>
          <span className='project-queue__alert-icon'>i</span>
          {formatProjectCount(proyectos.length)}
        </div>
      </header>

      {/*Este bloque muestra el contenido de noticia si existe algún aviso disponible*/}
      {noticia && (
        <div className='project-queue__notice' role='status'>
          <span aria-hidden='true'>✓</span>
          <p>{noticia}</p>
          <button type='button' onClick={() => setNoticia('')} aria-label='Cerrar aviso'>×</button>
        </div>
      )}

      {/* Mostrar la grilla con todos los proyectos dispomibles de esta*/}
      <div className='project-queue__grid'>
        {proyectos.map(project => {
          const machine = maquinas.find(item => item.id === project.maquinaId)
          const history = Array.isArray(project.historial) ? project.historial : []

          {/* Calculo del progreso del proyecto y comprobación del despliegue del historial */}
          const progress = Math.max(0, Math.min(100, Number(project.progreso) || 0))
          const estaExpandido = Boolean(expandirHistorial[project.id])

          {/* Tarjetas de cada proyecto */}
          return (
            <article className='project-card' key={project.id}>
              <div className='project-card__heading'>
                <h2>{project.nombre}</h2>
                <p className='project-card__meta'>{machine ? machine.nombre : 'Máquina no especificada'}</p>
                <p className='project-card__meta'>Inicio: {project.inicio || 'No registrado'}</p>
              </div>

              <div className='project-card__responsible'>
                <span>Ayudante responsable</span>
                <strong>{project.responsable || 'Sin asignar'}</strong>
              </div>

              <div className='project-card__time'>
                <span className='project-card__clock' aria-hidden='true'>◷</span>
                <span>Tiempo restante:</span>
                <strong>{project.restante || 'No estimado'}</strong>
              </div>

              <div
                className='project-card__progress'
                role='progressbar'
                aria-label={`Avance de ${project.nombre}`}
                aria-valuemin='0'
                aria-valuemax='100'
                aria-valuenow={progress}
              >
                <span style={{ width: `${progress}%` }} />
              </div>
              <p className='project-card__meta'>{progress}% completado</p>

             {/* Botón de traspaso para el siguiente turno */}
              <div className='project-card__actions'>
                <button
                  type='button'
                  className='project-card__handover'
                  onClick={() => abrirTraspaso(project)}
                >
                  <span aria-hidden='true'>⇄</span>
                  Traspasar a siguiente turno
                </button>

             {/* Botón para ver el historial */}
                <button
                  type='button'
                  className='project-card__history-toggle'
                  onClick={() => mostrarHistorial(project.id)}
                  aria-expanded={estaExpandido}
                >
                  {estaExpandido ? 'Ocultar historial' : 'Ver historial'} ({history.length})
                </button>
              </div>

              {estaExpandido && (
                <div className='project-card__history'>
                  <h3>HISTORIAL DE TRASPASOS</h3>
                  {history.length === 0 && (
                    <p className='project-card__history-note'>Aún no hay traspasos registrados.</p>
                  )}
                  {history.map((entry, index) => (
                    <div className='project-card__history-entry' key={`${project.id}-${index}`}>
                      <p className='project-card__history-route'>
                        {entry.cuando || 'Fecha no registrada'} · {entry.de} → {entry.a}
                      </p>
                      <p className='project-card__history-note'>{entry.nota}</p>
                    </div>
                  ))}
                </div>
              )}
            </article>
          )
        })}
      </div>

      {proyectoSeleccionado && (
        <div
          className='handover-modal__backdrop'
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) cerrarTraspaso()
          }}
        >
          <section
            className='handover-modal'
            role='dialog'
            aria-modal='true'
            aria-labelledby='handover-title'
          >
            <header className='handover-modal__header'>
              <div>
                <h2 id='handover-title'>Traspaso de turno</h2>
                <p>{proyectoSeleccionado.nombre}</p>
              </div>
              <button
                type='button'
                className='handover-modal__close'
                onClick={cerrarTraspaso}
                aria-label='Cerrar formulario'
              >
                ×
              </button>
            </header>

            <form onSubmit={confirmarTraspaso}>
              <label className='handover-modal__label' htmlFor='handover-receiver'>
                Ayudante que recibe el proyecto <span>*</span>
              </label>
              <select
                id='handover-receiver'
                value={receptor}
                onChange={event => setRecibir(event.target.value)}
                required
              >
                <option value='' disabled>Seleccionar ayudante</option>
                {AYUDANTES.filter(name => name !== proyectoSeleccionado.responsable).map(name => (
                  <option value={name} key={name}>{name}</option>
                ))}
              </select>

              <label className='handover-modal__label' htmlFor='handover-note'>
                Estado del trabajo e instrucciones <span>*</span>
              </label>
              <textarea
                id='handover-note'
                value={notaTraspaso}
                onChange={event => setNotaTraspaso(event.target.value)}
                placeholder='Describe el avance, tareas pendientes, materiales o precauciones...'
                rows='4'
                required
              />

              <footer className='handover-modal__footer'>
                <p className='handover-modal__required'>* Campos obligatorios</p>
                <div className='handover-modal__buttons'>
                  <button type='button' className='button button--secondary' onClick={cerrarTraspaso}>
                    Cancelar
                  </button>
                  <button
                    type='submit'
                    className='button button--primary'
                    disabled={!receptor || !notaTraspaso.trim()}
                  >
                    Confirmar traspaso
                  </button>
                </div>
              </footer>
            </form>
          </section>
        </div>
      )}
    </section>
  )
}

export default ProyectosPage
